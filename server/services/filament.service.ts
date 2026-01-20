/**
 * Filament Service Layer
 * 业务逻辑层：处理耗材相关的业务规则和计算
 */

import type { Settings } from '../../types';

/**
 * 根据剩余重量和总重量计算耗材状态
 */
export function calculateFilamentStatus(
  remaining: number,
  total: number,
  settings: Settings
): string {
  const threshold = settings.inventoryAlerts.enabled
    ? settings.inventoryAlerts.threshold
    : 200;

  return remaining <= threshold ? 'LowStock' : 'Adequate';
}

/**
 * 为耗材数组批量计算状态
 */
export function applyStatusToFilaments(filaments: any[], settings: Settings): any[] {
  return filaments.map(filament => ({
    ...filament,
    status: calculateFilamentStatus(
      filament.weightRemaining,
      filament.weightTotal,
      settings
    )
  }));
}

/**
 * 生成新的耗材 ID
 */
export function generateFilamentId(): string {
  return Date.now().toString();
}

/**
 * 验证耗材数据
 */
export function validateFilament(filament: any): { valid: boolean; error?: string } {
  if (!filament.brand || typeof filament.brand !== 'string') {
    return { valid: false, error: 'Brand is required' };
  }

  if (!filament.name || typeof filament.name !== 'string') {
    return { valid: false, error: 'Name is required' };
  }

  if (!filament.material || typeof filament.material !== 'string') {
    return { valid: false, error: 'Material is required' };
  }

  if (typeof filament.weightTotal !== 'number' || filament.weightTotal <= 0) {
    return { valid: false, error: 'Weight total must be a positive number' };
  }

  if (typeof filament.weightRemaining !== 'number' || filament.weightRemaining < 0) {
    return { valid: false, error: 'Weight remaining must be a non-negative number' };
  }

  if (filament.weightRemaining > filament.weightTotal) {
    return { valid: false, error: 'Weight remaining cannot exceed total weight' };
  }

  return { valid: true };
}
