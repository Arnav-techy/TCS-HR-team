const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getRecommendation, rankAll, bulkRecommend } = require('../controllers/aiController');

// All routes are protected
router.use(protect);

// POST /api/ai/recommend - Get AI recommendation for single employee
router.post('/recommend', getRecommendation);

// POST /api/ai/rank-all - AI ranking of all employees
router.post('/rank-all', rankAll);

// POST /api/ai/bulk-recommend - AI feedback for multiple employees
router.post('/bulk-recommend', bulkRecommend);

module.exports = router;
