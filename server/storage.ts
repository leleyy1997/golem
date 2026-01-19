import fs from 'fs';
import path from 'path';

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');
const FILAMENTS_FILE = path.join(DATA_DIR, 'filaments.json');

// 确保数据目录存在
export function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // 如果文件不存在，创建初始文件
  if (!fs.existsSync(FILAMENTS_FILE)) {
    const initialData = {
      filaments: []
    };
    fs.writeFileSync(FILAMENTS_FILE, JSON.stringify(initialData, null, 2));
  }
}

// 读取所有耗材数据
export function readFilaments(): any[] {
  try {
    ensureDataDir();
    const content = fs.readFileSync(FILAMENTS_FILE, 'utf-8');
    const data = JSON.parse(content);
    return data.filaments || [];
  } catch (error) {
    console.error('Error reading filaments:', error);
    return [];
  }
}

// 写入所有耗材数据
export function writeFilaments(filaments: any[]): boolean {
  try {
    ensureDataDir();
    const data = {
      filaments,
      lastUpdated: new Date().toISOString()
    };
    fs.writeFileSync(FILAMENTS_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing filaments:', error);
    return false;
  }
}

// 获取单个耗材
export function getFilamentById(id: string): any | null {
  const filaments = readFilaments();
  return filaments.find(f => f.id === id) || null;
}

// 添加耗材
export function addFilament(filament: any): any | null {
  const filaments = readFilaments();
  const newFilament = {
    ...filament,
    id: filament.id || Date.now().toString(),
    status: filament.weightRemaining / filament.weightTotal < 0.2 ? 'LowStock' : 'Adequate'
  };
  filaments.push(newFilament);

  if (writeFilaments(filaments)) {
    return newFilament;
  }
  return null;
}

// 更新耗材
export function updateFilament(id: string, updates: any): any | null {
  const filaments = readFilaments();
  const index = filaments.findIndex(f => f.id === id);

  if (index === -1) {
    return null;
  }

  filaments[index] = {
    ...filaments[index],
    ...updates,
    id // 保持 ID 不变
  };

  if (writeFilaments(filaments)) {
    return filaments[index];
  }
  return null;
}

// 删除耗材
export function deleteFilament(id: string): boolean {
  const filaments = readFilaments();
  const filteredFilaments = filaments.filter(f => f.id !== id);

  if (filteredFilaments.length === filaments.length) {
    return false; // 没有找到要删除的项
  }

  return writeFilaments(filteredFilaments);
}
