import React, { useState } from 'react';
import { CsvData, SortConfig } from '../types';
import { ChevronUpIcon, ChevronDownIcon, ImageIcon } from './Icons';

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
      if (!content || !content.trim()) {
        return (
          <div className="h-20 w-20 flex items-center justify-center bg-gray-50/50 dark:bg-gray-800/30 rounded-lg border border-dashed border-gray-200 dark:border-gray-800 shrink-0">
            <ImageIcon />
          </div>
        );
      }
      const src = getImgSrc(content.trim());
      return (
        <div className="h-20 w-20 flex items-center justify-center bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer group shrink-0">
          <img 
             src={src} 
             alt={row['name'] || 'Image'} 
             loading="lazy"
             decoding="async"
             className="max-h-full max-w-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
             onClick={() => setPreviewImage(src)}
             onError={(e) => {
               const target = e.target as HTMLImageElement;
               target.style.display = 'none';
               if (target.parentElement) {
                 target.parentElement.className = "h-20 w-20 flex items-center justify-center bg-gray-50/50 dark:bg-gray-800/30 rounded-lg border border-dashed border-gray-200 dark:border-gray-800 shrink-0";
                 target.parentElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-300 dark:text-gray-600"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>';
               }
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

      <div className="w-full rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-900 flex flex-col flex-1 min-h-[500px]">
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