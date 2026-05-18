import { Link } from 'react-router-dom';
import SkillBadge from './SkillBadge';
import { formatDate, formatExperience, getScoreColor, getScoreBg, getInitials } from '../utils/formatters';
import { DEPARTMENT_BADGE_COLORS } from '../utils/constants';

const EmployeeCard = ({ employee, onDelete }) => {
  const { _id, name, email, department, skills, performanceScore, experience, createdAt } = employee;

  const scoreColor = getScoreColor(performanceScore);
  const scoreBg = getScoreBg(performanceScore);

  return (
    <div className="glass-card p-5 flex flex-col gap-4 hover:border-primary-700/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary-950/30 animate-fade-in group">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg shadow-primary-900/30">
            {getInitials(name)}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-white text-sm truncate leading-snug">{name}</h3>
            <p className="text-dark-400 text-xs truncate">{email}</p>
          </div>
        </div>
        {/* Score badge */}
        <div className={`flex-shrink-0 px-2.5 py-1 rounded-lg ring-1 ${scoreBg} ${scoreColor} text-xs font-bold`}>
          {performanceScore}
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`badge ${DEPARTMENT_BADGE_COLORS[department] || 'bg-dark-700 text-dark-300'}`}>
          {department}
        </span>
        <span className="badge bg-dark-800 text-dark-400 ring-1 ring-dark-600/50">
          {formatExperience(experience)}
        </span>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {skills.slice(0, 4).map((skill) => (
          <SkillBadge key={skill} skill={skill} />
        ))}
        {skills.length > 4 && (
          <span className="badge bg-dark-800 text-dark-500 ring-1 ring-dark-600/40 text-[10px]">
            +{skills.length - 4} more
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-dark-700/40">
        <span className="text-[10px] text-dark-600">{formatDate(createdAt)}</span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Link
            to={`/employees/${_id}`}
            className="p-1.5 rounded-lg text-dark-400 hover:text-primary-400 hover:bg-primary-500/10 transition-all"
            title="View"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Link>
          <Link
            to={`/employees/${_id}/edit`}
            className="p-1.5 rounded-lg text-dark-400 hover:text-amber-400 hover:bg-amber-500/10 transition-all"
            title="Edit"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </Link>
          <button
            onClick={() => onDelete(_id)}
            className="p-1.5 rounded-lg text-dark-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
            title="Delete"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
