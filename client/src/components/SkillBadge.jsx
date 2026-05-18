import { DEPARTMENT_BADGE_COLORS } from '../utils/constants';

const SkillBadge = ({ skill, onRemove }) => {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary-500/10 text-primary-400 ring-1 ring-primary-500/25 text-xs font-medium transition-all duration-150 hover:bg-primary-500/20">
      {skill}
      {onRemove && (
        <button
          type="button"
          onClick={() => onRemove(skill)}
          className="ml-0.5 rounded-full hover:text-white transition-colors"
          aria-label={`Remove ${skill}`}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
};

export default SkillBadge;
