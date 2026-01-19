import React from 'react';
import { useI18n } from '../i18n';
import { Language } from '../types';

const SettingsPage = () => {
  const { t, language, setLanguage, autoDetect, setAutoDetect } = useI18n();

  return (
    <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-10 py-6 lg:py-8 flex flex-col overflow-y-auto">
        
        {/* Breadcrumb */}
        <div className="flex flex-wrap gap-2 px-4 pb-6">
            <span className="text-slate-500 dark:text-text-secondary text-sm font-medium hover:text-primary transition-colors cursor-pointer">Home</span>
            <span className="text-slate-400 dark:text-text-secondary text-sm font-medium">/</span>
            <span className="text-slate-900 dark:text-white text-sm font-medium">{t.settings.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
             {/* Settings Sidebar */}
             <aside className="w-full lg:w-64 shrink-0">
                <div className="flex flex-col gap-4 bg-white dark:bg-background-dark p-4 rounded-xl border border-slate-200 dark:border-border-dark sticky top-4">
                    <div className="flex flex-col px-3 pt-2 pb-4 border-b border-slate-200 dark:border-border-dark mb-2">
                        <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-normal">{t.settings.title}</h1>
                        <p className="text-slate-500 dark:text-text-secondary text-xs font-normal mt-1">{t.settings.subtitle}</p>
                    </div>
                    <nav className="flex flex-col gap-1">
                         <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-text-secondary hover:bg-slate-50 dark:hover:bg-surface-dark hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer group">
                             <span className="material-symbols-outlined group-hover:scale-110 transition-transform">settings</span>
                             <p className="text-sm font-medium">{t.settings.general}</p>
                         </div>
                         <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-text-secondary hover:bg-slate-50 dark:hover:bg-surface-dark hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer group">
                             <span className="material-symbols-outlined group-hover:scale-110 transition-transform">visibility</span>
                             <p className="text-sm font-medium">{t.settings.appearance}</p>
                         </div>
                         <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary border-l-4 border-primary">
                             <span className="material-symbols-outlined fill">language</span>
                             <p className="text-sm font-bold">{t.settings.language}</p>
                         </div>
                    </nav>
                </div>
             </aside>

             {/* Main Settings Content */}
             <section className="flex-1 w-full max-w-[800px] bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-border-dark p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col gap-2 mb-8 border-b border-slate-200 dark:border-border-dark pb-6">
                    <h2 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">{t.settings.systemPrefs}</h2>
                    <p className="text-slate-500 dark:text-text-secondary text-base font-normal max-w-xl">{t.settings.systemPrefsDesc}</p>
                </div>

                <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
                    {/* Language Select */}
                    <div className="flex flex-col gap-3">
                         <label className="text-slate-900 dark:text-white text-base font-medium" htmlFor="language-select">{t.settings.displayLang}</label>
                         <p className="text-slate-500 dark:text-text-secondary text-sm -mt-2 mb-1">{t.settings.displayLangDesc}</p>
                         <div className="relative max-w-md">
                            <select
                                id="language-select"
                                value={language}
                                onChange={(e) => {
                                    setLanguage(e.target.value as Language);
                                    if(autoDetect) setAutoDetect(false);
                                }}
                                className="w-full rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary border border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-surface-dark h-12 pl-4 pr-10 text-base font-normal transition-colors cursor-pointer [&::-webkit-calendar-picker-indicator]:hidden"
                                style={{
                                  WebkitAppearance: 'none',
                                  MozAppearance: 'none',
                                  appearance: 'none',
                                  backgroundImage: 'none'
                                }}
                            >
                                <option value="en">English (US)</option>
                                <option value="zh">简体中文 (Chinese)</option>
                                <option value="es">Español (Spanish)</option>
                                <option value="de">Deutsch (German)</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-text-secondary">
                                <span className="material-symbols-outlined">expand_more</span>
                            </div>
                         </div>
                    </div>

                    {/* Auto Detect Toggle */}
                    <div className="flex items-center justify-between gap-4 max-w-md p-4 rounded-lg border border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-surface-dark/50">
                        <div className="flex flex-col gap-1">
                            <span className="text-slate-900 dark:text-white text-base font-medium">{t.settings.autoDetect}</span>
                            <span className="text-slate-500 dark:text-text-secondary text-sm font-normal">{t.settings.autoDetectDesc}</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={autoDetect} onChange={(e) => setAutoDetect(e.target.checked)} />
                            <div className="w-11 h-6 bg-slate-200 dark:bg-border-dark peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>

                    <div className="w-full h-px bg-slate-200 dark:bg-border-dark my-2"></div>

                    {/* Inventory Alerts */}
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-slate-900 dark:text-white text-xl font-bold leading-tight">{t.settings.inventoryAlerts}</h3>
                            <p className="text-slate-500 dark:text-text-secondary text-sm">{t.settings.inventoryAlertsDesc}</p>
                        </div>
                        <div className="flex items-center justify-between gap-4 max-w-md p-4 rounded-lg border border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-surface-dark/50">
                             <span className="text-slate-900 dark:text-white text-base font-medium">{t.settings.enableAlerts}</span>
                             <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-slate-200 dark:bg-border-dark peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>

                        <div className="flex flex-col gap-3">
                            <label className="text-slate-900 dark:text-white text-base font-medium" htmlFor="threshold-input">{t.settings.threshold}</label>
                            <div className="relative max-w-md">
                                <input 
                                    id="threshold-input"
                                    type="number"
                                    className="w-full appearance-none rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary border border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-surface-dark h-12 pl-4 pr-10 text-base font-normal transition-colors placeholder:text-slate-400"
                                    placeholder="e.g. 100"
                                />
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-text-secondary">
                                    <span className="text-sm font-medium">g</span>
                                </div>
                            </div>
                            <p className="text-slate-500 dark:text-text-secondary text-sm font-normal">{t.settings.thresholdDesc}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 pt-6 mt-4 border-t border-slate-200 dark:border-border-dark">
                        <button className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 flex-1 sm:flex-none bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark transition-all">
                            {t.settings.save}
                        </button>
                         <button className="flex min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 flex-1 sm:flex-none bg-transparent text-slate-600 dark:text-text-secondary text-sm font-bold leading-normal tracking-[0.015em] border border-transparent hover:bg-slate-100 dark:hover:bg-surface-dark hover:text-slate-900 dark:hover:text-white transition-colors">
                            {t.settings.cancel}
                        </button>
                    </div>

                </form>
             </section>
        </div>
    </div>
  );
};

export default SettingsPage;