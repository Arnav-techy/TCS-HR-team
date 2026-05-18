import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { ROLES } from '../utils/constants';

const SignupPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'hr' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all required fields');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    try {
      setLoading(true);
      await signup(form.name, form.email, form.password, form.role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md animate-slide-up relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-600 mb-4 shadow-xl shadow-primary-900/40">
            <span className="text-white text-2xl font-bold">AI</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">Create account</h1>
          <p className="text-dark-400">Join the HR Analytics platform</p>
        </div>

        <div className="glass-card p-8">
          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="form-label" htmlFor="signup-name">Full Name</label>
              <input id="signup-name" type="text" name="name" value={form.name} onChange={handleChange}
                placeholder="Aman Verma" className="input-field" required />
            </div>

            <div>
              <label className="form-label" htmlFor="signup-email">Email Address</label>
              <input id="signup-email" type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="hr@company.com" className="input-field" autoComplete="email" required />
            </div>

            <div>
              <label className="form-label" htmlFor="signup-password">Password <span className="text-dark-500">(min 6 chars)</span></label>
              <input id="signup-password" type="password" name="password" value={form.password} onChange={handleChange}
                placeholder="••••••••" className="input-field" autoComplete="new-password" required />
            </div>

            <div>
              <label className="form-label" htmlFor="signup-role">Role</label>
              <div className="relative">
                <select id="signup-role" name="role" value={form.role} onChange={handleChange}
                  className="input-field appearance-none pr-8 cursor-pointer">
                  <option value="hr">HR Manager</option>
                  <option value="admin">Admin</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <button type="submit" id="signup-submit" disabled={loading} className="btn-primary w-full">
              {loading ? <LoadingSpinner size="sm" /> : null}
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-dark-400">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
