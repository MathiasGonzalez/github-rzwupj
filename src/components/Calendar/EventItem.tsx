import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ScheduledEvent, getEventColor, getPriorityIcon } from '../../models/ScheduledEvent';
import useCalendarStore from '../../stores/calendarStore';
import EventPopover from './EventPopover';

interface EventItemProps {
  event: ScheduledEvent;
  isCompact?: boolean;
}

const EventItem: React.FC<EventItemProps> = ({ event, isCompact = false }) => {
  const { t } = useTranslation();
  const selectEvent = useCalendarStore((state) => state.selectEvent);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<number>();

  const colorClasses = getEventColor(event.type);
  const priorityIcon = getPriorityIcon(event.priority);

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPopoverPosition({
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
    });
    timeoutRef.current = window.setTimeout(() => {
      setShowPopover(true);
    }, 500); // Show after 500ms hover
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowPopover(false);
  };

  const handleClick = () => {
    selectEvent(event.id);
  };

  if (isCompact) {
    return (
      <div
        className={`px-2 py-1 text-xs rounded-lg border ${colorClasses} truncate cursor-pointer hover:opacity-90 transition-opacity relative`}
        title={`${event.title}${event.time ? ` - ${event.time}` : ''}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="mr-1">{priorityIcon}</span>
        {event.title}
        {showPopover && (
          <EventPopover event={event} position={popoverPosition} />
        )}
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`p-3 rounded-lg border ${colorClasses} cursor-pointer hover:opacity-90 transition-opacity relative`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span>{priorityIcon}</span>
            <h4 className="font-medium">{event.title}</h4>
          </div>
          {event.description && (
            <p className="text-sm mt-1 text-gray-600">{event.description}</p>
          )}
        </div>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-white bg-opacity-50">
          {t(`calendar.eventTypes.${event.type.toLowerCase().replace(/\s+/g, '')}`)}
        </span>
      </div>
      {showPopover && (
        <EventPopover event={event} position={popoverPosition} />
      )}
    </div>
  );
};

export default EventItem;