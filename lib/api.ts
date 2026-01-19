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
