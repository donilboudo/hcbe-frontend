import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eventsApi } from '../../../lib/api/events';
import { Event } from '../../../lib/api/types';

export const AdminDashboard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const response = await eventsApi.getEvents();
      if (response.success && response.data) {
        setEvents(response.data);
      }
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const upcomingEvents = events.filter(event => new Date(event.date) > new Date());
  const totalEvents = events.length;
  const activeEvents = events.filter(event => 
    event.status === 'Active' || event.status === 'À venir'
  ).length;

  const stats = [
    {
      name: 'Total Events',
      value: totalEvents,
      icon: '🎟️',
      color: 'bg-blue-600',
      link: '/admin/events'
    },
    {
      name: 'Upcoming Events',
      value: upcomingEvents.length,
      icon: '📅',
      color: 'bg-green-600',
      link: '/admin/events'
    },
    {
      name: 'Active Events',
      value: activeEvents,
      icon: '✨',
      color: 'bg-purple-600',
      link: '/admin/events'
    },
    {
      name: 'Quick Actions',
      value: '',
      icon: '⚡',
      color: 'bg-orange-600',
      isAction: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome to the HCBE administration panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${stat.color} rounded-lg p-3`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                {stat.isAction ? (
                  <div className="mt-2 space-y-2">
                    <Link
                      to="/admin/events/create"
                      className="block text-sm text-blue-600 hover:text-blue-800"
                    >
                      + Create Event
                    </Link>
                  </div>
                ) : (
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                )}
              </div>
            </div>
            {stat.link && !stat.isAction && (
              <div className="mt-4">
                <Link
                  to={stat.link}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  View all →
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Recent Events */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Recent Events</h3>
          <Link
            to="/admin/events"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            View all
          </Link>
        </div>
        
        <div className="px-6 py-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-4xl">📭</span>
              <p className="mt-2 text-gray-500">No events created yet</p>
              <Link
                to="/admin/events/create"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Create your first event
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {events.slice(0, 5).map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString()} 
                      {event.location && ` • ${event.location}`}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      event.status === 'À venir' || event.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : event.status === 'Brouillon' || event.status === 'Draft'
                        ? 'bg-yellow-100 text-yellow-800'
                        : event.status === 'Annulé' || event.status === 'Cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {event.status}
                    </span>
                    <Link
                      to={`/admin/events/${event.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};