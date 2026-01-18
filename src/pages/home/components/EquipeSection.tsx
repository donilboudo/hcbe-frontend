import { useState, useEffect } from 'react';
import { teamMembersApi } from '../../../lib/api/team-members';
import type { TeamMemberDto } from '../../../lib/api/types';
import { buildApiUrl } from '../../../lib/api/base-url';

const EquipeSection = () => {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMemberDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTeamMembers = async () => {
      try {
        setLoading(true);
        const response = await teamMembersApi.getActiveTeamMembers();
        if (response.success && response.data) {
          setTeamMembers(response.data);
        } else {
          setError('Erreur lors du chargement de l\'équipe');
        }
      } catch (err) {
        console.error('Error loading team members:', err);
        setError('Erreur lors du chargement de l\'équipe');
      } finally {
        setLoading(false);
      }
    };

    loadTeamMembers();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
            >
              Réessayer
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 px-4 py-2 rounded-full mb-4">
            <i className="ri-team-line text-emerald-600"></i>
            <span className="text-emerald-600 font-semibold text-sm">Notre Équipe</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Les Membres du Bureau Exécutif
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Une équipe dévouée au service de la communauté burkinabè au Canada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer group border border-gray-200 relative"
              onClick={() => setSelectedMember(member.id)}
            >
              <div className="absolute top-4 right-4 z-10 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {member.zone}
              </div>
              
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member.photo || buildApiUrl('/api/placeholder/400/500')}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-emerald-600 font-semibold text-sm mb-3">{member.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedMember && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {teamMembers
              .filter((m) => m.id === selectedMember)
              .map((member) => (
                <div key={member.id}>
                  <div className="relative h-80">
                    <img
                      src={member.photo || buildApiUrl('/api/placeholder/400/500')}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <button
                      onClick={() => setSelectedMember(null)}
                      className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <i className="ri-close-line text-xl text-gray-900"></i>
                    </button>
                  </div>
                  <div className="p-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-emerald-600 font-semibold mb-4">{member.position}</p>
                    <div className="flex items-center text-gray-600 mb-6">
                      <i className="ri-map-pin-line mr-2"></i>
                      <span>{member.zone}</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6">{member.bio}</p>
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors whitespace-nowrap"
                      >
                        <i className="ri-mail-line mr-2"></i>
                        {member.email}
                      </a>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default EquipeSection;
