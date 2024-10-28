import React from 'react';
import { Activity } from 'lucide-react';

const RecentActivities = () => {
  const activities = [
    {
      user: 'Sarah Wilson',
      action: 'submitted a leave request',
      time: '2 hours ago',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      user: 'Michael Chen',
      action: 'updated project timeline',
      time: '4 hours ago',
      image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      user: 'Emma Rodriguez',
      action: 'completed training module',
      time: '6 hours ago',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Recent Activities</h2>
        <Activity className="w-5 h-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.user + activity.action} className="flex items-start">
            <img
              src={activity.image}
              alt={activity.user}
              className="w-8 h-8 rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span>{' '}
                {activity.action}
              </p>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;