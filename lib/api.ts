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

interface LoginResponse {
  token: string;
  username: string;
}

// 获取认证 token
function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}

// 获取认证 headers
function getAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

// ============ 认证相关 API ============

// 登录
export async function login(password: string): Promise<LoginResponse | null> {
  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
    return null;
  } catch (error) {
    console.error('Error logging in:', error);
    return null;
  }
}

// 登出
export function logout(): void {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('username');
}

// 检查是否已登录
export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

// 获取所有耗材
export async function fetchFilaments(): Promise<Filament[]> {
  try {
    const response = await fetch(`${API_BASE}/filaments`, {
      headers: getAuthHeaders(),
    });
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
    const response = await fetch(`${API_BASE}/filaments/${id}`, {
      headers: getAuthHeaders(),
    });
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
      headers: getAuthHeaders(),
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
      headers: getAuthHeaders(),
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
      headers: getAuthHeaders(),
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
    const response = await fetch(`${API_BASE}/settings`, {
      headers: getAuthHeaders(),
    });
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
      headers: getAuthHeaders(),
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
