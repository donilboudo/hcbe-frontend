import React, { useState } from 'react';
import type { CreateEventRequest, UpdateEventRequest, Event } from '../../lib/api/types';

interface EventFormProps {
  initialValues?: Event;
  onSubmit: (data: CreateEventRequest | UpdateEventRequest) => Promise<void>;
  isLoading: boolean;
  submitButtonText?: string;
}

export const EventForm: React.FC<EventFormProps> = ({
  initialValues,
  onSubmit,
  isLoading,
  submitButtonText = 'Save Event'
}) => {
  const [formData, setFormData] = useState({
    title: initialValues?.title || '',
    description: initialValues?.description || '',
    date: initialValues?.date ? new Date(initialValues.date).toISOString().slice(0, 16) : '',
    location: initialValues?.location || '',
    type: initialValues?.type || '',
    zone: initialValues?.zone || '',
    capacity: initialValues?.capacity?.toString() || '',
    registrationDeadline: initialValues?.registrationDeadline 
      ? new Date(initialValues.registrationDeadline).toISOString().slice(0, 16) 
      : '',
    meetingLink: initialValues?.meetingLink || '',
    imageUrl: initialValues?.imageUrl || '',
    status: initialValues?.status || 'Draft'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    // Allow past dates for testing and editing existing events
    // } else if (new Date(formData.date) < new Date()) {
    //   newErrors.date = 'Event date cannot be in the past';
    // }

    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    if (formData.registrationDeadline && new Date(formData.registrationDeadline) >= new Date(formData.date)) {
      newErrors.registrationDeadline = 'Registration deadline must be before event date';
    }

    if (formData.capacity && (isNaN(parseInt(formData.capacity)) || parseInt(formData.capacity) < 1)) {
      newErrors.capacity = 'Capacity must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const submitData: CreateEventRequest | UpdateEventRequest = {
      title: formData.title,
      description: formData.description || undefined,
      date: formData.date,
      location: formData.location || undefined,
      type: formData.type || undefined,
      zone: formData.zone || undefined,
      capacity: formData.capacity ? parseInt(formData.capacity) : undefined,
      registrationDeadline: formData.registrationDeadline || undefined,
      meetingLink: formData.meetingLink || undefined,
      imageUrl: formData.imageUrl || undefined,
      status: formData.status
    };

    await onSubmit(submitData);
  };

  const statusOptions = [
    { value: 'Draft', label: 'Draft' },
    { value: 'Active', label: 'Active' },
    { value: 'Cancelled', label: 'Cancelled' },
    { value: 'Completed', label: 'Completed' }
  ];

  const typeOptions = [
    { value: '', label: 'Select type...' },
    { value: 'Workshop', label: 'Workshop' },
    { value: 'Conference', label: 'Conference' },
    { value: 'Networking', label: 'Networking' },
    { value: 'Training', label: 'Training' },
    { value: 'Social', label: 'Social' },
    { value: 'Other', label: 'Other' }
  ];

  const zoneOptions = [
    { value: '', label: 'Select zone...' },
    { value: 'Montreal', label: 'Montreal' },
    { value: 'Quebec', label: 'Quebec' },
    { value: 'Ottawa', label: 'Ottawa' },
    { value: 'Toronto', label: 'Toronto' },
    { value: 'Virtual', label: 'Virtual' },
    { value: 'Other', label: 'Other' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="md:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
              errors.title ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter event title"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter event description"
          />
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Event Date *
          </label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
              errors.date ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
        </div>

        {/* Registration Deadline */}
        <div>
          <label htmlFor="registrationDeadline" className="block text-sm font-medium text-gray-700 mb-1">
            Registration Deadline
          </label>
          <input
            type="datetime-local"
            id="registrationDeadline"
            name="registrationDeadline"
            value={formData.registrationDeadline}
            onChange={handleChange}
            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
              errors.registrationDeadline ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.registrationDeadline && <p className="mt-1 text-sm text-red-600">{errors.registrationDeadline}</p>}
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter event location"
          />
        </div>

        {/* Meeting Link */}
        <div>
          <label htmlFor="meetingLink" className="block text-sm font-medium text-gray-700 mb-1">
            Meeting Link
          </label>
          <input
            type="url"
            id="meetingLink"
            name="meetingLink"
            value={formData.meetingLink}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://zoom.us/j/..."
          />
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Event Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com/event-image.jpg"
          />
          <p className="mt-1 text-sm text-gray-500">
            Optional: Add a URL for the event image to display in listings and details
          </p>
        </div>

        {/* Type */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Event Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {typeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Zone */}
        <div>
          <label htmlFor="zone" className="block text-sm font-medium text-gray-700 mb-1">
            Zone
          </label>
          <select
            id="zone"
            name="zone"
            value={formData.zone}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {zoneOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Capacity */}
        <div>
          <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
            Capacity
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            min="1"
            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
              errors.capacity ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Maximum attendees"
          />
          {errors.capacity && <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>}
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status *
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
              errors.status ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </div>
          ) : (
            submitButtonText
          )}
        </button>
      </div>
    </form>
  );
};