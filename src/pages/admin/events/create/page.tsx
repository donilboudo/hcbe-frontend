import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventsApi } from '../../../../lib/api/events';
import type { CreateEventRequest } from '../../../../lib/api/types';
import { EventForm } from '../../../../components/forms/EventForm';

export const CreateEventPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (data: CreateEventRequest) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await eventsApi.createEvent(data);
      
      if (response.success && response.data) {
        navigate(`/admin/events/${response.data.id}`, { 
          replace: true,
          state: { message: 'Event created successfully!' }
        });
      } else {
        setError(response.message || 'Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
            <p className="mt-2 text-gray-600">
              Fill in the details to create a new event for HCBE
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/events')}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to Events
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Event Information</h3>
          <p className="mt-1 text-sm text-gray-500">
            Provide the basic information about your event. Required fields are marked with an asterisk (*).
          </p>
        </div>
        
        <div className="px-6 py-6">
          <EventForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            submitButtonText="Create Event"
          />
        </div>
      </div>
    </div>
  );
};