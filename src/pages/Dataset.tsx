import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import { DATASETS } from '../constants';
import { CsvData, SortConfig } from '../types';
import { DataTable } from '../components/DataTable';
import { ArrowLeftIcon, SearchIcon } from '../components/Icons';

export const DatasetView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dataset = DATASETS.find((d) => d.id === id);

  const [data, setData] = useState<CsvData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: '', direction: null });

  useEffect(() => {
    if (!dataset) return;
    setLoading(true);
    setError(null);

    const loadData = async () => {
      try {
        // Use Papa.parse to fetch and parse in one go
        Papa.parse(`data/csv/${dataset.filename}`, {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.errors.length > 0) {
              console.error("CSV Parse Errors:", results.errors);
            }
            setData({
              headers: results.meta.fields || [],
              rows: results.data as Record<string, any>[],
            });
            setLoading(false);
          },
          error: (err) => {
            setError(`Failed to parse CSV: ${err.message}`);
            setLoading(false);
          }
        });
      } catch (err) {
        setError('Failed to load dataset. Ensure the CSV file exists in the public/data folder.');
        console.error(err);
        setLoading(false);
      }
    };

    loadData();
  }, [dataset]);

  const filteredAndSortedData = useMemo(() => {
    if (!data) return { headers: [], rows: [] };

    let processedRows = [...data.rows];

    // Filter
    if (search.trim()) {
      const lowerSearch = search.toLowerCase();
      processedRows = processedRows.filter((row) =>
        data.headers.some((header) =>
          String(row[header] || '').toLowerCase().includes(lowerSearch)
        )
      );
    }

    // Sort
    if (sortConfig.key && sortConfig.direction) {
      processedRows.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        // Try numeric sort
        const aNum = parseFloat(String(aVal).replace(/[^0-9.-]+/g, ''));
        const bNum = parseFloat(String(bVal).replace(/[^0-9.-]+/g, ''));

        if (!isNaN(aNum) && !isNaN(bNum)) {
          return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
        }

        // String sort
        const aStr = String(aVal || '').toLowerCase();
        const bStr = String(bVal || '').toLowerCase();
        if (aStr < bStr) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aStr > bStr) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return { headers: data.headers, rows: processedRows };
  }, [data, search, sortConfig]);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' | null = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null; // Optional: 3rd state to clear sort
    }
    setSortConfig({ key, direction });
  };

  if (!dataset) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-red-500">
        Dataset not found.
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
      <div className="mb-4 shrink-0">
        <button
          onClick={() => navigate('/')}
          className="group inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors mb-4 px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 -ml-3"
        >
          <div className="group-hover:-translate-x-1 transition-transform">
            <ArrowLeftIcon />
          </div>
          Back to Datasets
        </button>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
              {dataset.name}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {dataset.description}
            </p>
          </div>

          <div className="w-full lg:w-auto min-w-[300px]">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search records..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Loading data...</p>
          </div>
        </div>
      ) : error ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-100 dark:border-red-900">
            <p className="text-red-600 dark:text-red-400 mb-2 font-semibold">Error Loading Dataset</p>
            <p className="text-red-500 dark:text-red-300 text-sm">{error}</p>
          </div>
        </div>
      ) : (
        <DataTable
          data={filteredAndSortedData}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      )}
    </main>
  );
};
