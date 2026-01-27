import React from 'react';
import { DatasetConfig } from '../types';

interface DatasetCardProps {
  dataset: DatasetConfig;
  onClick: () => void;
}

export const DatasetCard: React.FC<DatasetCardProps> = ({ dataset, onClick }) => (
  <div
    onClick={onClick}
    className="group relative flex flex-col h-full p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
  >
    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-full">
        <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
    <div className="flex-1">
      <div className="mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
          {dataset.category || 'Dataset'}
        </span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {dataset.name}
      </h3>
      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-3">
        {dataset.description}
      </p>
    </div>
    <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2">
       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
       </svg>
       <div className="text-xs text-gray-500 dark:text-gray-500 font-mono truncate">
         {dataset.filename}
       </div>
    </div>
  </div>
);
