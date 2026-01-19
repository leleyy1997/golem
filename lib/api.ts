const API_BASE = '/api';

interface Filament {
  id: string;
  brand: string;
  name: string;
  material: string;
  colorName: string;
  colorHex: string;
  weightTotal: number;
  weightRemaining: number;
  imageUrl: string;
  status: string;
}

interface Settings {
  language: string;
  autoDetect: boolean;
  inventoryAlerts: {
    enabled: boolean;
    threshold: number;
  };
}

// 获取所有耗材
export async function fetchFilaments(): Promise<Filament[]> {
  try {
    const response = await fetch(`${API_BASE}/filaments`);
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching filaments:', error);
    return [];
  }
}

// 获取单个耗材
export async function fetchFilament(id: string): Promise<Filament | null> {
  try {
    const response = await fetch(`${API_BASE}/filaments/${id}`);
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching filament:', error);
    return null;
  }
}

// 创建耗材
export async function createFilament(filament: Omit<Filament, 'id' | 'status'>): Promise<Filament | null> {
  try {
    const response = await fetch(`${API_BASE}/filaments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filament),
    });
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
    return null;
  } catch (error) {
    console.error('Error creating filament:', error);
    return null;
  }
}

// 更新耗材
export async function updateFilament(id: string, updates: Partial<Filament>): Promise<Filament | null> {
  try {
    const response = await fetch(`${API_BASE}/filaments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
    return null;
  } catch (error) {
    console.error('Error updating filament:', error);
    return null;
  }
}

// 删除耗材
export async function deleteFilament(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/filaments/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error deleting filament:', error);
    return false;
  }
}

// ============ 设置相关 API ============

// 获取设置
export async function fetchSettings(): Promise<Settings | null> {
  try {
    const response = await fetch(`${API_BASE}/settings`);
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return null;
  }
}

// 保存设置
export async function saveSettings(settings: Settings): Promise<Settings | null> {
  try {
    const response = await fetch(`${API_BASE}/settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });

    if (!response.ok) {
      console.error('Save settings failed:', response.status, response.statusText);
      const text = await response.text();
      console.error('Response:', text);
      return null;
    }

    const result = await response.json();
    if (result.success) {
      return result.data;
    }
    return null;
  } catch (error) {
    console.error('Error saving settings:', error);
    return null;
  }
}
