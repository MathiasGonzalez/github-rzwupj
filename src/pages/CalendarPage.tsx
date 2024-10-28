import React from 'react';
import { useTranslation } from 'react-i18next';
import CalendarHeader from '../components/Calendar/CalendarHeader';
import CalendarGrid from '../components/Calendar/CalendarGrid';
import EventList from '../components/Calendar/EventList';
import EventModal from '../components/Calendar/EventModal';
import useCalendarStore from '../stores/calendarStore';

const CalendarPage = () => {
  const { t } = useTranslation();
  const { currentMonth, events, prevMonth, nextMonth, selectedEventId, selectEvent } = useCalendarStore();

  const selectedEvent = events.find((event) => event.id === selectedEventId);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <CalendarHeader
        currentMonth={currentMonth}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
      />
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <CalendarGrid currentMonth={currentMonth} events={events} />
        </div>
        <div>
          <EventList events={events} />
        </div>
      </div>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => selectEvent(null)}
        />
      )}
    </div>
  );
};

export default CalendarPage;