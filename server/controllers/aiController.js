const axios = require('axios');
const Employee = require('../models/Employee');
const {
  buildPromotionPrompt,
  buildTrainingPrompt,
  buildRankingPrompt,
  buildFeedbackPrompt,
  getRecommendationType,
} = require('../utils/aiPromptBuilder');

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const AI_MODEL = 'deepseek/deepseek-v4-flash';

// Helper: Call OpenRouter API
const callOpenRouter = async (prompt) => {
  const response = await axios.post(
    OPENROUTER_URL,
    {
      model: AI_MODEL,
      messages: [
        { role: 'system', content: 'You are an expert HR consultant providing data-driven employee recommendations.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:5000',
        'X-Title': 'ESE AI HR System',
      },
    }
  );

  return response.data.choices[0].message.content;
};

// @desc    Get AI recommendation for single employee
// @route   POST /api/ai/recommend
// @access  Private
const getRecommendation = async (req, res, next) => {
  try {
    const { employeeId } = req.body;

    if (!employeeId) {
      res.status(400);
      throw new Error('Employee ID is required');
    }

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      res.status(404);
      throw new Error('Employee not found');
    }

    const type = getRecommendationType(employee.performanceScore);
    let prompt;

    switch (type) {
      case 'promotion':
        prompt = buildPromotionPrompt(employee);
        break;
      case 'training':
        prompt = buildTrainingPrompt(employee);
        break;
      default:
        prompt = buildFeedbackPrompt(employee);
    }

    const recommendation = await callOpenRouter(prompt);

    res.json({
      employee: {
        _id: employee._id,
        name: employee.name,
        department: employee.department,
        performanceScore: employee.performanceScore,
      },
      recommendation,
      type,
      score: employee.performanceScore,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    AI ranking of all employees
// @route   POST /api/ai/rank-all
// @access  Private
const rankAll = async (req, res, next) => {
  try {
    const employees = await Employee.find({}).sort({ performanceScore: -1 });

    if (employees.length === 0) {
      res.status(404);
      throw new Error('No employees found to rank');
    }

    const prompt = buildRankingPrompt(employees);
    const ranking = await callOpenRouter(prompt);

    res.json({
      totalEmployees: employees.length,
      ranking,
      employees: employees.map((e) => ({
        _id: e._id,
        name: e.name,
        department: e.department,
        performanceScore: e.performanceScore,
        experience: e.experience,
      })),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    AI feedback for multiple employees
// @route   POST /api/ai/bulk-recommend
// @access  Private
const bulkRecommend = async (req, res, next) => {
  try {
    const { employeeIds } = req.body;

    if (!employeeIds || !Array.isArray(employeeIds) || employeeIds.length === 0) {
      res.status(400);
      throw new Error('Please provide an array of employee IDs');
    }

    const employees = await Employee.find({ _id: { $in: employeeIds } });

    if (employees.length === 0) {
      res.status(404);
      throw new Error('No employees found with the provided IDs');
    }

    const recommendations = await Promise.all(
      employees.map(async (employee) => {
        const type = getRecommendationType(employee.performanceScore);
        let prompt;

        switch (type) {
          case 'promotion':
            prompt = buildPromotionPrompt(employee);
            break;
          case 'training':
            prompt = buildTrainingPrompt(employee);
            break;
          default:
            prompt = buildFeedbackPrompt(employee);
        }

        const recommendation = await callOpenRouter(prompt);

        return {
          employee: {
            _id: employee._id,
            name: employee.name,
            department: employee.department,
            performanceScore: employee.performanceScore,
          },
          recommendation,
          type,
          score: employee.performanceScore,
        };
      })
    );

    res.json({ totalProcessed: recommendations.length, recommendations });
  } catch (error) {
    next(error);
  }
};

module.exports = { getRecommendation, rankAll, bulkRecommend };
