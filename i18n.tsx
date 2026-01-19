import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translation } from './types';

const translations: Record<Language, Translation> = {
  en: {
    menu: {
      title: "Menu",
      dashboard: "Dashboard",
      inventory: "Inventory",
      prints: "Prints",
      settings: "Settings",
      logout: "Log Out",
    },
    dashboard: {
      title: "My Spools",
      subtitle: "Manage and track your 3D printing filament inventory",
      totalWeight: "Total Weight",
      activeSpools: "Active Spools",
      lowStock: "Low Stock",
      addNew: "Add New Filament",
      allFilaments: "All Filaments",
      filterMaterial: "Material",
      filterBrand: "Brand",
      sort: "Sort by: Newest",
      search: "Search filaments...",
      remaining: "Remaining",
    },
    inventory: {
      title: "Inventory Management",
      subtitle: "Track filament stock, colors, and material usage.",
      export: "Export",
      table: {
        spool: "Spool",
        nameBrand: "Name / Brand",
        material: "Material",
        color: "Color",
        weight: "Weight",
        status: "Status",
        actions: "Actions",
      },
      status: {
        Adequate: "Adequate",
        LowStock: "Low Stock",
        Critical: "Critical"
      }
    },
    settings: {
      title: "Settings",
      subtitle: "Manage system preferences",
      general: "General",
      appearance: "Appearance",
      notifications: "Notifications",
      language: "Language",
      systemPrefs: "System Preferences",
      systemPrefsDesc: "Manage display language, region, and inventory alert settings.",
      displayLang: "Display Language",
      displayLangDesc: "Choose the language used throughout the inventory interface.",
      autoDetect: "Auto-detect language",
      autoDetectDesc: "Set language based on browser settings.",
      inventoryAlerts: "Inventory Alerts",
      inventoryAlertsDesc: "Configure global low stock warnings.",
      enableAlerts: "Enable Low Stock Alerts",
      threshold: "Global Threshold (g)",
      thresholdDesc: "When a filament's remaining weight falls below this value, it will be highlighted in the dashboard.",
      save: "Save Changes",
      cancel: "Cancel",
    },
    modal: {
      addTitle: "Add New Filament",
      addSubtitle: "Enter details to track inventory and usage.",
      spoolPhoto: "Spool Photo",
      clickToUpload: "Click to upload",
      dragDrop: "or drag and drop SVG, PNG, JPG",
      filamentColor: "Filament Color",
      hex: "Hex Code",
      palette: "Palette",
      pick: "Pick",
      displayName: "Display Name",
      displayNamePlaceholder: "e.g., Galaxy Black Prusament",
      brand: "Brand",
      selectBrand: "Select Brand",
      materialType: "Material Type",
      weightDetails: "Weight Details",
      standardSpool: "Standard Spool",
      initialWeight: "Initial Weight (g)",
      currentWeight: "Current Weight (g)",
      usageNotes: "Usage Notes",
      usageNotesPlaceholder: "e.g. Prints best at 215°C, requires glue stick...",
    }
  },
  zh: {
    menu: {
      title: "菜单",
      dashboard: "仪表盘",
      inventory: "库存管理",
      prints: "打印记录",
      settings: "设置",
      logout: "退出登录",
    },
    dashboard: {
      title: "我的耗材",
      subtitle: "管理和跟踪您的 3D 打印耗材库存",
      totalWeight: "总重量",
      activeSpools: "活跃耗材",
      lowStock: "库存不足",
      addNew: "添加新耗材",
      allFilaments: "所有耗材",
      filterMaterial: "材质",
      filterBrand: "品牌",
      sort: "排序：最新",
      search: "搜索耗材...",
      remaining: "剩余",
    },
    inventory: {
      title: "库存管理",
      subtitle: "跟踪耗材库存、颜色和材料使用情况。",
      export: "导出",
      table: {
        spool: "图片",
        nameBrand: "名称 / 品牌",
        material: "材质",
        color: "颜色",
        weight: "重量",
        status: "状态",
        actions: "操作",
      },
      status: {
        Adequate: "充足",
        LowStock: "库存不足",
        Critical: "严重不足"
      }
    },
    settings: {
      title: "设置",
      subtitle: "管理系统偏好",
      general: "常规",
      appearance: "外观",
      notifications: "通知",
      language: "语言",
      systemPrefs: "系统偏好设置",
      systemPrefsDesc: "管理显示语言、区域和库存警报设置。",
      displayLang: "显示语言",
      displayLangDesc: "选择整个库存界面使用的语言。",
      autoDetect: "自动检测语言",
      autoDetectDesc: "根据浏览器设置设置语言。",
      inventoryAlerts: "库存警报",
      inventoryAlertsDesc: "配置全局低库存警告。",
      enableAlerts: "启用低库存警报",
      threshold: "全局阈值 (g)",
      thresholdDesc: "当耗材剩余重量低于此值时，将在仪表盘中高亮显示。",
      save: "保存更改",
      cancel: "取消",
    },
    modal: {
      addTitle: "添加新耗材",
      addSubtitle: "输入详细信息以跟踪库存和使用情况。",
      spoolPhoto: "耗材照片",
      clickToUpload: "点击上传",
      dragDrop: "或拖放 SVG, PNG, JPG",
      filamentColor: "耗材颜色",
      hex: "十六进制",
      palette: "调色盘",
      pick: "吸色",
      displayName: "显示名称",
      displayNamePlaceholder: "例如：Galaxy Black Prusament",
      brand: "品牌",
      selectBrand: "选择品牌",
      materialType: "材质类型",
      weightDetails: "重量详情",
      standardSpool: "标准线盘",
      initialWeight: "初始重量 (g)",
      currentWeight: "当前重量 (g)",
      usageNotes: "使用备注",
      usageNotesPlaceholder: "例如：最佳打印温度 215°C，纹理板需使用胶棒。",
    }
  },
  es: {
     menu: {
      title: "Menú",
      dashboard: "Tablero",
      inventory: "Inventario",
      prints: "Impresiones",
      settings: "Ajustes",
      logout: "Cerrar sesión",
    },
    dashboard: {
      title: "Mis Carretes",
      subtitle: "Administra y rastrea tu inventario de filamentos 3D",
      totalWeight: "Peso Total",
      activeSpools: "Carretes Activos",
      lowStock: "Stock Bajo",
      addNew: "Agregar Nuevo",
      allFilaments: "Todos los Filamentos",
      filterMaterial: "Material",
      filterBrand: "Marca",
      sort: "Ordenar: Reciente",
      search: "Buscar filamentos...",
      remaining: "Restante",
    },
    inventory: {
      title: "Gestión de Inventario",
      subtitle: "Rastrea stock de filamentos, colores y uso.",
      export: "Exportar",
      table: {
        spool: "Carrete",
        nameBrand: "Nombre / Marca",
        material: "Material",
        color: "Color",
        weight: "Peso",
        status: "Estado",
        actions: "Acciones",
      },
      status: {
        Adequate: "Adecuado",
        LowStock: "Bajo Stock",
        Critical: "Crítico"
      }
    },
    settings: {
      title: "Ajustes",
      subtitle: "Preferencias del sistema",
      general: "General",
      appearance: "Apariencia",
      notifications: "Notificaciones",
      language: "Idioma",
      systemPrefs: "Preferencias del Sistema",
      systemPrefsDesc: "Administra el idioma y las alertas.",
      displayLang: "Idioma de Pantalla",
      displayLangDesc: "Elige el idioma de la interfaz.",
      autoDetect: "Auto-detectar idioma",
      autoDetectDesc: "Usar configuración del navegador.",
      inventoryAlerts: "Alertas de Inventario",
      inventoryAlertsDesc: "Configurar advertencias de stock bajo.",
      enableAlerts: "Habilitar Alertas",
      threshold: "Umbral Global (g)",
      thresholdDesc: "Alerta cuando el peso cae por debajo de este valor.",
      save: "Guardar Cambios",
      cancel: "Cancelar",
    },
    modal: {
      addTitle: "Agregar Nuevo Filamento",
      addSubtitle: "Ingrese detalles para rastrear inventario.",
      spoolPhoto: "Foto del Carrete",
      clickToUpload: "Clic para subir",
      dragDrop: "o arrastrar SVG, PNG, JPG",
      filamentColor: "Color del Filamento",
      hex: "Código Hex",
      palette: "Paleta",
      pick: "Selector",
      displayName: "Nombre",
      displayNamePlaceholder: "ej., Galaxy Black Prusament",
      brand: "Marca",
      selectBrand: "Seleccionar Marca",
      materialType: "Tipo Material",
      weightDetails: "Detalles Peso",
      standardSpool: "Carrete Estándar",
      initialWeight: "Peso Inicial (g)",
      currentWeight: "Peso Actual (g)",
      usageNotes: "Notas",
      usageNotesPlaceholder: "ej. Imprime mejor a 215°C...",
    }
  },
  de: {
    menu: {
      title: "Menü",
      dashboard: "Dashboard",
      inventory: "Inventar",
      prints: "Drucke",
      settings: "Einstellungen",
      logout: "Abmelden",
    },
    dashboard: {
      title: "Meine Spulen",
      subtitle: "Verwalten Sie Ihr 3D-Druck-Filament-Inventar",
      totalWeight: "Gesamtgewicht",
      activeSpools: "Aktive Spulen",
      lowStock: "Geringer Bestand",
      addNew: "Neues Filament",
      allFilaments: "Alle Filamente",
      filterMaterial: "Material",
      filterBrand: "Marke",
      sort: "Sort.: Neueste",
      search: "Filamente suchen...",
      remaining: "Verbleibend",
    },
    inventory: {
      title: "Inventarverwaltung",
      subtitle: "Verfolgen Sie Filamentbestand, Farben und Materialverbrauch.",
      export: "Exportieren",
      table: {
        spool: "Spule",
        nameBrand: "Name / Marke",
        material: "Material",
        color: "Farbe",
        weight: "Gewicht",
        status: "Status",
        actions: "Aktionen",
      },
      status: {
        Adequate: "Ausreichend",
        LowStock: "Geringer Bestand",
        Critical: "Kritisch"
      }
    },
    settings: {
      title: "Einstellungen",
      subtitle: "Systemeinstellungen verwalten",
      general: "Allgemein",
      appearance: "Aussehen",
      notifications: "Benachrichtigungen",
      language: "Sprache",
      systemPrefs: "Systemeinstellungen",
      systemPrefsDesc: "Sprache, Region und Inventarwarnungen verwalten.",
      displayLang: "Anzeigesprache",
      displayLangDesc: "Wählen Sie die Sprache der Benutzeroberfläche.",
      autoDetect: "Sprache automatisch erkennen",
      autoDetectDesc: "Basierend auf Browsereinstellungen.",
      inventoryAlerts: "Inventarwarnungen",
      inventoryAlertsDesc: "Globale Warnungen für geringen Bestand konfigurieren.",
      enableAlerts: "Warnungen aktivieren",
      threshold: "Globaler Schwellenwert (g)",
      thresholdDesc: "Wenn das Gewicht unter diesen Wert fällt, wird es hervorgehoben.",
      save: "Änderungen speichern",
      cancel: "Abbrechen",
    },
    modal: {
      addTitle: "Neues Filament hinzufügen",
      addSubtitle: "Details zur Bestandsverfolgung eingeben.",
      spoolPhoto: "Spulenfoto",
      clickToUpload: "Zum Hochladen klicken",
      dragDrop: "oder SVG, PNG, JPG ziehen",
      filamentColor: "Filamentfarbe",
      hex: "Hex-Code",
      palette: "Palette",
      pick: "Wählen",
      displayName: "Anzeigename",
      displayNamePlaceholder: "z.B., Galaxy Black Prusament",
      brand: "Marke",
      selectBrand: "Marke wählen",
      materialType: "Materialtyp",
      weightDetails: "Gewichtsdetails",
      standardSpool: "Standardspule",
      initialWeight: "Anfangsgewicht (g)",
      currentWeight: "Aktuelles Gewicht (g)",
      usageNotes: "Nutzungshinweise",
      usageNotesPlaceholder: "z.B. Druckt am besten bei 215°C...",
    }
  }
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
  autoDetect: boolean;
  setAutoDetect: (val: boolean) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children?: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [autoDetect, setAutoDetect] = useState(true);

  useEffect(() => {
    if (autoDetect) {
      const browserLang = navigator.language.split('-')[0];
      if (['en', 'zh', 'es', 'de'].includes(browserLang)) {
        setLanguage(browserLang as Language);
      } else {
        setLanguage('en');
      }
    }
  }, [autoDetect]);

  const value = {
    language,
    setLanguage,
    t: translations[language],
    autoDetect,
    setAutoDetect
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within an I18nProvider");
  return context;
};
