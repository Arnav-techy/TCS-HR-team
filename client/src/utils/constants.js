export const DEPARTMENTS = ['Development', 'Design', 'Marketing', 'HR', 'Finance', 'Operations'];

export const ROLES = ['hr', 'admin'];

export const SORT_OPTIONS = [
  { value: 'createdAt_desc', label: 'Newest First' },
  { value: 'performance_desc', label: 'Performance: High to Low' },
  { value: 'performance_asc', label: 'Performance: Low to High' },
  { value: 'experience_desc', label: 'Experience: High to Low' },
  { value: 'experience_asc', label: 'Experience: Low to High' },
  { value: 'name_asc', label: 'Name: A to Z' },
  { value: 'name_desc', label: 'Name: Z to A' },
];

export const PERFORMANCE_THRESHOLDS = {
  HIGH: 85,
  MID: 50,
};

export const DEPARTMENT_COLORS = {
  Development: 'from-blue-500 to-cyan-500',
  Design: 'from-purple-500 to-pink-500',
  Marketing: 'from-orange-500 to-amber-500',
  HR: 'from-green-500 to-emerald-500',
  Finance: 'from-yellow-500 to-lime-500',
  Operations: 'from-red-500 to-rose-500',
};

export const DEPARTMENT_BADGE_COLORS = {
  Development: 'bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30',
  Design: 'bg-purple-500/15 text-purple-400 ring-1 ring-purple-500/30',
  Marketing: 'bg-orange-500/15 text-orange-400 ring-1 ring-orange-500/30',
  HR: 'bg-green-500/15 text-green-400 ring-1 ring-green-500/30',
  Finance: 'bg-yellow-500/15 text-yellow-400 ring-1 ring-yellow-500/30',
  Operations: 'bg-red-500/15 text-red-400 ring-1 ring-red-500/30',
};

export const AI_TYPE_CONFIG = {
  promotion: {
    label: 'Promotion Ready',
    color: 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30',
    icon: '🚀',
    description: 'High performer eligible for promotion',
  },
  training: {
    label: 'Training Suggested',
    color: 'bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30',
    icon: '📚',
    description: 'Mid-level performer needing skill development',
  },
  improvement: {
    label: 'Needs Improvement',
    color: 'bg-red-500/15 text-red-400 ring-1 ring-red-500/30',
    icon: '⚡',
    description: 'Requires performance improvement plan',
  },
};

export const SUGGESTED_SKILLS = [
  'React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'Python', 'AWS',
  'Docker', 'Kubernetes', 'GraphQL', 'REST APIs', 'SQL', 'PostgreSQL',
  'Figma', 'Adobe XD', 'UI/UX Design', 'Tailwind CSS', 'Vue.js', 'Angular',
  'Machine Learning', 'Data Analysis', 'Excel', 'Power BI', 'Tableau',
  'SEO', 'Content Marketing', 'Social Media', 'Google Analytics',
  'Recruitment', 'Payroll', 'Compliance', 'Training & Development',
  'Financial Planning', 'Budgeting', 'Accounting', 'Risk Management',
  'Project Management', 'Agile', 'Scrum', 'Leadership',
];
