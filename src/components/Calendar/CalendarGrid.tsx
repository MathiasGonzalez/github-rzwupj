import React from 'react';
import { useTranslation } from 'react-i18next';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isToday, isSameDay } from 'date-fns';
import { ScheduledEvent } from '../../models/ScheduledEvent';
import EventItem from './EventItem';

interface CalendarGridProps {
  currentMonth: Date;
  events: ScheduledEvent[];
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ currentMonth, events }) => {
  const { t } = useTranslation();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const weekDays = [
    t('calendar.weekDays.sun'),
    t('calendar.weekDays.mon'),
    t('calendar.weekDays.tue'),
    t('calendar.weekDays.wed'),
    t('calendar.weekDays.thu'),
    t('calendar.weekDays.fri'),
    t('calendar.weekDays.sat'),
  ];

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {weekDays.map((day) => (
          <div key={day} className="bg-gray-50 p-4 text-sm font-medium text-gray-500 text-center">
            {day}
          </div>
        ))}
        {days.map((day) => {
          const dayEvents = events.filter((event) => 
            isSameDay(new Date(event.date), day)
          );

          return (
            <div
              key={day.toString()}
              className={`min-h-[120px] bg-white p-2 ${
                !isSameMonth(day, currentMonth) ? 'bg-gray-50' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-sm font-medium ${
                    isToday(day)
                      ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center'
                      : !isSameMonth(day, currentMonth)
                      ? 'text-gray-400'
                      : 'text-gray-900'
                  }`}
                >
                  {format(day, 'd')}
                </span>
              </div>
              <div className="space-y-1 overflow-y-auto max-h-[80px]">
                {dayEvents.map((event) => (
                  <EventItem key={event.id} event={event} isCompact />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;