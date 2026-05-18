import { useState, useEffect, useCallback } from 'react';
import { employeeService } from '../services/employeeService';
import toast from 'react-hot-toast';

export const useEmployees = (initialParams = {}) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await employeeService.getAll(params);
      setEmployees(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const deleteEmployee = async (id) => {
    try {
      await employeeService.delete(id);
      setEmployees((prev) => prev.filter((e) => e._id !== id));
      toast.success('Employee deleted successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete employee');
    }
  };

  return { employees, loading, error, fetchEmployees, deleteEmployee, setParams };
};
