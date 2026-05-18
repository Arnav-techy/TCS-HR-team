import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { employeeService } from '../services/employeeService';
import SkillBadge from '../components/SkillBadge';
import LoadingSpinner from '../components/LoadingSpinner';
import { DEPARTMENTS, SUGGESTED_SKILLS } from '../utils/constants';
import toast from 'react-hot-toast';

const INITIAL_FORM = {
  name: '', email: '', department: '', skills: [], performanceScore: '', experience: '',
};

const EmployeeFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(INITIAL_FORM);
  const [skillInput, setSkillInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEdit);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      employeeService.getById(id)
        .then((data) => setForm({ ...data, performanceScore: String(data.performanceScore), experience: String(data.experience) }))
        .catch(() => toast.error('Failed to load employee'))
        .finally(() => setFetchLoading(false));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const addSkill = (skill) => {
    const trimmed = skill.trim();
    if (trimmed && !form.skills.includes(trimmed)) {
      setForm((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
    }
    setSkillInput('');
  };

  const removeSkill = (skill) => {
    setForm((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill(skillInput);
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    if (!form.department) errs.department = 'Department is required';
    if (form.skills.length === 0) errs.skills = 'At least one skill is required';
    const score = Number(form.performanceScore);
    if (form.performanceScore === '' || isNaN(score)) errs.performanceScore = 'Performance score is required';
    else if (score < 0 || score > 100) errs.performanceScore = 'Score must be between 0-100';
    const exp = Number(form.experience);
    if (form.experience === '' || isNaN(exp)) errs.experience = 'Experience is required';
    else if (exp < 0) errs.experience = 'Experience cannot be negative';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    try {
      setLoading(true);
      const payload = { ...form, performanceScore: Number(form.performanceScore), experience: Number(form.experience) };
      if (isEdit) {
        await employeeService.update(id, payload);
        toast.success('Employee updated!');
      } else {
        await employeeService.create(payload);
        toast.success('Employee added!');
      }
      navigate('/employees');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save employee');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" text="Loading employee..." /></div>;

  const filteredSuggestions = SUGGESTED_SKILLS.filter(
    (s) => s.toLowerCase().includes(skillInput.toLowerCase()) && !form.skills.includes(s)
  ).slice(0, 8);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-slide-up">
      {/* Header */}
      <div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-dark-400 hover:text-dark-200 text-sm transition-colors mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
        <h1 className="page-title">{isEdit ? 'Edit Employee' : 'Add New Employee'}</h1>
        <p className="text-dark-400 mt-1">{isEdit ? 'Update employee information' : 'Enter employee details below'}</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card p-6 space-y-5">
        {/* Name */}
        <div>
          <label className="form-label" htmlFor="emp-name">Full Name *</label>
          <input id="emp-name" type="text" name="name" value={form.name} onChange={handleChange}
            placeholder="Aman Verma" className={`input-field ${errors.name ? 'border-red-500/50 ring-1 ring-red-500/30' : ''}`} />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="form-label" htmlFor="emp-email">Email Address *</label>
          <input id="emp-email" type="email" name="email" value={form.email} onChange={handleChange}
            placeholder="aman@company.com" className={`input-field ${errors.email ? 'border-red-500/50 ring-1 ring-red-500/30' : ''}`} />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Department */}
        <div>
          <label className="form-label" htmlFor="emp-department">Department *</label>
          <div className="relative">
            <select id="emp-department" name="department" value={form.department} onChange={handleChange}
              className={`input-field appearance-none pr-8 cursor-pointer ${errors.department ? 'border-red-500/50 ring-1 ring-red-500/30' : ''}`}>
              <option value="">Select department</option>
              {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.department && <p className="text-red-400 text-xs mt-1">{errors.department}</p>}
        </div>

        {/* Performance Score + Experience */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label" htmlFor="emp-score">Performance Score * <span className="text-dark-500">(0-100)</span></label>
            <input id="emp-score" type="number" name="performanceScore" value={form.performanceScore} onChange={handleChange}
              placeholder="85" min="0" max="100" className={`input-field ${errors.performanceScore ? 'border-red-500/50 ring-1 ring-red-500/30' : ''}`} />
            {errors.performanceScore && <p className="text-red-400 text-xs mt-1">{errors.performanceScore}</p>}
          </div>
          <div>
            <label className="form-label" htmlFor="emp-experience">Experience * <span className="text-dark-500">(years)</span></label>
            <input id="emp-experience" type="number" name="experience" value={form.experience} onChange={handleChange}
              placeholder="3" min="0" className={`input-field ${errors.experience ? 'border-red-500/50 ring-1 ring-red-500/30' : ''}`} />
            {errors.experience && <p className="text-red-400 text-xs mt-1">{errors.experience}</p>}
          </div>
        </div>

        {/* Skills */}
        <div>
          <label className="form-label" htmlFor="skill-input">Skills * <span className="text-dark-500">(press Enter or comma to add)</span></label>
          {/* Current skills */}
          {form.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {form.skills.map((skill) => (
                <SkillBadge key={skill} skill={skill} onRemove={removeSkill} />
              ))}
            </div>
          )}
          <div className="relative">
            <input
              id="skill-input"
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              placeholder="e.g. React, Node.js, Python..."
              className={`input-field ${errors.skills ? 'border-red-500/50 ring-1 ring-red-500/30' : ''}`}
            />
            {/* Suggestions */}
            {skillInput && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 glass-card py-1 z-10 shadow-xl animate-slide-down">
                {filteredSuggestions.map((s) => (
                  <button key={s} type="button" onClick={() => addSkill(s)}
                    className="w-full text-left px-4 py-2 text-sm text-dark-300 hover:bg-dark-800 hover:text-white transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
          {errors.skills && <p className="text-red-400 text-xs mt-1">{errors.skills}</p>}
          {/* Quick add chips */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {['React', 'Node.js', 'Python', 'AWS', 'Docker', 'Figma'].filter(s => !form.skills.includes(s)).map((s) => (
              <button key={s} type="button" onClick={() => addSkill(s)}
                className="text-[10px] px-2 py-0.5 rounded-lg bg-dark-800 text-dark-400 hover:text-primary-400 hover:bg-dark-700 border border-dark-700/50 transition-all">
                + {s}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={() => navigate(-1)} className="btn-secondary flex-1">Cancel</button>
          <button type="submit" id="employee-form-submit" disabled={loading} className="btn-primary flex-1">
            {loading ? <LoadingSpinner size="sm" /> : null}
            {loading ? 'Saving...' : isEdit ? 'Update Employee' : 'Add Employee'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeFormPage;
