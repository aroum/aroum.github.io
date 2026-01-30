import React, { useState } from 'react';
import { CsvData, SortConfig } from '../types';
import { ChevronUpIcon, ChevronDownIcon } from './Icons';

interface DataTableProps {
  data: CsvData;
  sortConfig: SortConfig;
  onSort: (key: string) => void;
}

const SortIndicator: React.FC<{ header: string; sortConfig: SortConfig }> = ({ header, sortConfig }) => {
  const isSorted = sortConfig.key === header;
  
  if (isSorted) {
    return sortConfig.direction === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />;
  }
  
  return (
    <div className="opacity-0 group-hover:opacity-50 flex flex-col transition-opacity">
       <ChevronUpIcon />
    </div>
  );
};

const ImagePreviewModal: React.FC<{ src: string; onClose: () => void }> = ({ src, onClose }) => (
  <div 
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity p-4"
    onClick={onClose}
  >
    <div className="relative max-w-full max-h-full">
      <img 
        src={src} 
        alt="Preview" 
        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200"
      />
    </div>
  </div>
);

export const DataTable: React.FC<DataTableProps> = ({ data, sortConfig, onSort }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const getImgSrc = (path: string) => path.startsWith('http') ? path : `data/pics/${path}`;

  const renderCellContent = (header: string, row: Record<string, any>) => {
    const content = row[header];

    if (header === 'pics' || header === 'pic') {
      const src = getImgSrc(content);
      return (
        <div className="h-24 w-auto overflow-hidden rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer group">
          <img 
             src={src} 
             alt={row['name'] || 'Image'} 
             className="h-full w-auto object-cover group-hover:scale-105 transition-transform duration-300"
             onClick={() => setPreviewImage(src)}
             onError={(e) => {
               const target = e.target as HTMLImageElement;
               target.style.display = 'none';
               if (target.parentElement) target.parentElement.innerText = 'No Image';
             }}
           />
        </div>
      );
    }

    if (header === 'links' || header === 'link') {
      return content ? (
        <a 
          href={content} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-semibold"
        >
          click
        </a>
      ) : null;
    }

    return content;
  };

  if (!data.rows.length) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        No data matches your search.
      </div>
    );
  }

  return (
    <>
      {previewImage && <ImagePreviewModal src={previewImage} onClose={() => setPreviewImage(null)} />}

      <div className="w-full rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-900 flex flex-col h-[calc(100vh-14rem)] min-h-[500px]">
        <div className="overflow-auto custom-scrollbar flex-1 rounded-xl">
          <table className="w-full text-sm text-left border-collapse relative">
            
            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase text-xs font-semibold sticky top-0 z-10 backdrop-blur-sm shadow-sm">
              <tr>
                {data.headers.map((header) => {
                  const isCompact = header === 'link' || header === 'links';
                  return (
                    <th
                      key={header}
                      scope="col"
                      className={`whitespace-nowrap cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors select-none group border-b border-gray-200 dark:border-gray-700 first:rounded-tl-xl last:rounded-tr-xl ${isCompact ? 'w-px px-2' : 'px-6 py-4'}`}
                      onClick={() => onSort(header)}
                    >
                      <div className={`flex items-center gap-2 ${isCompact ? 'justify-start' : ''}`}>
                        {header}
                        <span className="flex flex-col text-gray-400 w-3">
                          <SortIndicator header={header} sortConfig={sortConfig} />
                        </span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {data.rows.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  {data.headers.map((header, hIdx) => {
                    const content = row[header];
                    const isCompactColumn = ['link', 'links', 'pic', 'pics'].includes(header);
                    const isLongText = !isCompactColumn && typeof content === 'string' && content.length > 50;
                    
                    return (
                      <td 
                        key={`${idx}-${hIdx}`} 
                        className={`py-3 text-gray-600 dark:text-gray-400 font-medium ${isCompactColumn ? 'px-2' : 'px-6'} ${isLongText ? 'min-w-[300px] max-w-[500px] whitespace-normal' : 'whitespace-nowrap'}`}
                      >
                        {renderCellContent(header, row)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};