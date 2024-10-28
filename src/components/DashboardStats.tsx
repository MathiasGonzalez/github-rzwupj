import React from 'react';
import { Users, UserPlus, UserMinus, DollarSign } from 'lucide-react';

const DashboardStats = () => {
  const stats = [
    {
      icon: Users,
      label: 'Total Employees',
      value: '248',
      change: '+12%',
      positive: true,
    },
    {
      icon: UserPlus,
      label: 'New Hires',
      value: '14',
      change: '+18%',
      positive: true,
    },
    {
      icon: UserMinus,
      label: 'Resignations',
      value: '3',
      change: '-25%',
      positive: false,
    },
    {
      icon: DollarSign,
      label: 'Payroll',
      value: '$284.5k',
      change: '+8%',
      positive: true,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-50 rounded-lg">
              <stat.icon className="w-6 h-6 text-blue-600" />
            </div>
            <span className={`text-sm ${
              stat.positive ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
            } px-2 py-1 rounded-full`}>
              {stat.change}
            </span>
          </div>
          <h3 className="text-2xl font-bold mt-4">{stat.value}</h3>
          <p className="text-gray-600 text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;