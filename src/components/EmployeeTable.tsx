import React, { useState } from 'react';
import { MoreVertical, Search, Eye, Calendar, Edit, Trash2, ChevronDown } from 'lucide-react';
import type { Employee } from '../stores/employeeStore';

interface EmployeeTableProps {
  employees: Employee[];
  onEmployeeClick: (employee: Employee) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onEmployeeClick }) => {
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  const handleActionClick = (e: React.MouseEvent, employeeId: string) => {
    e.stopPropagation();
    setActionMenuOpen(actionMenuOpen === employeeId ? null : employeeId);
  };

  const handleAction = (
    e: React.MouseEvent,
    action: 'view' | 'schedule' | 'edit' | 'delete',
    employee: Employee
  ) => {
    e.stopPropagation();
    setActionMenuOpen(null);

    switch (action) {
      case 'view':
        onEmployeeClick(employee);
        break;
      case 'schedule':
        onEmployeeClick(employee);
        break;
      case 'edit':
        // Handle edit action
        break;
      case 'delete':
        // Handle delete action
        break;
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Employee Overview</h2>
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 w-64">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees..."
              className="bg-transparent border-none focus:outline-none ml-2 w-full text-sm"
            />
          </div>
        </div>
      </div>
      <div className="min-w-full">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-700">
                  Employee
                  <ChevronDown className="w-4 h-4" />
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-700">
                  Role
                  <ChevronDown className="w-4 h-4" />
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-700">
                  Department
                  <ChevronDown className="w-4 h-4" />
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-700">
                  Start Date
                  <ChevronDown className="w-4 h-4" />
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={employee.avatar}
                      alt={employee.name}
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {employee.name}
                      </div>
                      <div className="text-sm text-gray-500">{employee.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {employee.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {employee.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    employee.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : employee.status === 'On Leave'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {employee.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(employee.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="relative">
                    <button
                      onClick={(e) => handleActionClick(e, employee.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    {actionMenuOpen === employee.id && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1" role="menu">
                          <button
                            onClick={(e) => handleAction(e, 'view', employee)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Eye className="w-4 h-4 mr-3" />
                            View Details
                          </button>
                          <button
                            onClick={(e) => handleAction(e, 'schedule', employee)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Calendar className="w-4 h-4 mr-3" />
                            Schedule Meeting
                          </button>
                          <button
                            onClick={(e) => handleAction(e, 'edit', employee)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Edit className="w-4 h-4 mr-3" />
                            Edit Employee
                          </button>
                          <button
                            onClick={(e) => handleAction(e, 'delete', employee)}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            <Trash2 className="w-4 h-4 mr-3" />
                            Delete Employee
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;