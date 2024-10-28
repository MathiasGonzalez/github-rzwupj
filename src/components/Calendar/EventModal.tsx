import React from 'react';
import { useTranslation } from 'react-i18next';
import { X, Clock, MapPin, Users, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ScheduledEvent, getEventColor } from '../../models/ScheduledEvent';

interface EventModalProps {
  event: ScheduledEvent;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  const { t } = useTranslation();
  const colorClasses = getEventColor(event.type);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{event.title}</h2>
              <span className={`mt-2 inline-block px-3 py-1 rounded-full text-sm ${colorClasses}`}>
                {t(`calendar.eventTypes.${event.type.toLowerCase().replace(/\s+/g, '')}`)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Description */}
          {event.description && (
            <p className="text-gray-600">{event.description}</p>
          )}

          {/* Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span>{format(event.date, 'PPPP')}</span>
            </div>

            {event.time && (
              <div className="flex items-center gap-3 text-gray-600">
                <Clock className="w-5 h-5" />
                <div>
                  <span>{event.time}</span>
                  {event.duration && (
                    <span className="ml-2 text-gray-500">
                      ({Math.floor(event.duration / 60)}h {event.duration % 60}m)
                    </span>
                  )}
                </div>
              </div>
            )}

            {event.location && (
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{event.location}</span>
              </div>
            )}

            {event.attendees && event.attendees.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-gray-600">
                  <Users className="w-5 h-5" />
                  <span>{event.attendees.length} attendees</span>
                </div>
                <div className="ml-8 grid grid-cols-2 gap-2">
                  {event.attendees.map((attendee) => (
                    <div key={attendee} className="flex items-center gap-2">
                      <img
                        src={`https://i.pravatar.cc/32?u=${attendee}`}
                        alt={attendee}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-gray-600">{attendee}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;