import React from 'react';
import { useI18n } from '../i18n';

const Header = () => {
  const { t } = useI18n();
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-light dark:border-border-dark bg-white dark:bg-background-dark px-6 py-3 z-20 shrink-0">
      <div className="flex items-center gap-4">
        <div className="size-8 flex items-center justify-center">
          <img src="/favicon.svg" alt="Golem Logo" className="w-full h-full" />
        </div>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">
          Golem
        </h2>
      </div>
      <div className="flex flex-1 justify-end gap-6 items-center">
        {/* Global Search */}
        <label className="hidden md:flex flex-col min-w-40 h-10 w-full max-w-sm">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full border border-border-light dark:border-border-dark bg-slate-50 dark:bg-surface-dark overflow-hidden focus-within:ring-2 ring-primary/50 transition-all">
            <div className="text-slate-400 dark:text-slate-400 flex items-center justify-center pl-3">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input
              className="flex w-full min-w-0 flex-1 resize-none bg-transparent border-none text-slate-900 dark:text-white focus:ring-0 placeholder:text-slate-400 dark:placeholder:text-slate-400 px-3 text-sm font-normal leading-normal h-full"
              placeholder={t.dashboard.search}
            />
          </div>
        </label>
        
        <button className="flex items-center justify-center size-10 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-surface-dark transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        
        <div
          className="bg-center bg-no-repeat bg-cover rounded-full size-9 ring-2 ring-white dark:ring-border-dark cursor-pointer"
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAmzl41JC57aDEnbCeDGZFj7AmLf3pBbCuObXv2ndzXjzxvg3xMZgkHipcDGPw8EbWyGMIXLu-avHy-Tthj21WGnSnIiMx0IciCEYDuzI0L5y51kkEZwHQoLIbZGlx35YsUQ2lLmBwdl8FgfdC0qMxf7V1ncxGNe0K6LFisy4S-ddOVRcnAohZkCsHkq5s3teVjujJ2T2zJQIN00XqJvtH8NBUSTI7vTmnRjU1_dF0X1dPUnyC4k5JsmgcInBslrQfBPDs27eVp7xQg")' }}
        ></div>
      </div>
    </header>
  );
};

export default Header;