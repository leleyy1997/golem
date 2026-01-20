/**
 * Settings Service Layer
 * 业务逻辑层：处理设置相关的业务规则
 */

import type { Settings } from '../../types';

/**
 * 默认设置配置
 */
export const DEFAULT_SETTINGS: Settings = {
  language: 'en',
  autoDetect: false,
  inventoryAlerts: {
    enabled: true,
    threshold: 200
  }
};

/**
 * 合并设置，确保所有必需字段存在
 */
export function mergeWithDefaults(savedSettings: Partial<Settings>): Settings {
  return {
    ...DEFAULT_SETTINGS,
    ...savedSettings,
    inventoryAlerts: {
      ...DEFAULT_SETTINGS.inventoryAlerts,
      ...(savedSettings.inventoryAlerts || {})
    }
  };
}

/**
 * 验证设置数据
 */
export function validateSettings(settings: any): { valid: boolean; error?: string } {
  if (!settings || typeof settings !== 'object') {
    return { valid: false, error: 'Settings must be an object' };
  }

  if (settings.language && !['en', 'zh'].includes(settings.language)) {
    return { valid: false, error: 'Language must be "en" or "zh"' };
  }

  if (settings.autoDetect !== undefined && typeof settings.autoDetect !== 'boolean') {
    return { valid: false, error: 'autoDetect must be a boolean' };
  }

  if (settings.inventoryAlerts) {
    const { enabled, threshold } = settings.inventoryAlerts;

    if (enabled !== undefined && typeof enabled !== 'boolean') {
      return { valid: false, error: 'inventoryAlerts.enabled must be a boolean' };
    }

    if (threshold !== undefined) {
      if (typeof threshold !== 'number' || threshold < 0) {
        return { valid: false, error: 'inventoryAlerts.threshold must be a non-negative number' };
      }
    }
  }

  return { valid: true };
}
