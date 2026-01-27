import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DATASETS, APP_DESCRIPTION } from '../constants';
import { DatasetCard } from '../components/DatasetCard';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
          Discover Custom Keyboard Data
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          {APP_DESCRIPTION}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {DATASETS.map((dataset) => (
          <DatasetCard
            key={dataset.id}
            dataset={dataset}
            onClick={() => navigate(`/dataset/${dataset.id}`)}
          />
        ))}
      </div>
    </main>
  );
};
