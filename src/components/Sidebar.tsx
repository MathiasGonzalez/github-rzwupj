import React, { useState } from 'react';
import { Users, Briefcase, Calendar, FileText, PieChart, Settings, LogOut, GitBranch, Building, Bell, HelpCircle, ChevronDown } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import useAuthStore from '../stores/authStore';

const Sidebar = () => {
  const logout = useAuthStore((state) => state.logout);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    Overview: true,
    People: true,
    Organization: true,
    System: true,
  });

  const menuSections = [
    {
      title: 'Overview',
      items: [
        { icon: PieChart, label: 'Dashboard', path: '/' },
        { icon: Calendar, label: 'Calendar', path: '/calendar' },
      ],
    },
    {
      title: 'People',
      items: [
        { icon: Users, label: 'Employees', path: '/employees' },
        { icon: GitBranch, label: 'Lifecycle', path: '/lifecycle' },
        { icon: Briefcase, label: 'Jobs', path: '/jobs' },
      ],
    },
    {
      title: 'Organization',
      items: [
        { icon: Building, label: 'Departments', path: '/departments' },
        { icon: FileText, label: 'Documents', path: '/documents' },
      ],
    },
    {
      title: 'System',
      items: [
        { icon: Bell, label: 'Notifications', path: '/notifications' },
        { icon: Settings, label: 'Settings', path: '/settings' },
        { icon: HelpCircle, label: 'Help & Support', path: '/support' },
      ],
    },
  ];

  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 px-4 py-6 flex flex-col h-full">
      <div className="flex items-center gap-2 px-2 mb-8">
        <Users className="w-8 h-8 text-blue-600" />
        <span className="text-xl font-bold">HR Manager</span>
      </div>
      
      <nav className="flex-1 space-y-4 overflow-y-auto">
        {menuSections.map((section) => (
          <div key={section.title} className="border-b border-gray-100 pb-4 last:border-0">
            <button
              onClick={() => toggleSection(section.title)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors"
            >
              <span>{section.title}</span>
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-200 ${
                  expandedSections[section.title] ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`mt-1 space-y-1 overflow-hidden transition-all duration-200 ease-in-out ${
                expandedSections[section.title] 
                  ? 'max-h-96 opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              {section.items.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 px-3 py-2 mt-6 text-sm rounded-lg text-red-600 hover:bg-red-50 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;