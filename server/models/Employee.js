const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Employee name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    enum: {
      values: ['Development', 'Design', 'Marketing', 'HR', 'Finance', 'Operations'],
      message: '{VALUE} is not a valid department',
    },
  },
  skills: {
    type: [String],
    required: [true, 'At least one skill is required'],
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: 'At least one skill is required',
    },
  },
  performanceScore: {
    type: Number,
    required: [true, 'Performance score is required'],
    min: [0, 'Performance score cannot be less than 0'],
    max: [100, 'Performance score cannot be more than 100'],
  },
  experience: {
    type: Number,
    required: [true, 'Experience is required'],
    min: [0, 'Experience cannot be negative'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Employee', employeeSchema);
