/**
 * Storage Layer (Refactored)
 * 存储层：整合 Repository 和 Service，提供统一的数据访问接口
 *
 * 这一层负责：
 * 1. 调用 Repository 进行数据持久化
 * 2. 调用 Service 进行业务逻辑处理
 * 3. 为上层（路由层）提供简洁的 API
 */

import { jsonStorage } from './repositories/json-storage.repository.js';
import type { IStorageRepository } from './repositories/storage.interface.js';
import {
  calculateFilamentStatus,
  applyStatusToFilaments,
  generateFilamentId,
  validateFilament
} from './services/filament.service.js';
import {
  DEFAULT_SETTINGS,
  mergeWithDefaults,
  validateSettings
} from './services/settings.service.js';

// 当前使用的存储实现（可以轻松切换到数据库实现）
const storage: IStorageRepository = jsonStorage;

// ============ Initialization ============

/**
 * 初始化存储
 */
export async function initialize(): Promise<void> {
  await storage.initialize();
}

// ============ Filament Operations ============

/**
 * 读取所有耗材数据（包含状态计算）
 */
export async function readFilaments(): Promise<any[]> {
  try {
    const filaments = await storage.readFilaments();
    const settings = await readSettings();

    // 应用业务逻辑：计算状态
    return applyStatusToFilaments(filaments, settings);
  } catch (error) {
    console.error('Error in readFilaments:', error);
    return [];
  }
}

/**
 * 根据 ID 获取单个耗材
 */
export async function getFilamentById(id: string): Promise<any | null> {
  try {
    const filament = await storage.getFilamentById(id);
    if (!filament) {
      return null;
    }

    const settings = await readSettings();

    // 应用业务逻辑：计算状态
    return {
      ...filament,
      status: calculateFilamentStatus(
        filament.weightRemaining,
        filament.weightTotal,
        settings
      )
    };
  } catch (error) {
    console.error('Error in getFilamentById:', error);
    return null;
  }
}

/**
 * 添加新耗材
 */
export async function addFilament(filament: any): Promise<any | null> {
  try {
    // 验证数据
    const validation = validateFilament(filament);
    if (!validation.valid) {
      console.error('Validation error:', validation.error);
      return null;
    }

    const settings = await readSettings();

    // 准备新耗材数据
    const newFilament = {
      ...filament,
      id: filament.id || generateFilamentId(),
      status: calculateFilamentStatus(
        filament.weightRemaining,
        filament.weightTotal,
        settings
      )
    };

    return await storage.addFilament(newFilament);
  } catch (error) {
    console.error('Error in addFilament:', error);
    return null;
  }
}

/**
 * 更新耗材
 */
export async function updateFilament(id: string, updates: any): Promise<any | null> {
  try {
    // 如果更新了重量，验证数据
    if (updates.weightTotal !== undefined || updates.weightRemaining !== undefined) {
      const existing = await storage.getFilamentById(id);
      if (!existing) {
        return null;
      }

      const updatedData = { ...existing, ...updates };
      const validation = validateFilament(updatedData);
      if (!validation.valid) {
        console.error('Validation error:', validation.error);
        return null;
      }
    }

    const settings = await readSettings();

    // 获取更新后的数据以计算状态
    const result = await storage.updateFilament(id, updates);
    if (!result) {
      return null;
    }

    // 重新计算状态
    return {
      ...result,
      status: calculateFilamentStatus(
        result.weightRemaining,
        result.weightTotal,
        settings
      )
    };
  } catch (error) {
    console.error('Error in updateFilament:', error);
    return null;
  }
}

/**
 * 删除耗材
 */
export async function deleteFilament(id: string): Promise<boolean> {
  try {
    return await storage.deleteFilament(id);
  } catch (error) {
    console.error('Error in deleteFilament:', error);
    return false;
  }
}

// ============ Settings Operations ============

/**
 * 读取设置（包含默认值合并）
 */
export async function readSettings(): Promise<any> {
  try {
    const savedSettings = await storage.readSettings();

    // 如果没有保存的设置，返回默认设置
    if (!savedSettings) {
      return DEFAULT_SETTINGS;
    }

    // 合并默认设置
    return mergeWithDefaults(savedSettings);
  } catch (error) {
    console.error('Error in readSettings:', error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * 写入设置
 */
export async function writeSettings(settings: any): Promise<boolean> {
  try {
    // 验证设置
    const validation = validateSettings(settings);
    if (!validation.valid) {
      console.error('Settings validation error:', validation.error);
      return false;
    }

    return await storage.writeSettings(settings);
  } catch (error) {
    console.error('Error in writeSettings:', error);
    return false;
  }
}

// ============ 向后兼容的同步函数（临时保留，逐步迁移） ============

/**
 * @deprecated 使用 initialize() 代替
 */
export function ensureDataDir() {
  // 同步版本，用于向后兼容
  initialize().catch(err => console.error('Error initializing storage:', err));
}
