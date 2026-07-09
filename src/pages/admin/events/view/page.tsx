import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { eventsApi } from '../../../../lib/api/events';
import type { Event } from '../../../../lib/api/types';

export const ViewEventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (id) {
      loadEvent(id);
    }

    // Check for success message from navigation state
    if (location.state && (location.state as any).message) {
      setSuccessMessage((location.state as any).message);
      // Clear the state to prevent message from persisting on refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [id, location, navigate]);

  const loadEvent = async (eventId: string) => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!event || !id) return;

    if (!window.confirm(`Are you sure you want to delete "${event.title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await eventsApi.deleteEvent(id);
      if (response.success) {
        navigate('/admin/events', { 
          state: { message: 'Event deleted successfully!' }
        });
      } else {
        setError('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      setError('Failed to delete event');
    }
  };

  if (isLoading) {
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
          <Link
            to="/admin/events"
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  if (!event) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <Link
              to="/admin/events"
              className="text-sm text-blue-600 hover:text-blue-800 mb-2 inline-block"
            >
              ← Back to Events
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
          </div>
          <div className="space-x-2">
            <Link
              to={`/admin/events/${id}/edit`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Edit Event
            </Link>
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
            >
              Delete Event
            </button>
          </div>
        </div>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Event Details */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-6">
          {/* Status Badge */}
          <div className="mb-6">
            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
              event.status === 'À venir' || event.status === 'Active'
                ? 'bg-green-100 text-green-800'
                : event.status === 'Brouillon' || event.status === 'Draft'
                ? 'bg-yellow-100 text-yellow-800'
                : event.status === 'Annulé' || event.status === 'Cancelled'
                ? 'bg-red-100 text-red-800'
                : event.status === 'Terminé' || event.status === 'Completed'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {event.status}
            </span>
          </div>

          {/* Event Image */}
          {event.imageUrl && (
            <div className="mb-6">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-64 object-cover rounded-lg border"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Main Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Event Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Date & Time</dt>
                    <dd className="text-sm text-gray-900">{formatDate(event.date)}</dd>
                  </div>

                  {event.location && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Location</dt>
                      <dd className="text-sm text-gray-900">{event.location}</dd>
                    </div>
                  )}

                  {event.type && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Type</dt>
                      <dd className="text-sm text-gray-900">{event.type}</dd>
                    </div>
                  )}

                  {event.zone && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Zone</dt>
                      <dd className="text-sm text-gray-900">{event.zone}</dd>
                    </div>
                  )}

                  {event.capacity && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Capacity</dt>
                      <dd className="text-sm text-gray-900">{event.capacity} attendees</dd>
                    </div>
                  )}
                </div>
              </div>

              {event.meetingLink && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Meeting Link</h3>
                  <a
                    href={event.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 break-all"
                  >
                    {event.meetingLink}
                  </a>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Additional Information</h3>
                
                <div className="space-y-4">
                  {event.registrationDeadline && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Registration Deadline</dt>
                      <dd className="text-sm text-gray-900">
                        {formatDate(event.registrationDeadline)}
                      </dd>
                    </div>
                  )}

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Created</dt>
                    <dd className="text-sm text-gray-900">
                      {new Date(event.createdAt).toLocaleDateString()}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                    <dd className="text-sm text-gray-900">
                      {new Date(event.updatedAt).toLocaleDateString()}
                    </dd>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {event.description && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Description</h3>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{event.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};