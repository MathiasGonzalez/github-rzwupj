import React from 'react';
import { Calendar } from 'lucide-react';

const UpcomingEvents = () => {
  const events = [
    {
      title: 'Team Building Event',
      date: 'March 15',
      time: '9:00 AM',
      type: 'Company Event',
    },
    {
      title: 'Performance Review',
      date: 'March 18',
      time: '2:00 PM',
      type: 'Meeting',
    },
    {
      title: 'New Hire Orientation',
      date: 'March 20',
      time: '10:00 AM',
      type: 'Onboarding',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Upcoming Events</h2>
        <Calendar className="w-5 h-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.title} className="flex items-start">
            <div className="flex-shrink-0 w-12 text-center">
              <div className="text-sm font-semibold text-blue-600">{event.date.split(' ')[1]}</div>
              <div className="text-xs text-gray-500">{event.date.split(' ')[0]}</div>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium">{event.title}</h3>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xs text-gray-500">{event.time}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                  {event.type}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;