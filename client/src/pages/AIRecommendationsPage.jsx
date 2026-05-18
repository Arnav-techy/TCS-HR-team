import { useState, useEffect } from 'react';
import { employeeService } from '../services/employeeService';
import { useAI } from '../hooks/useAI';
import AIRecommendationCard from '../components/AIRecommendationCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getScoreColor, getInitials } from '../utils/formatters';
import { DEPARTMENT_BADGE_COLORS } from '../utils/constants';

const AIRecommendationsPage = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(true);
  const [selectedId, setSelectedId] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeTab, setActiveTab] = useState('single');
  const { recommendation, ranking, bulkResults, loading, getRecommendation, rankAll, bulkRecommend } = useAI();

  useEffect(() => {
    employeeService.getAll().then(setEmployees).catch(console.error).finally(() => setEmpLoading(false));
  }, []);

  const toggleSelect = (id) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  let parsedRanking = null;
  if (ranking?.ranking) {
    try { parsedRanking = JSON.parse(ranking.ranking); } catch { parsedRanking = null; }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">🤖 AI Insights</h1>
        <p className="text-dark-400 mt-1">Generate AI-powered recommendations and rankings</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-dark-900/50 rounded-xl border border-dark-700/40 w-fit">
        {[['single','Single Employee'],['bulk','Bulk Recommend'],['rank','Rank All']].map(([key, label]) => (
          <button key={key} onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === key ? 'bg-primary-600 text-white shadow-lg' : 'text-dark-400 hover:text-dark-200'}`}>
            {label}
          </button>
        ))}
      </div>

      {empLoading ? (
        <div className="flex justify-center py-12"><LoadingSpinner size="lg" text="Loading employees..." /></div>
      ) : (
        <>
          {/* Single */}
          {activeTab === 'single' && (
            <div className="space-y-5 animate-fade-in">
              <div className="glass-card p-5">
                <h2 className="section-title mb-4">Select Employee</h2>
                <div className="flex gap-3 flex-wrap">
                  <div className="relative flex-1 min-w-[220px]">
                    <select id="single-employee-select" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}
                      className="input-field appearance-none pr-8 cursor-pointer">
                      <option value="">Choose an employee...</option>
                      {employees.map((e) => (
                        <option key={e._id} value={e._id}>{e.name} — {e.department} ({e.performanceScore}/100)</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <button onClick={() => getRecommendation(selectedId)} disabled={!selectedId || loading} className="btn-primary">
                    {loading ? <LoadingSpinner size="sm" /> : '✨'}
                    {loading ? 'Generating...' : 'Get AI Recommendation'}
                  </button>
                </div>
              </div>
              {recommendation && <AIRecommendationCard data={recommendation} />}
            </div>
          )}

          {/* Bulk */}
          {activeTab === 'bulk' && (
            <div className="space-y-5 animate-fade-in">
              <div className="glass-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="section-title">Select Employees ({selectedIds.length} selected)</h2>
                  <button onClick={() => bulkRecommend(selectedIds)} disabled={selectedIds.length === 0 || loading} className="btn-primary text-sm">
                    {loading ? <LoadingSpinner size="sm" /> : '🤖'}
                    {loading ? 'Processing...' : 'Generate Bulk Recommendations'}
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto scrollbar-thin pr-1">
                  {employees.map((emp) => (
                    <label key={emp._id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedIds.includes(emp._id) ? 'bg-primary-600/10 border-primary-500/40' : 'bg-dark-800/30 border-dark-700/30 hover:border-dark-600'}`}>
                      <input type="checkbox" checked={selectedIds.includes(emp._id)} onChange={() => toggleSelect(emp._id)} className="accent-primary-500 w-4 h-4" />
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {getInitials(emp.name)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">{emp.name}</p>
                        <p className="text-xs text-dark-400">{emp.department} · <span className={getScoreColor(emp.performanceScore)}>{emp.performanceScore}/100</span></p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              {bulkResults && (
                <div className="space-y-4">
                  <h2 className="section-title">Results ({bulkResults.totalProcessed} recommendations)</h2>
                  {bulkResults.recommendations.map((r, i) => (
                    <AIRecommendationCard key={i} data={r} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Rank All */}
          {activeTab === 'rank' && (
            <div className="space-y-5 animate-fade-in">
              <div className="glass-card p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="section-title">AI Employee Ranking</h2>
                    <p className="text-dark-400 text-sm mt-1">Rank all {employees.length} employees by potential</p>
                  </div>
                  <button onClick={rankAll} disabled={loading || employees.length === 0} className="btn-primary">
                    {loading ? <LoadingSpinner size="sm" /> : '🏆'}
                    {loading ? 'Ranking...' : 'Rank All Employees'}
                  </button>
                </div>
              </div>
              {parsedRanking && (
                <div className="glass-card p-5 space-y-3">
                  <h2 className="section-title">🏆 Ranking Results</h2>
                  {parsedRanking.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-3 rounded-xl bg-dark-800/40 border border-dark-700/30">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${i === 0 ? 'bg-amber-500/20 text-amber-400' : i === 1 ? 'bg-slate-500/20 text-slate-300' : i === 2 ? 'bg-orange-700/20 text-orange-400' : 'bg-dark-700 text-dark-400'}`}>
                        {item.rank}
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">{item.name}</p>
                        <p className="text-dark-400 text-xs mt-0.5">{item.reason}</p>
                        <span className={`badge text-[10px] mt-1.5 ${item.potential === 'high' ? 'bg-emerald-500/15 text-emerald-400' : item.potential === 'medium' ? 'bg-amber-500/15 text-amber-400' : 'bg-red-500/15 text-red-400'}`}>
                          {item.potential} potential
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {ranking && !parsedRanking && (
                <div className="glass-card p-5">
                  <h2 className="section-title mb-3">🏆 AI Ranking</h2>
                  <p className="text-dark-300 text-sm whitespace-pre-wrap leading-relaxed">{ranking.ranking}</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AIRecommendationsPage;
