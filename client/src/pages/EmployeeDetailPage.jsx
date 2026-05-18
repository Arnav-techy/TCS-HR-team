import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { employeeService } from '../services/employeeService';
import { useAI } from '../hooks/useAI';
import SkillBadge from '../components/SkillBadge';
import AIRecommendationCard from '../components/AIRecommendationCard';
import PerformanceChart from '../components/PerformanceChart';
import LoadingSpinner from '../components/LoadingSpinner';
import { formatDate, formatExperience, getScoreColor, getScoreLabel, getInitials } from '../utils/formatters';
import { DEPARTMENT_BADGE_COLORS } from '../utils/constants';

const EmployeeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const { recommendation, loading: aiLoading, getRecommendation } = useAI();

  useEffect(() => {
    employeeService.getById(id)
      .then(setEmployee)
      .catch(() => navigate('/employees'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" text="Loading profile..." /></div>;
  if (!employee) return null;

  const { name, email, department, skills, performanceScore, experience, createdAt } = employee;
  const scoreLabel = getScoreLabel(performanceScore);
  const scoreColor = getScoreColor(performanceScore);

  const radarData = [
    { name: 'Performance', score: performanceScore },
    { name: 'Experience', score: Math.min(experience * 10, 100) },
    { name: 'Skills', score: Math.min(skills.length * 12, 100) },
    { name: 'Tenure', score: Math.min(experience * 8, 100) },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-dark-400 hover:text-dark-200 text-sm transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Employees
      </button>

      <div className="glass-card p-6">
        <div className="flex items-start gap-5 flex-wrap">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-primary-900/40 flex-shrink-0">
            {getInitials(name)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <h1 className="text-2xl font-bold text-white">{name}</h1>
                <p className="text-dark-400 text-sm mt-0.5">{email}</p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className={`badge ${DEPARTMENT_BADGE_COLORS[department] || 'bg-dark-700 text-dark-300'}`}>{department}</span>
                  <span className="badge bg-dark-800 text-dark-400 ring-1 ring-dark-600/50">{formatExperience(experience)}</span>
                  <span className="text-dark-600 text-xs">Added {formatDate(createdAt)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link to={`/employees/${id}/edit`} className="btn-secondary text-sm py-2">Edit</Link>
                <button onClick={() => getRecommendation(id)} disabled={aiLoading} className="btn-primary text-sm py-2">
                  {aiLoading ? <LoadingSpinner size="sm" /> : '🤖'}
                  {aiLoading ? 'Analyzing...' : 'AI Insights'}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 pt-5 border-t border-dark-700/40">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-dark-400 text-sm">Performance Score</span>
            <span className={`text-sm font-bold ${scoreColor}`}>{performanceScore}/100 · {scoreLabel}</span>
          </div>
          <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700" style={{
              width: `${performanceScore}%`,
              background: performanceScore >= 85 ? 'linear-gradient(to right,#10b981,#34d399)' : performanceScore >= 50 ? 'linear-gradient(to right,#f59e0b,#fbbf24)' : 'linear-gradient(to right,#ef4444,#f87171)'
            }} />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h2 className="section-title mb-4">Skills ({skills.length})</h2>
          <div className="flex flex-wrap gap-2">{skills.map((s) => <SkillBadge key={s} skill={s} />)}</div>
        </div>
        <div className="glass-card p-6">
          <PerformanceChart data={radarData} type="radar" title="Capability Overview" />
        </div>
      </div>

      {recommendation && (
        <div className="animate-slide-up">
          <h2 className="section-title mb-3">🤖 AI Analysis</h2>
          <AIRecommendationCard data={recommendation} />
        </div>
      )}
    </div>
  );
};

export default EmployeeDetailPage;
