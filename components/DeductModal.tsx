import React, { useState, useEffect } from 'react';
import { useI18n } from '../i18n';
import { Filament } from '../types';

interface DeductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeduct: (amount: number) => void;
  filament?: Filament;
}

const DeductModal: React.FC<DeductModalProps> = ({ isOpen, onClose, onDeduct, filament }) => {
  const { t } = useI18n();
  const [amount, setAmount] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setAmount('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const deductAmount = parseFloat(amount);
    if (isNaN(deductAmount) || deductAmount <= 0) {
      alert(t.deduct.deductAmountPlaceholder);
      return;
    }
    if (filament && deductAmount > filament.weightRemaining) {
      alert('Deduction amount exceeds remaining weight');
      return;
    }
    onDeduct(deductAmount);
    onClose();
  };

  const quickAmounts = [10, 50, 100, 200];

  if (!isOpen || !filament) return null;

  const remainingAfterDeduction = amount ? Math.max(0, filament.weightRemaining - parseFloat(amount)) : filament.weightRemaining;
  const remainingPercent = Math.round((remainingAfterDeduction / filament.weightTotal) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white dark:bg-surface-dark rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-border-dark">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-border-dark">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t.deduct.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{filament.name}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-500">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            {/* Current Weight Display */}
            <div className="mb-6 p-4 bg-slate-50 dark:bg-background-dark/50 rounded-xl border border-slate-200 dark:border-border-dark">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">{t.deduct.currentWeight}</span>
                <span className="text-lg font-bold text-slate-900 dark:text-white">{filament.weightRemaining}g</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">{t.deduct.afterDeduction}</span>
                <span className={`text-lg font-bold ${remainingAfterDeduction < 200 ? 'text-red-500' : 'text-emerald-500'}`}>
                  {remainingAfterDeduction}g
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">{t.deduct.remaining}</span>
                <span className={`text-sm font-bold ${remainingPercent < 20 ? 'text-red-500' : 'text-primary'}`}>
                  {remainingPercent}%
                </span>
              </div>
              <div className="mt-3 h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${remainingPercent < 20 ? 'bg-red-500' : 'bg-emerald-500'} rounded-full transition-all`}
                  style={{ width: `${remainingPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Quick Amount Buttons */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">{t.deduct.quickSelect}</label>
              <div className="grid grid-cols-4 gap-2">
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    type="button"
                    onClick={() => setAmount(quickAmount.toString())}
                    className="py-2 px-3 rounded-lg bg-slate-100 dark:bg-background-dark border border-slate-200 dark:border-border-dark text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    {quickAmount}g
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Input */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">{t.deduct.deductAmount}</label>
              <input
                className="w-full h-12 rounded-xl border border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-background-dark/50 px-4 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={t.deduct.deductAmountPlaceholder}
                min="0"
                max={filament.weightRemaining}
                step="1"
                required
                autoFocus
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 dark:bg-surface-dark border-t border-slate-200 dark:border-border-dark">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            >
              {t.deduct.cancel}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm shadow-lg shadow-amber-500/20 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">remove</span>
              {t.deduct.confirm}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeductModal;
