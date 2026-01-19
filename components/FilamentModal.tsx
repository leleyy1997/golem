import React, { useState, useEffect } from 'react';
import { useI18n } from '../i18n';
import { Filament } from '../types';

interface FilamentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (filament: Omit<Filament, 'id' | 'status'>) => void;
  filament?: Filament;
}

const FilamentModal: React.FC<FilamentModalProps> = ({ isOpen, onClose, onSave, filament }) => {
  const { t } = useI18n();
  const isEditing = !!filament;
  const colorPickerRef = React.useRef<HTMLInputElement>(null);
  const imageInputRef = React.useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    brand: '',
    name: '',
    material: 'PLA',
    colorName: '',
    colorHex: '#222222',
    weightTotal: 1000,
    weightRemaining: 1000,
    imageUrl: '',
    notes: ''
  });

  const [isCustomBrand, setIsCustomBrand] = useState(false);

  useEffect(() => {
    if (filament) {
      setFormData({
        brand: filament.brand,
        name: filament.name,
        material: filament.material,
        colorName: filament.colorName,
        colorHex: filament.colorHex,
        weightTotal: filament.weightTotal,
        weightRemaining: filament.weightRemaining,
        imageUrl: filament.imageUrl,
        notes: ''
      });
      // Check if brand is not in the predefined list
      const predefinedBrands = ['Prusament', 'eSun', 'Polymaker', 'Overture', 'Hatchbox', 'Generic'];
      setIsCustomBrand(!predefinedBrands.includes(filament.brand));
    } else {
      setFormData({
        brand: '',
        name: '',
        material: 'PLA',
        colorName: '',
        colorHex: '#222222',
        weightTotal: 1000,
        weightRemaining: 1000,
        imageUrl: '',
        notes: ''
      });
      setIsCustomBrand(false);
    }
  }, [filament, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      brand: formData.brand || 'Unknown',
      name: formData.name || `${formData.brand} ${formData.colorName}`,
      colorName: formData.colorName || formData.colorHex,
      imageUrl: formData.imageUrl || `https://via.placeholder.com/400x300/${formData.colorHex.slice(1)}/ffffff?text=${encodeURIComponent(formData.material)}`
    });
    onClose();
  };

  const remainingPercent = Math.round((formData.weightRemaining / formData.weightTotal) * 100);

  const handleColorPickerClick = () => {
    colorPickerRef.current?.click();
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, colorHex: e.target.value });
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'custom') {
      setIsCustomBrand(true);
      setFormData({ ...formData, brand: '' });
    } else {
      setFormData({ ...formData, brand: value });
    }
  };

  const handleImageUploadClick = () => {
    imageInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 检查文件类型
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // 检查文件大小（限制为 5MB）
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }

      // 创建预览
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, imageUrl: '' });
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-4xl bg-white dark:bg-surface-dark rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-border-dark relative flex flex-col max-h-[90vh]">

        {/* Header */}
        <header className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark sticky top-0 z-10 shrink-0">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {isEditing ? `${t.settings.title}` : t.modal.addTitle}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {isEditing ? 'Edit filament details' : t.modal.addSubtitle}
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-500 dark:text-slate-400">
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        {/* Content */}
        <form onSubmit={handleSubmit}>
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
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <div
                      onClick={handleImageUploadClick}
                      className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-white dark:bg-surface-dark px-6 py-12 hover:border-primary dark:hover:border-primary transition-all group-hover:bg-slate-50 dark:group-hover:bg-white/5"
                    >
                      {formData.imageUrl ? (
                        <div className="flex flex-col items-center">
                          <img src={formData.imageUrl} alt="Preview" className="h-32 w-32 object-cover rounded-lg mb-3" />
                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Click to change image</p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveImage();
                            }}
                            className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="h-12 w-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-primary text-2xl">cloud_upload</span>
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 text-sm font-medium text-center">{t.modal.clickToUpload}</p>
                          <p className="text-slate-400 dark:text-slate-500 text-xs text-center mt-1">{t.modal.dragDrop}</p>
                        </>
                      )}
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
                      <button
                        type="button"
                        onClick={handleColorPickerClick}
                        className="flex-1 text-xs font-medium py-1.5 px-3 rounded-md bg-white dark:bg-surface-dark text-slate-900 dark:text-white shadow-sm transition-all flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-sm">colorize</span>
                        {t.modal.pick}
                      </button>
                    </div>
                    <input
                      ref={colorPickerRef}
                      type="color"
                      value={formData.colorHex}
                      onChange={handleColorChange}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleColorPickerClick}
                        className="h-10 w-10 shrink-0 rounded-full border-2 border-slate-300 dark:border-slate-500 shadow-sm hover:scale-110 transition-transform cursor-pointer"
                        style={{ backgroundColor: formData.colorHex }}
                      />
                      <div className="flex-1 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">#</span>
                        <input
                          className="w-full h-10 pl-7 pr-3 rounded-lg bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm font-mono uppercase text-slate-900 dark:text-white"
                          type="text"
                          value={formData.colorHex.replace('#', '')}
                          onChange={(e) => setFormData({ ...formData, colorHex: '#' + e.target.value })}
                          maxLength={7}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#ffffff', '#000000', '#6366f1', '#ec4899'].map(color => (
                        <button
                          key={color}
                          type="button"
                          className="w-6 h-6 rounded-full hover:ring-2 ring-offset-2 ring-offset-white dark:ring-offset-surface-dark transition-all"
                          style={{ backgroundColor: color, border: color === '#ffffff' ? '1px solid #e2e8f0' : 'none' }}
                          onClick={() => setFormData({ ...formData, colorHex: color })}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-span-1 lg:col-span-8 p-6 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-900 dark:text-slate-200">{t.modal.displayName}</label>
                    <input
                      className="h-12 rounded-xl border border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-background-dark/50 px-4 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-slate-400"
                      type="text"
                      placeholder={t.modal.displayNamePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-900 dark:text-slate-200">{t.modal.brand}</label>
                    {!isCustomBrand ? (
                      <div className="relative">
                        <select
                          className="h-12 w-full [&::-webkit-calendar-picker-indicator]:hidden rounded-xl border border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-background-dark/50 px-4 pr-10 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                          style={{
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                            appearance: 'none',
                            backgroundImage: 'none'
                          }}
                          value={formData.brand}
                          onChange={handleBrandChange}
                          required
                        >
                          <option value="">{t.modal.selectBrand}</option>
                          <option value="Prusament">Prusament</option>
                          <option value="eSun">eSun</option>
                          <option value="Polymaker">Polymaker</option>
                          <option value="Overture">Overture</option>
                          <option value="Hatchbox">Hatchbox</option>
                          <option value="Generic">Generic</option>
                          <option value="custom">+ Custom Brand</option>
                        </select>
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                          <span className="material-symbols-outlined text-lg">expand_more</span>
                        </span>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          className="flex-1 h-12 rounded-xl border border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-background-dark/50 px-4 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                          type="text"
                          placeholder="Enter brand name"
                          value={formData.brand}
                          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setIsCustomBrand(false);
                            setFormData({ ...formData, brand: '' });
                          }}
                          className="px-3 h-12 rounded-xl border border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-background-dark/50 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-200 transition-colors"
                          title="Back to brand list"
                        >
                          <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-900 dark:text-slate-200">{t.modal.materialType}</label>
                  <div className="flex flex-wrap gap-3">
                    {['PLA', 'PETG', 'ABS', 'TPU', 'ASA', 'Nylon'].map(m => (
                      <label key={m} className="cursor-pointer">
                        <input
                          type="radio"
                          name="material"
                          className="peer sr-only"
                          checked={formData.material === m}
                          onChange={() => setFormData({ ...formData, material: m })}
                        />
                        <div className="px-5 py-2.5 rounded-lg border border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-background-dark/50 text-slate-600 dark:text-slate-400 text-sm font-medium transition-all hover:bg-slate-100 dark:hover:bg-background-dark peer-checked:bg-primary peer-checked:border-primary peer-checked:text-white peer-checked:shadow-md">
                          {m}
                        </div>
                      </label>
                    ))}
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
                      <input
                        className="h-10 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-background-dark px-3 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-right font-mono"
                        type="number"
                        value={formData.weightTotal}
                        onChange={(e) => setFormData({ ...formData, weightTotal: Number(e.target.value) })}
                        min="0"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-slate-500 dark:text-slate-400">{t.modal.currentWeight}</label>
                      <input
                        className="h-10 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-background-dark px-3 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-right font-mono"
                        type="number"
                        value={formData.weightRemaining}
                        onChange={(e) => setFormData({ ...formData, weightRemaining: Math.min(Number(e.target.value), formData.weightTotal) })}
                        min="0"
                        max={formData.weightTotal}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-500 dark:text-slate-400">{t.dashboard.remaining}</span>
                      <span className={`${remainingPercent < 20 ? 'text-red-500' : 'text-primary'}`}>{remainingPercent}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${remainingPercent < 20 ? 'bg-red-500' : 'bg-primary'} rounded-full shadow-[0_0_10px_rgba(19,127,236,0.5)]`}
                        style={{ width: `${remainingPercent}%` }}
                      ></div>
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
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-5 bg-slate-50 dark:bg-surface-dark border-t border-slate-200 dark:border-border-dark shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            >
              {t.settings.cancel}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-primary text-white font-semibold text-sm shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">save</span>
              {t.settings.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilamentModal;
