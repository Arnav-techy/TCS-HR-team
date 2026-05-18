import { AI_TYPE_CONFIG } from '../utils/constants';

const AIRecommendationCard = ({ data, compact = false }) => {
  if (!data) return null;

  const { employee, recommendation, type, score } = data;
  const config = AI_TYPE_CONFIG[type] || AI_TYPE_CONFIG.improvement;

  return (
    <div className="glass-card p-5 flex flex-col gap-4 animate-scale-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center text-xl flex-shrink-0">
            {config.icon}
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">{employee?.name || 'Employee'}</h3>
            <p className="text-dark-400 text-xs">{employee?.department} · Score: {score}/100</p>
          </div>
        </div>
        <span className={`badge ${config.color} text-xs`}>
          {config.label}
        </span>
      </div>

      {/* AI Response */}
      {!compact && (
        <div className="bg-dark-800/50 rounded-xl p-4 border border-dark-700/40">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
            <span className="text-xs font-medium text-primary-400 uppercase tracking-wider">AI Analysis</span>
          </div>
          <p className="text-dark-300 text-sm leading-relaxed whitespace-pre-wrap">{recommendation}</p>
        </div>
      )}

      {compact && (
        <p className="text-dark-400 text-xs leading-relaxed line-clamp-3">{recommendation}</p>
      )}
    </div>
  );
};

export default AIRecommendationCard;
