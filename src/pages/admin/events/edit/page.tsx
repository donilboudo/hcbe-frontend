import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventsApi } from '../../../../lib/api/events';
import { UpdateEventRequest, Event } from '../../../../lib/api/types';
import { EventForm } from '../../../../components/forms/EventForm';

export const EditEventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingEvent, setIsLoadingEvent] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadEvent(id);
    }
  }, [id]);

  const loadEvent = async (eventId: string) => {
    try {
      setIsLoadingEvent(true);
      const response = await eventsApi.getEvent(eventId);
      
      if (response.success && response.data) {
        setEvent(response.data);
      } else {
        setError('Event not found');
      }
    } catch (error) {
      console.error('Error loading event:', error);
      setError('Failed to load event');
    } finally {
      setIsLoadingEvent(false);
    }
  };

  const handleSubmit = async (data: UpdateEventRequest) => {
    if (!id) return;
    
    setIsLoading(true);
    setError('');

    try {
      const response = await eventsApi.updateEvent(id, data);
      
      if (response.success && response.data) {
        navigate(`/admin/events/${id}`, { 
          replace: true,
          state: { message: 'Event updated successfully!' }
        });
      } else {
        setError(response.message || 'Failed to update event');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingEvent) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error && !event) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <span className="text-6xl">❌</span>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Error Loading Event</h3>
          <p className="mt-2 text-gray-500">{error}</p>
          <button
            onClick={() => navigate('/admin/events')}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Event</h1>
            <p className="mt-2 text-gray-600">
              Update the details for "{event.title}"
            </p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => navigate(`/admin/events/${id}`)}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              View Event
            </button>
            <button
              onClick={() => navigate('/admin/events')}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to Events
            </button>
          </div>
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
            Update the event details. Required fields are marked with an asterisk (*).
          </p>
        </div>
        
        <div className="px-6 py-6">
          <EventForm
            initialValues={event}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            submitButtonText="Update Event"
          />
        </div>
      </div>
    </div>
  );
};