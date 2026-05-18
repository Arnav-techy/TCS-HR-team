import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { employeeService } from '../services/employeeService';
import PerformanceChart from '../components/PerformanceChart';
import LoadingSpinner from '../components/LoadingSpinner';
import { getScoreColor, formatExperience, getInitials } from '../utils/formatters';
import { DEPARTMENT_COLORS, DEPARTMENT_BADGE_COLORS } from '../utils/constants';

const StatCard = ({ icon, label, value, sub, color = 'primary' }) => (
  <div className="stat-card animate-slide-up">
    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-lg`}>
      {icon}
    </div>
    <div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-dark-400 text-sm">{label}</p>
      {sub && <p className="text-dark-500 text-xs mt-0.5">{sub}</p>}
    </div>
  </div>
);

const DashboardPage = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    employeeService.getAll().then(setEmployees).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" text="Loading dashboard..." /></div>;

  const avgScore = employees.length ? Math.round(employees.reduce((s, e) => s + e.performanceScore, 0) / employees.length) : 0;
  const topPerformers = [...employees].sort((a, b) => b.performanceScore - a.performanceScore).slice(0, 5);
  const totalExperience = employees.length ? Math.round(employees.reduce((s, e) => s + e.experience, 0) / employees.length) : 0;

  // Department distribution for chart
  const deptMap = {};
  employees.forEach((e) => {
    if (!deptMap[e.department]) deptMap[e.department] = { count: 0, totalScore: 0 };
    deptMap[e.department].count++;
    deptMap[e.department].totalScore += e.performanceScore;
  });
  const deptChartData = Object.entries(deptMap).map(([name, d]) => ({
    name,
    score: Math.round(d.totalScore / d.count),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="page-title">
          Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span> 👋
        </h1>
        <p className="text-dark-400 mt-1">Here's your HR analytics overview</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="👥" label="Total Employees" value={employees.length} color="from-primary-500 to-violet-600" />
        <StatCard icon="📊" label="Avg Performance" value={`${avgScore}%`} color="from-emerald-500 to-green-600" sub="Across all employees" />
        <StatCard icon="⭐" label="Top Performers" value={employees.filter(e => e.performanceScore >= 85).length} color="from-amber-500 to-orange-600" sub="Score ≥ 85" />
        <StatCard icon="🕐" label="Avg Experience" value={`${totalExperience} yrs`} color="from-cyan-500 to-blue-600" sub="Years in field" />
      </div>

      {/* Charts + Top Performers */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Dept Chart */}
        <div className="glass-card p-6 animate-slide-up">
          <h2 className="section-title mb-4">Avg Score by Department</h2>
          {deptChartData.length > 0 ? (
            <PerformanceChart data={deptChartData} type="bar" />
          ) : (
            <div className="text-center py-10 text-dark-500 text-sm">No department data yet</div>
          )}
        </div>

        {/* Top Performers */}
        <div className="glass-card p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Top Performers</h2>
            <Link to="/employees?sort=performance_desc" className="text-xs text-primary-400 hover:text-primary-300 transition-colors">View all →</Link>
          </div>
          {topPerformers.length > 0 ? (
            <div className="space-y-3">
              {topPerformers.map((emp, i) => (
                <Link key={emp._id} to={`/employees/${emp._id}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-dark-800/50 transition-all group">
                  <div className="w-7 h-7 rounded-lg bg-dark-800 flex items-center justify-center text-xs font-bold text-dark-400">
                    {i + 1}
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {getInitials(emp.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate group-hover:text-primary-300 transition-colors">{emp.name}</p>
                    <p className="text-xs text-dark-500">{emp.department} · {formatExperience(emp.experience)}</p>
                  </div>
                  <div className={`text-sm font-bold ${getScoreColor(emp.performanceScore)}`}>
                    {emp.performanceScore}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-dark-500 text-sm">No employees yet</div>
          )}
        </div>
      </div>

      {/* Department Distribution */}
      <div className="glass-card p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Department Distribution</h2>
          <Link to="/employees/new" className="btn-primary text-sm py-2">+ Add Employee</Link>
        </div>
        {Object.keys(deptMap).length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.entries(deptMap).map(([dept, data]) => (
              <Link key={dept} to={`/employees?department=${dept}`} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-dark-800/50 hover:bg-dark-800 border border-dark-700/40 hover:border-primary-700/30 transition-all group">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${DEPARTMENT_COLORS[dept] || 'from-primary-500 to-violet-600'} flex items-center justify-center text-white text-lg shadow-lg`}>
                  {dept === 'Development' ? '💻' : dept === 'Design' ? '🎨' : dept === 'Marketing' ? '📣' : dept === 'HR' ? '🧑‍💼' : dept === 'Finance' ? '💰' : '⚙️'}
                </div>
                <div className="text-center">
                  <p className="text-white font-semibold text-lg">{data.count}</p>
                  <p className="text-dark-400 text-[10px] leading-tight">{dept}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-dark-500 text-sm">
            No employees yet.{' '}
            <Link to="/employees/new" className="text-primary-400 hover:text-primary-300 transition-colors">Add your first employee →</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
