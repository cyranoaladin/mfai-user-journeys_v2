import JourneyCard from '@/components/Journey/JourneyCard/JourneyCard';
import JourneyHeader from '@/components/Journey/JourneyHeader/JourneyHeader';
import { useJourneys } from '@/hooks/useJourneys';
import { JourneyContent } from '@/types/journey';
import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Home Page
 *
 * Landing page with hero section and journey entry point
 */

interface Filters {
  profileType: string;
  target: string;
  missionType: string;
}

export default function Home() {
  const [searchQuery] = useState('');
  const [filters] = useState<Filters>({
    profileType: '',
    target: '',
    missionType: '',
  });

  const { journeys, isLoading, error } = useJourneys();

  const filteredJourneys =
    journeys?.filter((journey: JourneyContent) => {
      const matchesSearch =
        journey.metadata.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        journey.metadata.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilters =
        (!filters.profileType || journey.metadata.profileType === filters.profileType) &&
        (!filters.target || journey.metadata.target === filters.target) &&
        (!filters.missionType || journey.metadata.missionType === filters.missionType);

      return matchesSearch && matchesFilters;
    }) || [];

  // const handleFilterChange = (newFilters: Partial<Filters>) => { ... }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Une erreur est survenue lors du chargement des parcours.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <JourneyHeader
        journey={{
          title: 'Money Factory AI',
          description:
            'Explorez nos parcours personnalisés pour développer vos compétences en finance et en intelligence artificielle.',
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJourneys.map((journey: JourneyContent) => (
          <motion.div
            key={journey.metadata.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <JourneyCard
              journey={journey}
              onSelect={slug => {
                // Handle journey selection
                console.log('Selected journey:', slug);
              }}
            />
          </motion.div>
        ))}
      </div>

      {filteredJourneys.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-400 mb-2">Aucun parcours trouvé</h3>
          <p className="text-gray-500">
            Essayez de modifier vos critères de recherche ou de filtrage.
          </p>
        </div>
      )}
    </div>
  );
}
