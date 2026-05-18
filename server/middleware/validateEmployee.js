const { body, validationResult } = require('express-validator');

const validateEmployee = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Employee name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),

  body('department')
    .trim()
    .notEmpty()
    .withMessage('Department is required')
    .isIn(['Development', 'Design', 'Marketing', 'HR', 'Finance', 'Operations'])
    .withMessage('Invalid department. Must be one of: Development, Design, Marketing, HR, Finance, Operations'),

  body('skills')
    .isArray({ min: 1 })
    .withMessage('At least one skill is required'),

  body('skills.*')
    .trim()
    .notEmpty()
    .withMessage('Skill cannot be empty'),

  body('performanceScore')
    .notEmpty()
    .withMessage('Performance score is required')
    .isFloat({ min: 0, max: 100 })
    .withMessage('Performance score must be between 0 and 100'),

  body('experience')
    .notEmpty()
    .withMessage('Experience is required')
    .isFloat({ min: 0 })
    .withMessage('Experience cannot be negative'),

  // Middleware to check validation results
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: 'Validation failed',
        errors: errors.array(),
      });
    }
    next();
  },
];

module.exports = { validateEmployee };
