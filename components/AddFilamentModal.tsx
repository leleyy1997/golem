import React from 'react';
import { useI18n } from '../i18n';

interface AddFilamentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddFilamentModal: React.FC<AddFilamentModalProps> = ({ isOpen, onClose }) => {
  const { t } = useI18n();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-4xl bg-white dark:bg-surface-dark rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-border-dark relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark sticky top-0 z-10 shrink-0">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{t.modal.addTitle}</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t.modal.addSubtitle}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-500 dark:text-slate-400">
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        {/* Content */}
        <div className="overflow-y-auto flex-1">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:divide-x divide-slate-200 dark:divide-border-dark">
                {/* Left Column */}
                <div className="col-span-1 lg:col-span-4 p-6 flex flex-col gap-8 bg-slate-50/50 dark:bg-background-dark/50">
                    <div className="flex flex-col gap-3">
                        <label className="text-sm font-semibold text-slate-900 dark:text-slate-200 flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">image</span>
                            {t.modal.spoolPhoto}
                        </label>
                        <div className="relative group cursor-pointer">
                            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-white dark:bg-surface-dark px-6 py-12 hover:border-primary dark:hover:border-primary transition-all group-hover:bg-slate-50 dark:group-hover:bg-white/5">
                                <div className="h-12 w-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-primary text-2xl">cloud_upload</span>
                                </div>
                                <p className="text-slate-700 dark:text-slate-300 text-sm font-medium text-center">{t.modal.clickToUpload}</p>
                                <p className="text-slate-400 dark:text-slate-500 text-xs text-center mt-1">{t.modal.dragDrop}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                         <label className="text-sm font-semibold text-slate-900 dark:text-slate-200 flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">palette</span>
                            {t.modal.filamentColor}
                        </label>
                        <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark p-4">
                            <div className="flex p-1 bg-slate-100 dark:bg-background-dark rounded-lg mb-4">
                                <button className="flex-1 text-xs font-medium py-1.5 px-3 rounded-md bg-white dark:bg-surface-dark text-slate-900 dark:text-white shadow-sm transition-all">{t.modal.hex}</button>
                                <button className="flex-1 text-xs font-medium py-1.5 px-3 rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all">{t.modal.palette}</button>
                                <button className="flex-1 text-xs font-medium py-1.5 px-3 rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all">{t.modal.pick}</button>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 shrink-0 rounded-full border border-slate-200 dark:border-slate-600 shadow-sm" style={{ backgroundColor: '#222222' }}></div>
                                <div className="flex-1 relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">#</span>
                                    <input className="w-full h-10 pl-7 pr-3 rounded-lg bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm font-mono uppercase text-slate-900 dark:text-white" type="text" defaultValue="222222" />
                                </div>
                            </div>
                             <div className="flex flex-wrap gap-2 mt-3">
                                <button className="w-6 h-6 rounded-full bg-red-500 hover:ring-2 ring-offset-2 ring-offset-white dark:ring-offset-surface-dark ring-red-500 transition-all"></button>
                                <button className="w-6 h-6 rounded-full bg-blue-500 hover:ring-2 ring-offset-2 ring-offset-white dark:ring-offset-surface-dark ring-blue-500 transition-all"></button>
                                <button className="w-6 h-6 rounded-full bg-green-500 hover:ring-2 ring-offset-2 ring-offset-white dark:ring-offset-surface-dark ring-green-500 transition-all"></button>
                                <button className="w-6 h-6 rounded-full bg-yellow-400 hover:ring-2 ring-offset-2 ring-offset-white dark:ring-offset-surface-dark ring-yellow-400 transition-all"></button>
                                <button className="w-6 h-6 rounded-full bg-white border border-slate-300 hover:ring-2 ring-offset-2 ring-offset-white dark:ring-offset-surface-dark ring-slate-400 transition-all"></button>
                                <button className="w-6 h-6 rounded-full bg-black border border-slate-700 hover:ring-2 ring-offset-2 ring-offset-white dark:ring-offset-surface-dark ring-slate-600 transition-all"></button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="col-span-1 lg:col-span-8 p-6 flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-900 dark:text-slate-200">{t.modal.displayName}</label>
                            <input className="h-12 rounded-xl border border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-background-dark/50 px-4 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-slate-400" type="text" placeholder={t.modal.displayNamePlaceholder} />
                         </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-900 dark:text-slate-200">{t.modal.brand}</label>
                            <div className="relative">
                                <select className="h-12 w-full appearance-none rounded-xl border border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-background-dark/50 px-4 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary transition-colors">
                                    <option value="" disabled selected>{t.modal.selectBrand}</option>
                                    <option value="prusament">Prusament</option>
                                    <option value="bambu">Bambu Lab</option>
                                    <option value="esun">eSun</option>
                                    <option value="polymaker">Polymaker</option>
                                    <option value="overture">Overture</option>
                                    <option value="hatchbox">Hatchbox</option>
                                    <option value="creality">Creality</option>
                                    <option value="anycubic">Anycubic</option>
                                    <option value="r3d">R3D</option>
                                    <option value="sanlu">Sanlu (三绿)</option>
                                    <option value="raise3d">Raise3D</option>
                                    <option value="tiertime">Tiertime</option>
                                    <option value="colorfabb">ColorFabb</option>
                                    <option value="matterhackers">MatterHackers</option>
                                    <option value="generic">Generic</option>
                                    <option value="other">Other</option>
                                </select>
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                    <span className="material-symbols-outlined">expand_more</span>
                                </span>
                            </div>
                         </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-900 dark:text-slate-200">{t.modal.materialType}</label>
                        <div className="flex flex-wrap gap-3">
                             {['PLA', 'PETG', 'ABS', 'TPU', 'Nylon'].map(m => (
                                 <label key={m} className="cursor-pointer">
                                    <input type="radio" name="material" className="peer sr-only" defaultChecked={m === 'PLA'} />
                                    <div className="px-5 py-2.5 rounded-lg border border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-background-dark/50 text-slate-600 dark:text-slate-400 text-sm font-medium transition-all hover:bg-slate-100 dark:hover:bg-background-dark peer-checked:bg-primary peer-checked:border-primary peer-checked:text-white peer-checked:shadow-md">
                                        {m}
                                    </div>
                                 </label>
                             ))}
                             <button className="px-3 py-2.5 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 text-slate-500 hover:text-primary hover:border-primary transition-colors">
                                <span className="material-symbols-outlined text-sm align-middle">add</span>
                             </button>
                        </div>
                    </div>

                    <div className="p-5 rounded-xl bg-slate-50/80 dark:bg-background-dark/30 border border-slate-200 dark:border-border-dark">
                         <div className="flex items-center justify-between mb-4">
                            <label className="text-sm font-semibold text-slate-900 dark:text-slate-200 flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">scale</span>
                                {t.modal.weightDetails}
                            </label>
                            <div className="text-xs font-medium text-slate-500 bg-slate-200 dark:bg-border-dark px-2 py-1 rounded">
                                {t.modal.standardSpool}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6 mb-4">
                             <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">{t.modal.initialWeight}</label>
                                <input className="h-10 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-background-dark px-3 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-right font-mono" type="number" defaultValue={1000} />
                             </div>
                             <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">{t.modal.currentWeight}</label>
                                <input className="h-10 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-background-dark px-3 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-right font-mono" type="number" defaultValue={850} />
                             </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-xs font-medium mb-1">
                                <span className="text-slate-500 dark:text-slate-400">{t.dashboard.remaining}</span>
                                <span className="text-primary">85%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[85%] rounded-full shadow-[0_0_10px_rgba(19,127,236,0.5)]"></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                         <label className="text-sm font-semibold text-slate-900 dark:text-slate-200 flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">sticky_note_2</span>
                            {t.modal.usageNotes}
                        </label>
                        <textarea 
                            className="flex-1 min-h-[120px] rounded-xl border border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-background-dark/50 p-4 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none text-sm leading-relaxed placeholder:text-slate-400"
                            placeholder={t.modal.usageNotesPlaceholder}
                        ></textarea>
                    </div>
                </div>
             </div>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-5 bg-slate-50 dark:bg-surface-dark border-t border-slate-200 dark:border-border-dark shrink-0">
             <button onClick={onClose} className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                {t.settings.cancel}
            </button>
            <button onClick={onClose} className="px-6 py-2.5 rounded-lg bg-primary text-white font-semibold text-sm shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">save</span>
                {t.settings.save}
            </button>
        </div>
      </div>
    </div>
  );
};

export default AddFilamentModal;