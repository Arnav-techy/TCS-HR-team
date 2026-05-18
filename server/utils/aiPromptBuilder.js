/**
 * AI Prompt Builder Utility
 * Builds prompts for OpenRouter API based on recommendation type
 */

const buildPromotionPrompt = (employee) => {
  return `You are an expert HR consultant. Analyze this employee and provide a promotion recommendation.

Employee Details:
- Name: ${employee.name}
- Department: ${employee.department}
- Performance Score: ${employee.performanceScore}/100
- Experience: ${employee.experience} years
- Skills: ${employee.skills.join(', ')}

Should this employee be promoted? Provide a concise, actionable recommendation (3-4 sentences). Include:
1. Your promotion decision (Yes/No/Not Yet)
2. Key strengths supporting your decision
3. Any areas for improvement before promotion
4. Suggested next role or responsibility if promoting`;
};

const buildTrainingPrompt = (employee) => {
  return `You are an expert HR training consultant. Analyze this employee's skills gap.

Employee Details:
- Name: ${employee.name}
- Department: ${employee.department}
- Current Skills: ${employee.skills.join(', ')}
- Performance Score: ${employee.performanceScore}/100
- Experience: ${employee.experience} years

The ${employee.department} department needs modern tools and technologies. Suggest exactly 3 specific training areas with:
1. Training topic name
2. Why it's relevant to their department
3. Expected impact on performance
Keep each suggestion to 1-2 sentences.`;
};

const buildRankingPrompt = (employees) => {
  const employeeList = employees.map((e, i) => 
    `${i + 1}. ${e.name} | Dept: ${e.department} | Score: ${e.performanceScore}/100 | Exp: ${e.experience}yrs | Skills: ${e.skills.join(', ')}`
  ).join('\n');

  return `You are an expert HR analyst. Rank these employees by overall potential and value.

Employees:
${employeeList}

Return a JSON array sorted by potential (highest first). Each entry should have:
- "name": employee name
- "rank": numeric rank (1 = highest)
- "potential": "high" | "medium" | "low"
- "reason": one sentence explaining the ranking

Return ONLY the JSON array, no other text.`;
};

const buildFeedbackPrompt = (employee) => {
  return `You are an expert HR performance coach. Provide actionable feedback for this employee.

Employee Details:
- Name: ${employee.name}
- Department: ${employee.department}
- Performance Score: ${employee.performanceScore}/100
- Experience: ${employee.experience} years
- Skills: ${employee.skills.join(', ')}

Based on their performance score of ${employee.performanceScore}/100, provide 2-3 specific, actionable improvement tips. Each tip should:
1. Identify a specific area
2. Suggest a concrete action
3. Explain the expected benefit
Keep each tip to 1-2 sentences.`;
};

const getRecommendationType = (score) => {
  if (score >= 85) return 'promotion';
  if (score >= 50) return 'training';
  return 'improvement';
};

module.exports = {
  buildPromotionPrompt,
  buildTrainingPrompt,
  buildRankingPrompt,
  buildFeedbackPrompt,
  getRecommendationType,
};
