import { DEPARTMENTS, SORT_OPTIONS } from '../utils/constants';

const FilterPanel = ({ department, sort, onDepartmentChange, onSortChange }) => {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Department filter */}
      <div className="relative">
        <select
          id="department-filter"
          value={department}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className="input-field py-2.5 pr-8 text-sm appearance-none cursor-pointer min-w-[160px]"
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <svg className="w-3.5 h-3.5 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Sort */}
      <div className="relative">
        <select
          id="sort-filter"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="input-field py-2.5 pr-8 text-sm appearance-none cursor-pointer min-w-[190px]"
        >
          <option value="">Default Sort</option>
          {SORT_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <svg className="w-3.5 h-3.5 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Reset */}
      {(department || sort) && (
        <button
          type="button"
          onClick={() => { onDepartmentChange(''); onSortChange(''); }}
          className="text-xs text-dark-400 hover:text-primary-400 transition-colors flex items-center gap-1"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset
        </button>
      )}
    </div>
  );
};

export default FilterPanel;
