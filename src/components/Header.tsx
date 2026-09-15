import React from 'react';
import { Link } from 'react-router-dom';
import { APP_TITLE } from '../constants';
import { SunIcon, MoonIcon, GithubIcon } from './Icons';

interface HeaderProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, toggleTheme }) => (
  <header className="w-full border-b bg-white/80 backdrop-blur-md dark:bg-gray-950/80 dark:border-gray-800 transition-colors duration-300 supports-[backdrop-filter]:bg-white/60">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="h-9 px-3 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
          Akdb
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          Aroum's Keyboard DB
        </h1>
      </Link>
      <div className="flex items-center gap-2">
        <a
          href="https://github.com/aroum/aroum.github.io"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-all active:scale-95"
          aria-label="GitHub Repository"
        >
          <GithubIcon />
        </a>
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-all active:scale-95"
          aria-label="Toggle theme"
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </div>
  </header>
);
