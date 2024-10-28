import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ScheduledEvent } from '../models/ScheduledEvent';
import { addMonths, subMonths } from 'date-fns';

interface CalendarState {
  currentMonth: Date;
  events: ScheduledEvent[];
  selectedEventId: string | null;
  setCurrentMonth: (date: Date) => void;
  nextMonth: () => void;
  prevMonth: () => void;
  addEvent: (event: ScheduledEvent) => void;
  removeEvent: (eventId: string) => void;
  updateEvent: (eventId: string, updatedEvent: Partial<ScheduledEvent>) => void;
  selectEvent: (eventId: string | null) => void;
}

const initialEvents: ScheduledEvent[] = [
  {
    id: '1',
    title: 'Team Building Event',
    description: 'Annual team building event at Adventure Park',
    type: 'Company Event',
    priority: 'medium',
    date: new Date(2024, 2, 15),
    time: '9:00 AM',
    duration: 480,
    location: 'Adventure Park',
    attendees: ['john@company.com', 'sarah@company.com', 'mike@company.com', 'emma@company.com'],
  },
  {
    id: '2',
    title: 'Performance Review',
    description: 'Quarterly performance review with team leads',
    type: 'Meeting',
    priority: 'high',
    date: new Date(2024, 2, 18),
    time: '2:00 PM',
    duration: 60,
    location: 'Conference Room A',
    attendees: ['john@company.com', 'sarah@company.com'],
  },
  {
    id: '3',
    title: 'New Hire Orientation',
    description: 'Orientation session for new employees',
    type: 'Onboarding',
    priority: 'medium',
    date: new Date(2024, 2, 20),
    time: '10:00 AM',
    duration: 180,
    location: 'Training Room',
    attendees: ['emma@company.com', 'mike@company.com'],
  },
  {
    id: '4',
    title: 'Project Deadline',
    description: 'Final submission for Q1 project',
    type: 'Deadline',
    priority: 'high',
    date: new Date(2024, 2, 25),
  },
  {
    id: '5',
    title: 'Monthly All Hands',
    description: 'Company-wide monthly meeting',
    type: 'Meeting',
    priority: 'medium',
    date: new Date(2024, 10, 10),
    time: '11:00 AM',
    duration: 60,
    location: 'Main Hall',
    attendees: ['john@company.com', 'sarah@company.com', 'mike@company.com', 'emma@company.com', 'alex@company.com', 'lisa@company.com'],
  },
];

const useCalendarStore = create<CalendarState>()(
  persist(
    (set) => ({
      currentMonth: new Date(),
      events: initialEvents,
      selectedEventId: null,
      setCurrentMonth: (date) => set({ currentMonth: date }),
      nextMonth: () => set((state) => ({ currentMonth: addMonths(state.currentMonth, 1) })),
      prevMonth: () => set((state) => ({ currentMonth: subMonths(state.currentMonth, 1) })),
      addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
      removeEvent: (eventId) =>
        set((state) => ({
          events: state.events.filter((event) => event.id !== eventId),
        })),
      updateEvent: (eventId, updatedEvent) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === eventId ? { ...event, ...updatedEvent } : event
          ),
        })),
      selectEvent: (eventId) => set({ selectedEventId: eventId }),
    }),
    {
      name: 'calendar-storage',
      serialize: (state) => JSON.stringify({
        ...state,
        events: state.state.events.map(event => ({
          ...event,
          date: event.date.toISOString()
        }))
      }),
      deserialize: (str) => {
        const state = JSON.parse(str);
        return {
          ...state,
          currentMonth: new Date(state.currentMonth),
          events: state.events.map((event: any) => ({
            ...event,
            date: new Date(event.date)
          }))
        };
      }
    }
  )
);

export default useCalendarStore;