import React, { useState, useEffect } from 'react';
import { useI18n } from '../i18n';
import FilamentModal from '../components/FilamentModal';
import { Filament } from '../types';
import { fetchFilaments, createFilament, updateFilament as updateFilamentAPI } from '../lib/api';

const DashboardPage = () => {
  const { t } = useI18n();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFilament, setEditingFilament] = useState<Filament | undefined>();
  const [filaments, setFilaments] = useState<Filament[]>([]);
  const [loading, setLoading] = useState(true);

  // 加载数据
  useEffect(() => {
    loadFilaments();
  }, []);

  const loadFilaments = async () => {
    setLoading(true);
    const data = await fetchFilaments();
    setFilaments(data);
    setLoading(false);
  };

  const stats = [
    {
      label: t.dashboard.totalWeight,
      value: `${(filaments.reduce((sum, f) => sum + f.weightRemaining, 0) / 1000).toFixed(1)} kg`,
      icon: "scale",
      color: "text-slate-900 dark:text-white",
      iconColor: "text-slate-500 dark:text-slate-400",
      bg: "bg-white dark:bg-surface-dark",
      alert: false
    },
    {
      label: t.dashboard.activeSpools,
      value: filaments.length.toString(),
      icon: "all_inclusive",
      color: "text-slate-900 dark:text-white",
      iconColor: "text-slate-500 dark:text-slate-400",
      bg: "bg-white dark:bg-surface-dark",
      alert: false
    },
    {
      label: t.dashboard.lowStock,
      value: filaments.filter(f => f.weightRemaining / f.weightTotal < 0.2).length.toString(),
      icon: "warning",
      color: "text-slate-900 dark:text-white",
      iconColor: "text-orange-600 dark:text-orange-400",
      bg: "bg-white dark:bg-surface-dark",
      alert: true
    },
  ];

  const handleSaveFilament = async (filamentData: Omit<Filament, 'id' | 'status'>) => {
    if (editingFilament) {
      // Update existing filament
      const updated = await updateFilamentAPI(editingFilament.id, filamentData);
      if (updated) {
        setFilaments(filaments.map(f => f.id === editingFilament.id ? updated : f));
      }
    } else {
      // Add new filament
      const created = await createFilament(filamentData);
      if (created) {
        setFilaments([...filaments, created]);
      }
    }
    setEditingFilament(undefined);
  };

  const handleEdit = (filament: Filament) => {
    setEditingFilament(filament);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingFilament(undefined);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFilament(undefined);
  };

  return (
    <div className="layout-content-container flex flex-col max-w-[1400px] w-full mx-auto px-6 py-8 gap-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">
            {t.dashboard.title}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base font-normal">
            {t.dashboard.subtitle}
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-bold h-10 px-6 transition-all shadow-lg shadow-blue-500/20"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>{t.dashboard.addNew}</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className={`flex flex-col gap-2 rounded-xl p-6 border border-border-light dark:border-border-dark ${stat.bg} shadow-sm relative overflow-hidden`}>
            {stat.alert && (
              <div className="absolute right-0 top-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-8xl text-orange-500">warning</span>
              </div>
            )}
            <div className={`flex items-center gap-2 ${stat.iconColor}`}>
              <span className="material-symbols-outlined">{stat.icon}</span>
              <p className="text-sm font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
            <p className={`${stat.color} text-3xl font-bold leading-tight`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t.dashboard.allFilaments}</h3>
          <div className="flex gap-2">
            <div className="relative">
              <select
                className="bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark text-slate-700 dark:text-slate-300 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 pr-8 cursor-pointer [&::-webkit-calendar-picker-indicator]:hidden"
                style={{
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  appearance: 'none',
                  backgroundImage: 'none'
                }}
              >
                <option>{t.dashboard.sort}</option>
              </select>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <span className="material-symbols-outlined text-lg">expand_more</span>
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filaments.map((filament) => {
            const percent = Math.round((filament.weightRemaining / filament.weightTotal) * 100);
            let barColor = "bg-primary";
            if (percent < 20) barColor = "bg-orange-500";
            else if (percent > 90) barColor = "bg-green-500";
            else if (filament.name.includes("Gold")) barColor = "bg-yellow-500"; // Specific fix for mock data visual

            let badgeColor = "bg-slate-900 border-slate-700";
            if (filament.material === 'PETG') badgeColor = "bg-orange-600 border-orange-500";
            if (filament.material === 'ABS') badgeColor = "bg-blue-600 border-blue-500";
            if (filament.material === 'TPU') badgeColor = "bg-teal-600 border-teal-500";

            return (
              <div key={filament.id} className="group flex flex-col bg-white dark:bg-surface-dark rounded-xl overflow-hidden border border-border-light dark:border-border-dark hover:border-primary/50 dark:hover:border-primary/50 transition-all shadow-sm hover:shadow-lg hover:shadow-primary/5">
                <div className="relative aspect-[4/3] bg-slate-100 dark:bg-black/20 overflow-hidden">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={filament.imageUrl} alt={filament.name} />
                  <div className="absolute top-3 right-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold text-white shadow-sm border ${badgeColor}`}>
                      {filament.material}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(filament)}
                      className="size-8 flex items-center justify-center bg-white/90 text-slate-900 rounded-full shadow-lg hover:bg-white"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-4 flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">{filament.brand}</p>
                      <h3 className="font-bold text-slate-900 dark:text-white leading-tight">{filament.name}</h3>
                    </div>
                    <div className="group/tooltip relative">
                       <div 
                         className="size-6 rounded-full border border-slate-200 dark:border-slate-600 shadow-sm cursor-help"
                         style={{ backgroundColor: filament.colorHex }}
                       ></div>
                       <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:block px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap z-10">
                         {filament.colorHex}
                       </div>
                    </div>
                  </div>
                  <div className="mt-auto flex flex-col gap-2">
                    <div className="flex justify-between items-end">
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.dashboard.remaining}</span>
                      <span className={`text-sm font-bold ${percent < 20 ? 'text-orange-500' : 'text-slate-700 dark:text-slate-200'}`}>
                        {filament.weightRemaining}g <span className="text-slate-400 text-xs font-normal">/ {filament.weightTotal}g</span>
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                      <div className={`${barColor} h-2.5 rounded-full ${percent < 20 ? 'animate-pulse' : ''}`} style={{ width: `${percent}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <FilamentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveFilament}
        filament={editingFilament}
      />
    </div>
  );
};

export default DashboardPage;