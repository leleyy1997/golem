/**
 * JSON File Storage Repository
 * JSON 文件存储实现：使用文件系统存储数据
 */

import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import type { IStorageRepository } from './storage.interface.js';

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');
const FILAMENTS_FILE = path.join(DATA_DIR, 'filaments.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

export class JsonStorageRepository implements IStorageRepository {
  /**
   * 初始化数据目录和文件
   */
  async initialize(): Promise<void> {
    // 确保数据目录存在
    if (!fsSync.existsSync(DATA_DIR)) {
      await fs.mkdir(DATA_DIR, { recursive: true });
    }

    // 如果耗材文件不存在，创建初始文件
    if (!fsSync.existsSync(FILAMENTS_FILE)) {
      const initialData = {
        filaments: [],
        lastUpdated: new Date().toISOString()
      };
      await fs.writeFile(FILAMENTS_FILE, JSON.stringify(initialData, null, 2));
    }
  }

  // ============ Filament Operations ============

  /**
   * 读取所有耗材数据（原始数据，不包含状态计算）
   */
  async readFilaments(): Promise<any[]> {
    try {
      await this.initialize();
      const content = await fs.readFile(FILAMENTS_FILE, 'utf-8');
      const data = JSON.parse(content);
      return data.filaments || [];
    } catch (error) {
      console.error('Error reading filaments:', error);
      return [];
    }
  }

  /**
   * 写入所有耗材数据
   */
  async writeFilaments(filaments: any[]): Promise<boolean> {
    try {
      await this.initialize();
      const data = {
        filaments,
        lastUpdated: new Date().toISOString()
      };
      await fs.writeFile(FILAMENTS_FILE, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error('Error writing filaments:', error);
      return false;
    }
  }

  /**
   * 根据 ID 获取单个耗材
   */
  async getFilamentById(id: string): Promise<any | null> {
    const filaments = await this.readFilaments();
    return filaments.find(f => f.id === id) || null;
  }

  /**
   * 添加新耗材
   */
  async addFilament(filament: any): Promise<any | null> {
    const filaments = await this.readFilaments();
    filaments.push(filament);

    const success = await this.writeFilaments(filaments);
    return success ? filament : null;
  }

  /**
   * 更新耗材
   */
  async updateFilament(id: string, updates: any): Promise<any | null> {
    const filaments = await this.readFilaments();
    const index = filaments.findIndex(f => f.id === id);

    if (index === -1) {
      return null;
    }

    const updatedFilament = {
      ...filaments[index],
      ...updates,
      id // 保持 ID 不变
    };

    filaments[index] = updatedFilament;

    const success = await this.writeFilaments(filaments);
    return success ? updatedFilament : null;
  }

  /**
   * 删除耗材
   */
  async deleteFilament(id: string): Promise<boolean> {
    const filaments = await this.readFilaments();
    const filteredFilaments = filaments.filter(f => f.id !== id);

    if (filteredFilaments.length === filaments.length) {
      return false; // 没有找到要删除的项
    }

    return await this.writeFilaments(filteredFilaments);
  }

  // ============ Settings Operations ============

  /**
   * 读取设置（原始数据，不包含默认值合并）
   */
  async readSettings(): Promise<any> {
    try {
      await this.initialize();

      if (!fsSync.existsSync(SETTINGS_FILE)) {
        return null; // 返回 null 表示文件不存在
      }

      const content = await fs.readFile(SETTINGS_FILE, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      console.error('Error reading settings:', error);
      return null;
    }
  }

  /**
   * 写入设置
   */
  async writeSettings(settings: any): Promise<boolean> {
    try {
      await this.initialize();
      await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2));
      return true;
    } catch (error) {
      console.error('Error writing settings:', error);
      return false;
    }
  }
}

// 导出单例实例
export const jsonStorage = new JsonStorageRepository();
