import React, { useState, useEffect } from 'react';
import { useI18n } from '../i18n';
import { FilamentStatus, Filament } from '../types';
import FilamentModal from '../components/FilamentModal';
import { fetchFilaments, createFilament, updateFilament as updateFilamentAPI } from '../lib/api';

const InventoryPage = () => {
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

  const handleSaveFilament = async (filamentData: Omit<Filament, 'id' | 'status'>) => {
    if (editingFilament) {
      const updated = await updateFilamentAPI(editingFilament.id, filamentData);
      if (updated) {
        setFilaments(filaments.map(f => f.id === editingFilament.id ? updated : f));
      }
    } else {
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
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-[1400px] mx-auto p-4 md:p-8 flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black tracking-tight">{t.inventory.title}</h2>
            <p className="text-slate-500 dark:text-text-secondary text-base">{t.inventory.subtitle}</p>
          </div>
          <div className="flex gap-3">
             <button className="hidden md:flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark text-slate-700 dark:text-white text-sm font-bold hover:bg-slate-50 dark:hover:bg-border-dark transition-colors">
                <span className="material-symbols-outlined text-[20px]">ios_share</span>
                {t.inventory.export}
            </button>
             <button
               onClick={handleAddNew}
               className="flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-bold h-10 px-6 transition-all shadow-lg shadow-blue-500/20"
             >
              <span className="material-symbols-outlined text-[20px]">add</span>
              {t.dashboard.addNew}
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark items-center">
            <div className="relative flex-1 w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined">search</span>
                <input className="w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark text-slate-900 dark:text-white text-sm rounded-lg h-10 pl-10 pr-4 focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-slate-400" placeholder={t.dashboard.search} type="text"/>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                <div className="relative">
                    <select
                        className="bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark text-slate-700 dark:text-white text-sm rounded-lg h-10 pl-3 pr-8 min-w-[120px] focus:ring-primary focus:border-primary cursor-pointer [&::-webkit-calendar-picker-indicator]:hidden"
                        style={{
                          WebkitAppearance: 'none',
                          MozAppearance: 'none',
                          appearance: 'none',
                          backgroundImage: 'none'
                        }}
                    >
                        <option>{t.dashboard.filterBrand}</option>
                    </select>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                        <span className="material-symbols-outlined text-lg">expand_more</span>
                    </span>
                </div>
                 <div className="relative">
                    <select
                        className="bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark text-slate-700 dark:text-white text-sm rounded-lg h-10 pl-3 pr-8 min-w-[120px] focus:ring-primary focus:border-primary cursor-pointer [&::-webkit-calendar-picker-indicator]:hidden"
                        style={{
                          WebkitAppearance: 'none',
                          MozAppearance: 'none',
                          appearance: 'none',
                          backgroundImage: 'none'
                        }}
                    >
                        <option>{t.dashboard.filterMaterial}</option>
                    </select>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                        <span className="material-symbols-outlined text-lg">expand_more</span>
                    </span>
                </div>
                <button className="flex items-center justify-center size-10 rounded-lg bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark text-slate-500 dark:text-text-secondary hover:text-primary dark:hover:text-white transition-colors shrink-0">
                    <span className="material-symbols-outlined">filter_list</span>
                </button>
            </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-200 dark:border-border-dark bg-white dark:bg-background-dark shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-surface-dark border-b border-slate-200 dark:border-border-dark text-slate-500 dark:text-text-secondary text-xs uppercase tracking-wider font-semibold">
                            <th className="p-4 w-12 text-center">
                                <input type="checkbox" className="rounded border-slate-300 dark:border-border-dark bg-white dark:bg-background-dark text-primary focus:ring-0 focus:ring-offset-0 size-4" />
                            </th>
                            <th className="p-4 font-medium">{t.inventory.table.spool}</th>
                            <th className="p-4 font-medium min-w-[140px]">{t.inventory.table.nameBrand}</th>
                            <th className="p-4 font-medium">{t.inventory.table.material}</th>
                            <th className="p-4 font-medium">{t.inventory.table.color}</th>
                            <th className="p-4 font-medium">{t.inventory.table.weight}</th>
                            <th className="p-4 font-medium">{t.inventory.table.status}</th>
                            <th className="p-4 font-medium text-right">{t.inventory.table.actions}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-border-dark">
                        {filaments.map((f) => {
                             const percent = Math.round((f.weightRemaining / f.weightTotal) * 100);
                             let badgeClass = "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";
                             if (f.material === 'PLA') badgeClass = "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20";
                             if (f.material === 'PETG') badgeClass = "bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20";
                             if (f.material === 'ASA' || f.material === 'ABS') badgeClass = "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20";

                             let statusColor = "text-emerald-500 dark:text-emerald-400";
                             let statusIcon = "check_circle";
                             if (f.status === FilamentStatus.LowStock) {
                                 statusColor = "text-amber-500 dark:text-amber-400";
                                 statusIcon = "warning";
                             }
                             if (f.status === FilamentStatus.Critical) {
                                 statusColor = "text-red-500 dark:text-red-400";
                                 statusIcon = "error";
                             }

                            return (
                                <tr key={f.id} className="group hover:bg-slate-50 dark:hover:bg-surface-dark/50 transition-colors">
                                    <td className="p-4 text-center">
                                        <input type="checkbox" className="rounded border-slate-300 dark:border-border-dark bg-white dark:bg-background-dark text-primary focus:ring-0 focus:ring-offset-0 size-4" />
                                    </td>
                                    <td className="p-4">
                                        <div className="size-12 rounded-lg bg-cover bg-center border border-slate-200 dark:border-border-dark" style={{ backgroundImage: `url(${f.imageUrl})` }}></div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="text-slate-900 dark:text-white text-sm font-medium">{f.name}</span>
                                            <span className="text-slate-500 dark:text-text-secondary text-xs">{f.brand}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${badgeClass}`}>
                                            {f.material}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                         <div className="flex items-center gap-2">
                                            <div className="size-4 rounded-full border border-slate-200 dark:border-white/10 shadow-sm" style={{ backgroundColor: f.colorHex }}></div>
                                            <span className="text-slate-700 dark:text-white text-sm hidden lg:inline">{f.colorName}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-1 w-24">
                                            <span className="text-slate-900 dark:text-white text-sm font-mono">{f.weightRemaining}g</span>
                                            <div className="h-1.5 w-full bg-slate-200 dark:bg-border-dark rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full ${f.status === FilamentStatus.Critical ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${percent}%` }}></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className={`flex items-center gap-1.5 text-sm font-medium ${statusColor}`}>
                                            <span className={`material-symbols-outlined text-[18px] ${statusIcon === 'check_circle' ? 'fill' : ''}`}>{statusIcon}</span>
                                            {t.inventory.status[f.status]}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                              onClick={() => handleEdit(f)}
                                              className="p-2 rounded-lg bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                            </button>
                                            <button className="p-2 rounded-lg bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-red-500/20 hover:text-red-600 dark:hover:text-red-400 transition-colors shadow-sm">
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
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

export default InventoryPage;