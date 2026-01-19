import React from 'react';
import { NavLink } from 'react-router-dom';
import { useI18n } from '../i18n';

const Sidebar = () => {
  const { t } = useI18n();

  const activeClass = "flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary transition-colors";
  const inactiveClass = "flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-surface-light dark:hover:bg-surface-dark hover:text-slate-900 dark:hover:text-white transition-colors";

  return (
    <aside className="w-64 bg-white dark:bg-background-dark border-r border-border-light dark:border-border-dark flex-col hidden md:flex overflow-y-auto custom-scrollbar h-full shrink-0">
      <div className="p-4 flex flex-col gap-6 h-full">
        <div>
          <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-3 px-3">
            {t.menu.title}
          </h3>
          <nav className="flex flex-col gap-1">
            <NavLink to="/" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
              <span className="material-symbols-outlined">dashboard</span>
              <span className="text-sm font-medium">{t.menu.dashboard}</span>
            </NavLink>
            <NavLink to="/inventory" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
              <span className="material-symbols-outlined">inventory_2</span>
              <span className="text-sm font-medium">{t.menu.inventory}</span>
            </NavLink>
            <NavLink to="/prints" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
              <span className="material-symbols-outlined">print</span>
              <span className="text-sm font-medium">{t.menu.prints}</span>
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
              <span className="material-symbols-outlined">settings</span>
              <span className="text-sm font-medium">{t.menu.settings}</span>
            </NavLink>
          </nav>
        </div>
        
        <div className="h-px bg-slate-200 dark:bg-border-dark w-full"></div>
        
        {/* Filters Section (Visual Only for now, could be functional) */}
        <div>
           <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-3 px-3">
            {t.dashboard.filterMaterial}
          </h3>
          <div className="flex flex-col gap-2 px-3">
             {['PLA', 'PETG', 'ABS / ASA', 'TPU'].map(mat => (
               <label key={mat} className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 dark:border-slate-600 bg-transparent text-primary focus:ring-primary/50 focus:ring-offset-0 size-4" />
                  <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">{mat}</span>
               </label>
             ))}
          </div>
        </div>

        <div className="mt-auto">
             <button className={inactiveClass + " w-full"}>
                <span className="material-symbols-outlined">logout</span>
                <span className="text-sm font-medium">{t.menu.logout}</span>
             </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;