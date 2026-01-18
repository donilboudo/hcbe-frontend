import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { teamMembersApi } from '../../../../lib/api/team-members';
import type { TeamMemberDto } from '../../../../lib/api/types';
import { buildApiUrl } from '../../../../lib/api/base-url';

const TeamMemberDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [member, setMember] = useState<TeamMemberDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMember = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await teamMembersApi.getTeamMemberById(id);
        if (response.success && response.data) {
          setMember(response.data);
        } else {
          setError('Failed to load team member');
        }
      } catch (err) {
        console.error('Error loading team member:', err);
        setError('Error loading team member');
      } finally {
        setLoading(false);
      }
    };

    loadMember();
  }, [id]);

  const handleDelete = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this team member?')) {
      return;
    }

    try {
      const response = await teamMembersApi.deleteTeamMember(id);
      if (response.success) {
        navigate('/admin/team-members');
      }
    } catch (err) {
      console.error('Error deleting team member:', err);
      alert('Failed to delete team member');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error || 'Team member not found'}</p>
        <button 
          onClick={() => navigate('/admin/team-members')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to list
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Team Member Details</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => navigate('/admin/team-members')}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Back
          </button>
          <button
            onClick={() => navigate(`/admin/team-members/${id}/edit`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <i className="ri-edit-line mr-2"></i>
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <i className="ri-delete-bin-line mr-2"></i>
            Delete
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0">
              <img
                className="h-32 w-32 rounded-full object-cover"
                src={member.photo || buildApiUrl('/api/placeholder/128/128')}
                alt={member.name}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{member.name}</h2>
                <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${
                  member.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {member.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm font-medium text-gray-500">Position</p>
                  <p className="text-base text-gray-900">{member.position}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-base text-gray-900">{member.email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Region</p>
                  <p className="text-base text-gray-900">{member.region}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Zone</p>
                  <p className="text-base text-gray-900">{member.zone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Display Order</p>
                  <p className="text-base text-gray-900">{member.order}</p>
                </div>
              </div>

              {member.bio && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Biography</p>
                  <p className="text-base text-gray-700 leading-relaxed">{member.bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
            <div>
              <span className="font-medium">Created:</span> {new Date(member.createdAt).toLocaleDateString()}
            </div>
            <div>
              <span className="font-medium">Updated:</span> {new Date(member.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberDetailPage;
