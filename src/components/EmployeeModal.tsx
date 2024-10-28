import React from 'react';
import { X } from 'lucide-react';
import type { Employee } from '../stores/employeeStore';
import AddEmployeeForm from './Employee/AddEmployeeForm';
import EmployeeDetailModal from './Employee/EmployeeDetailModal';

interface EmployeeModalProps {
  isOpen: boolean;
  employee: Employee | null;
  onClose: () => void;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({
  isOpen,
  employee,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        <div className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
          {employee ? (
            <EmployeeDetailModal employee={employee} onClose={onClose} />
          ) : (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Add New Employee
                </h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <AddEmployeeForm onClose={onClose} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;