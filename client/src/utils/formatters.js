import { PERFORMANCE_THRESHOLDS } from './constants';

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
};

export const formatScore = (score) => {
  if (score === null || score === undefined) return 'N/A';
  return `${score}/100`;
};

export const getScoreColor = (score) => {
  if (score >= PERFORMANCE_THRESHOLDS.HIGH) return 'text-emerald-400';
  if (score >= PERFORMANCE_THRESHOLDS.MID) return 'text-amber-400';
  return 'text-red-400';
};

export const getScoreBg = (score) => {
  if (score >= PERFORMANCE_THRESHOLDS.HIGH) return 'bg-emerald-500/15 ring-emerald-500/30';
  if (score >= PERFORMANCE_THRESHOLDS.MID) return 'bg-amber-500/15 ring-amber-500/30';
  return 'bg-red-500/15 ring-red-500/30';
};

export const getScoreGradient = (score) => {
  if (score >= PERFORMANCE_THRESHOLDS.HIGH) return 'from-emerald-500 to-green-400';
  if (score >= PERFORMANCE_THRESHOLDS.MID) return 'from-amber-500 to-yellow-400';
  return 'from-red-500 to-rose-400';
};

export const getScoreLabel = (score) => {
  if (score >= PERFORMANCE_THRESHOLDS.HIGH) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= PERFORMANCE_THRESHOLDS.MID) return 'Average';
  if (score >= 30) return 'Below Average';
  return 'Poor';
};

export const formatExperience = (years) => {
  if (years === 0) return 'Fresher';
  if (years === 1) return '1 year';
  return `${years} years`;
};

export const getInitials = (name) => {
  if (!name) return '??';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const truncate = (str, length = 80) => {
  if (!str) return '';
  return str.length > length ? `${str.slice(0, length)}...` : str;
};
