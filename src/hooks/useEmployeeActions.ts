import { useState } from 'react';
import useEmployeeStore from '../stores/employeeStore';
import type { Employee } from '../stores/employeeStore';

export const useEmployeeActions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const store = useEmployeeStore();

  const handleAction = async <T>(
    action: () => Promise<T>,
    errorMessage: string
  ): Promise<T | undefined> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await action();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : errorMessage);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  const createEmployee = (employee: Omit<Employee, 'id'>) =>
    handleAction(
      () => store.createEmployee(employee),
      'Failed to create employee'
    );

  const updateEmployee = (id: string, updates: Partial<Employee>) =>
    handleAction(
      () => store.updateEmployee(id, updates),
      'Failed to update employee'
    );

  const deleteEmployee = (id: string) =>
    handleAction(
      () => store.deleteEmployee(id),
      'Failed to delete employee'
    );

  const fetchEmployee = (id: string) =>
    handleAction(
      () => store.fetchEmployee(id),
      'Failed to fetch employee'
    );

  return {
    isLoading,
    error,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    fetchEmployee,
  };
};