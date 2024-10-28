import React from 'react';
import { useTranslation } from 'react-i18next';
import { GraduationCap, Briefcase, Award, Target, ArrowUpRight, Users } from 'lucide-react';
import useEmployeeStore from '../stores/employeeStore';

const EmployeeLifecyclePage = () => {
  const { t } = useTranslation();
  const { employees } = useEmployeeStore();

  const lifecycleStages = [
    {
      icon: GraduationCap,
      title: 'Onboarding',
      description: 'Initial training and company introduction',
      duration: '1-2 weeks',
      tasks: [
        'Company orientation',
        'System access setup',
        'Team introduction',
        'Initial training sessions'
      ]
    },
    {
      icon: Briefcase,
      title: 'Role Establishment',
      description: 'Getting comfortable with responsibilities',
      duration: '3-6 months',
      tasks: [
        'Project assignments',
        'Regular 1:1 meetings',
        'Performance expectations',
        'Skill development plan'
      ]
    },
    {
      icon: Target,
      title: 'Growth & Development',
      description: 'Expanding skills and responsibilities',
      duration: '6-18 months',
      tasks: [
        'Advanced training',
        'Mentorship program',
        'Project leadership',
        'Skill certification'
      ]
    },
    {
      icon: Award,
      title: 'Career Advancement',
      description: 'Taking on leadership roles',
      duration: '18+ months',
      tasks: [
        'Leadership training',
        'Team management',
        'Strategic planning',
        'Department initiatives'
      ]
    }
  ];

  const recentPromotions = [
    {
      name: 'Sarah Wilson',
      from: 'Senior Developer',
      to: 'Tech Lead',
      date: '2024-02-15',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      name: 'Michael Chen',
      from: 'Product Manager',
      to: 'Senior Product Manager',
      date: '2024-02-01',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employee Lifecycle</h1>
          <p className="mt-1 text-sm text-gray-500">
            Career progression and development stages at our company
          </p>
        </div>
      </div>

      {/* Lifecycle Stages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {lifecycleStages.map((stage, index) => (
          <div
            key={stage.title}
            className="bg-white rounded-xl p-6 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-50 rounded-lg">
                <stage.icon className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">{stage.duration}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{stage.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{stage.description}</p>
            </div>
            <ul className="space-y-2">
              {stage.tasks.map((task) => (
                <li key={task} className="flex items-center text-sm text-gray-600">
                  <ArrowUpRight className="w-4 h-4 mr-2 text-blue-500" />
                  {task}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Recent Promotions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Promotions</h2>
          <div className="p-2 bg-green-50 rounded-lg">
            <Users className="w-5 h-5 text-green-600" />
          </div>
        </div>
        <div className="space-y-4">
          {recentPromotions.map((promotion) => (
            <div
              key={`${promotion.name}-${promotion.to}`}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={promotion.avatar}
                  alt={promotion.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{promotion.name}</h3>
                  <p className="text-sm text-gray-500">
                    {promotion.from} → {promotion.to}
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(promotion.date).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Department Distribution */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Department Distribution</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(
            employees.reduce((acc, emp) => {
              acc[emp.department] = (acc[emp.department] || 0) + 1;
              return acc;
            }, {} as Record<string, number>)
          ).map(([department, count]) => (
            <div key={department} className="text-center p-4 rounded-lg bg-gray-50">
              <div className="text-2xl font-bold text-gray-900">{count}</div>
              <div className="text-sm text-gray-500">{department}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeLifecyclePage;