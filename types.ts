export type Language = 'en' | 'zh' | 'es' | 'de';

export enum FilamentStatus {
  Adequate = 'Adequate',
  LowStock = 'LowStock',
  Critical = 'Critical',
}

export interface Filament {
  id: string;
  brand: string;
  name: string;
  material: string;
  colorName: string;
  colorHex: string;
  weightTotal: number;
  weightRemaining: number;
  imageUrl: string;
  status: FilamentStatus;
}

export interface InventoryAlerts {
  enabled: boolean;
  threshold: number; // in grams
}

export interface Settings {
  language: Language;
  autoDetect: boolean;
  inventoryAlerts: InventoryAlerts;
}

export interface Translation {
  menu: {
    title: string;
    dashboard: string;
    inventory: string;
    prints: string;
    settings: string;
    logout: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    totalWeight: string;
    activeSpools: string;
    lowStock: string;
    addNew: string;
    allFilaments: string;
    filterMaterial: string;
    filterBrand: string;
    sort: string;
    search: string;
    remaining: string;
  };
  inventory: {
    title: string;
    subtitle: string;
    export: string;
    table: {
      spool: string;
      nameBrand: string;
      material: string;
      color: string;
      weight: string;
      status: string;
      actions: string;
    };
    status: {
      Adequate: string;
      LowStock: string;
      Critical: string;
    };
  };
  settings: {
    title: string;
    subtitle: string;
    general: string;
    appearance: string;
    notifications: string;
    language: string;
    systemPrefs: string;
    systemPrefsDesc: string;
    displayLang: string;
    displayLangDesc: string;
    autoDetect: string;
    autoDetectDesc: string;
    inventoryAlerts: string;
    inventoryAlertsDesc: string;
    enableAlerts: string;
    threshold: string;
    thresholdDesc: string;
    save: string;
    cancel: string;
  };
  modal: {
    addTitle: string;
    addSubtitle: string;
    spoolPhoto: string;
    clickToUpload: string;
    dragDrop: string;
    filamentColor: string;
    hex: string;
    palette: string;
    pick: string;
    displayName: string;
    displayNamePlaceholder: string;
    brand: string;
    selectBrand: string;
    materialType: string;
    weightDetails: string;
    standardSpool: string;
    initialWeight: string;
    currentWeight: string;
    usageNotes: string;
    usageNotesPlaceholder: string;
  }
}