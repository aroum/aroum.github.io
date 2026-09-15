import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Papa from 'papaparse';
import { DATASETS } from '../constants';
import { CsvData, SortConfig } from '../types';
import { DataTable } from '../components/DataTable';
import { ArrowLeftIcon, SearchIcon, InfoIcon, SunIcon, MoonIcon, GithubIcon } from '../components/Icons';

interface DatasetViewProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

export const DatasetView: React.FC<DatasetViewProps> = ({ darkMode, toggleTheme }) => {
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

  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Unified top bar */}
      <header className="w-full border-b bg-white/80 backdrop-blur-md dark:bg-gray-950/80 dark:border-gray-800 transition-colors duration-300 shrink-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left section: Akdb badge + Back arrow + Dataset Title + Spoiler info */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Link 
              to="/" 
              className="h-9 px-3 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform shrink-0"
              title="Home"
            >
              Akdb
            </Link>

            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-xl text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0 active:scale-95"
              aria-label="Back to datasets"
              title="Back to datasets"
            >
              <ArrowLeftIcon />
            </button>

            <h1 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white tracking-tight truncate">
              {dataset.name}
            </h1>

            {dataset.description && (
              <button
                onClick={() => setShowDescription(!showDescription)}
                className={`p-1.5 rounded-lg text-sm transition-colors shrink-0 ${
                  showDescription 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' 
                    : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                aria-label="Toggle dataset description"
                title={showDescription ? "Hide description" : "Show description"}
              >
                <InfoIcon />
              </button>
            )}
          </div>

          {/* Right section: Record count + Search + GitHub + Theme toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {!loading && data && (
              <span className="hidden sm:inline-block text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap bg-gray-100 dark:bg-gray-800 px-2.5 py-1.5 rounded-xl">
                {filteredAndSortedData.rows.length} records
              </span>
            )}

            <div className="w-36 sm:w-56 md:w-64">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  placeholder="Search records..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="block w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
                />
              </div>
            </div>

            <a
              href="https://github.com/aroum/aroum.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-all active:scale-95"
              aria-label="GitHub Repository"
            >
              <GithubIcon />
            </a>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-all active:scale-95"
              aria-label="Toggle theme"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>

        {/* Expandable spoiler description */}
        {showDescription && dataset.description && (
          <div className="border-t border-gray-100 dark:border-gray-800 bg-blue-50/50 dark:bg-gray-900/50 px-4 sm:px-6 lg:px-8 py-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed animate-in fade-in-50 duration-200">
            {dataset.description}
          </div>
        )}
      </header>

      {/* Main Table Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex-1 flex flex-col min-h-0 overflow-hidden">

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
    </div>
  );
};
