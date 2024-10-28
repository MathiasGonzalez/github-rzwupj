import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, MapPin, Users, Calendar, Video, MessageSquare } from 'lucide-react';

interface MeetingSchedulerProps {
  employeeName: string;
  onSchedule: (meetingData: {
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
  }) => void;
  onCancel: () => void;
}

const MeetingScheduler: React.FC<MeetingSchedulerProps> = ({ employeeName, onSchedule, onCancel }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    duration: 30,
    description: '',
    location: '',
    type: 'in-person' as const,
    recurring: 'none' as const,
    additionalAttendees: [''],
    agenda: [''],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSchedule({
      ...formData,
      date: new Date(formData.date),
      duration: Number(formData.duration),
      additionalAttendees: formData.additionalAttendees.filter(Boolean),
      agenda: formData.agenda.filter(Boolean),
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (
    index: number,
    value: string,
    field: 'additionalAttendees' | 'agenda'
  ) => {
    setFormData((prev) => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      
      if (index === newArray.length - 1 && value) {
        newArray.push('');
      }
      
      if (!value && index !== newArray.length - 1) {
        newArray.splice(index, 1);
      }

      return { ...prev, [field]: newArray };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {t('employees.detail.meeting.form.title', { name: employeeName })}
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('employees.detail.meeting.form.meetingTitle')}
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder={t('employees.detail.meeting.form.placeholders.title')}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('employees.detail.meeting.form.date')}
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('employees.detail.meeting.form.time')}
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('employees.detail.meeting.form.duration')}
            </label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="15">{t('employees.detail.meeting.form.duration.m15')}</option>
              <option value="30">{t('employees.detail.meeting.form.duration.m30')}</option>
              <option value="45">{t('employees.detail.meeting.form.duration.m45')}</option>
              <option value="60">{t('employees.detail.meeting.form.duration.h1')}</option>
              <option value="90">{t('employees.detail.meeting.form.duration.h15')}</option>
              <option value="120">{t('employees.detail.meeting.form.duration.h2')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('employees.detail.meeting.form.recurring')}
            </label>
            <select
              name="recurring"
              value={formData.recurring}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="none">{t('employees.detail.meeting.form.recurring.none')}</option>
              <option value="daily">{t('employees.detail.meeting.form.recurring.daily')}</option>
              <option value="weekly">{t('employees.detail.meeting.form.recurring.weekly')}</option>
              <option value="monthly">{t('employees.detail.meeting.form.recurring.monthly')}</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('employees.detail.meeting.form.type')}
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="in-person">{t('employees.detail.meeting.form.types.inPerson')}</option>
              <option value="virtual">{t('employees.detail.meeting.form.types.virtual')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('employees.detail.meeting.form.location')}
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder={t(
                `employees.detail.meeting.form.placeholders.location.${formData.type}`
              )}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('employees.detail.meeting.form.additionalAttendees')}
          </label>
          {formData.additionalAttendees.map((attendee, index) => (
            <input
              key={index}
              type="email"
              value={attendee}
              onChange={(e) => handleArrayChange(index, e.target.value, 'additionalAttendees')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder={t('employees.detail.meeting.form.placeholders.email')}
            />
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('employees.detail.meeting.form.agenda')}
          </label>
          {formData.agenda.map((item, index) => (
            <input
              key={index}
              type="text"
              value={item}
              onChange={(e) => handleArrayChange(index, e.target.value, 'agenda')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder={t('employees.detail.meeting.form.placeholders.agenda')}
            />
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('employees.detail.meeting.form.description')}
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder={t('employees.detail.meeting.form.placeholders.description')}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {t('employees.detail.meeting.form.submit')}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          {t('employees.detail.meeting.form.cancel')}
        </button>
      </div>
    </form>
  );
};

export default MeetingScheduler;