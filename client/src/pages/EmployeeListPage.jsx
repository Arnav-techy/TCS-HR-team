import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useEmployees } from '../hooks/useEmployees';
import EmployeeCard from '../components/EmployeeCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import LoadingSpinner from '../components/LoadingSpinner';

const EmployeeListPage = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState(searchParams.get('department') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || '');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const { employees, loading, error, deleteEmployee, setParams } = useEmployees();

  useEffect(() => {
    const params = {};
    if (department) params.department = department;
    if (search) params.search = search;
    if (sort) params.sort = sort;
    setParams(params);
  }, [department, search, sort]);

  const handleDelete = (id) => setConfirmDelete(id);

  const confirmDeleteAction = async () => {
    if (confirmDelete) {
      await deleteEmployee(confirmDelete);
      setConfirmDelete(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 animate-fade-in">
        <div>
          <h1 className="page-title">Employees</h1>
          <p className="text-dark-400 mt-1">
            {loading ? 'Loading...' : `${employees.length} employee${employees.length !== 1 ? 's' : ''} found`}
          </p>
        </div>
        <Link to="/employees/new" className="btn-primary">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Employee
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 animate-fade-in">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name or email..." />
        <FilterPanel
          department={department}
          sort={sort}
          onDepartmentChange={setDepartment}
          onSortChange={setSort}
        />
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-20"><LoadingSpinner size="lg" text="Loading employees..." /></div>
      ) : error ? (
        <div className="glass-card p-8 text-center text-red-400">{error}</div>
      ) : employees.length === 0 ? (
        <div className="glass-card p-12 text-center animate-fade-in">
          <div className="text-5xl mb-4">👥</div>
          <p className="text-dark-300 font-medium mb-2">No employees found</p>
          <p className="text-dark-500 text-sm mb-6">
            {search || department ? 'Try adjusting your search or filters' : 'Add your first employee to get started'}
          </p>
          {!search && !department && (
            <Link to="/employees/new" className="btn-primary">Add Employee</Link>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {employees.map((emp) => (
            <EmployeeCard key={emp._id} employee={emp} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {/* Delete Confirm Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-card p-6 max-w-sm w-full animate-scale-in">
            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-2xl bg-red-500/15 flex items-center justify-center text-2xl mx-auto mb-3">🗑️</div>
              <h3 className="text-white font-semibold text-lg">Delete Employee?</h3>
              <p className="text-dark-400 text-sm mt-1">This action cannot be undone.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={confirmDeleteAction} className="btn-danger flex-1">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeListPage;
