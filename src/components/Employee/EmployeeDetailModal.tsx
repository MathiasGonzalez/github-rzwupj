import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Mail, Phone, Calendar, Building } from 'lucide-react';
import { format } from 'date-fns';
import { Employee } from '../../stores/employeeStore';
import useCalendarStore from '../../stores/calendarStore';
import MeetingScheduler from './MeetingScheduler';

interface EmployeeDetailModalProps {
  employee: Employee;
  onClose: () => void;
}

const EmployeeDetailModal: React.FC<EmployeeDetailModalProps> = ({ employee, onClose }) => {
  const { t } = useTranslation();
  const [showScheduler, setShowScheduler] = useState(false);
  const addEvent = useCalendarStore((state) => state.addEvent);

  const handleScheduleMeeting = (meetingData: {
    title: string;
    date: Date;
    time: string;
    duration: number;
    description: string;
    location: string;
    type: 'in-person' | 'virtual';
    recurring: 'none' | 'daily' | 'weekly' | 'monthly';
    additionalAttendees: string[];
    agenda: string[];
  }) => {
    const newEvent = {
      id: crypto.randomUUID(),
      title: meetingData.title,
      date: meetingData.date,
      time: meetingData.time,
      duration: meetingData.duration,
      description: `${meetingData.description}\n\nAgenda:\n${meetingData.agenda.map((item, i) => `${i + 1}. ${item}`).join('\n')}`,
      location: `${meetingData.type === 'virtual' ? '🎥 ' : ''}${meetingData.location}`,
      type: 'Meeting',
      priority: 'medium' as const,
      attendees: [employee.email, ...meetingData.additionalAttendees],
      recurring: meetingData.recurring,
    };

    addEvent(newEvent);
    setShowScheduler(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500';
      case 'On Leave':
        return 'bg-yellow-500';
      default:
        return 'bg-red-500';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <img
            src={employee.avatar}
            alt={employee.name}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{employee.name}</h2>
            <p className="text-gray-500">{employee.role}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Employee Details */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-gray-600">
            <Mail className="w-5 h-5" />
            <span>{employee.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Phone className="w-5 h-5" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Calendar className="w-5 h-5" />
            <span>{t('employees.detail.contact.startDate')} {format(new Date(employee.startDate), 'PP')}</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-gray-600">
            <Building className="w-5 h-5" />
            <span>{employee.department}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(employee.status)}`} />
            <span className="text-gray-600">
              {t(`employees.detail.status.${employee.status.toLowerCase().replace(/\s+/g, '')}`)}
            </span>
          </div>
        </div>
      </div>

      {/* Schedule Meeting Section */}
      {!showScheduler ? (
        <button
          onClick={() => setShowScheduler(true)}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {t('employees.detail.meeting.schedule')}
        </button>
      ) : (
        <MeetingScheduler
          employeeName={employee.name}
          onSchedule={handleScheduleMeeting}
          onCancel={() => setShowScheduler(false)}
        />
      )}
    </div>
  );
};

export default EmployeeDetailModal;