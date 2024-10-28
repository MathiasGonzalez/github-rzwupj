import React from 'react';
import { Clock, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';
import { ScheduledEvent, getEventColor, getPriorityIcon } from '../../models/ScheduledEvent';

interface EventPopoverProps {
  event: ScheduledEvent;
  position: { x: number; y: number };
}

const EventPopover: React.FC<EventPopoverProps> = ({ event, position }) => {
  const colorClasses = getEventColor(event.type);
  const priorityIcon = getPriorityIcon(event.priority);

  return (
    <div
      className="absolute z-50 w-72 bg-white rounded-lg shadow-lg border border-gray-200 p-4"
      style={{
        top: `${position.y + 10}px`,
        left: `${position.x + 10}px`,
      }}
    >
      <div className="space-y-3">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <span>{priorityIcon}</span>
            <h4 className="font-medium text-gray-900">{event.title}</h4>
          </div>
          <span className={`mt-1 inline-block px-2 py-0.5 rounded-full text-xs ${colorClasses}`}>
            {event.type}
          </span>
        </div>

        {/* Description */}
        {event.description && (
          <p className="text-sm text-gray-600">{event.description}</p>
        )}

        {/* Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>
              {format(new Date(event.date), 'MMM d, yyyy')}
              {event.time && ` • ${event.time}`}
              {event.duration && ` (${Math.floor(event.duration / 60)}h ${event.duration % 60}m)`}
            </span>
          </div>

          {event.location && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
          )}

          {event.attendees && event.attendees.length > 0 && (
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-600" />
              <div className="flex -space-x-2">
                {event.attendees.slice(0, 3).map((attendee, index) => (
                  <img
                    key={index}
                    className="w-6 h-6 rounded-full border-2 border-white"
                    src={`https://i.pravatar.cc/100?u=${attendee}`}
                    alt={attendee}
                    title={attendee}
                  />
                ))}
                {event.attendees.length > 3 && (
                  <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                    +{event.attendees.length - 3}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPopover;