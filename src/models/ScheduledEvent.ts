export type EventType = 'Meeting' | 'Training' | 'Holiday' | 'Deadline' | 'Company Event' | 'Onboarding';

export type EventPriority = 'low' | 'medium' | 'high';

export interface ScheduledEvent {
  id: string;
  title: string;
  description?: string;
  type: EventType;
  priority: EventPriority;
  date: Date;
  time?: string;
  duration?: number; // in minutes
  location?: string;
  attendees?: string[];
  color?: string;
}

export const getEventColor = (type: EventType): string => {
  switch (type) {
    case 'Meeting':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Training':
      return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'Holiday':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'Deadline':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'Company Event':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'Onboarding':
      return 'bg-indigo-100 text-indigo-700 border-indigo-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export const getPriorityIcon = (priority: EventPriority): string => {
  switch (priority) {
    case 'high':
      return '🔴';
    case 'medium':
      return '🟡';
    case 'low':
      return '🟢';
    default:
      return '';
  }
};