// Core data types for the mindful app launcher

// 已安装应用信息
export interface InstalledApp {
  packageName: string;
  appName: string;
  icon: string; // base64 encoded
  isSystemApp: boolean;
}

// 监控应用配置
export interface MonitoredApp {
  packageName: string;
  appName: string;
  icon: string;
  isEnabled: boolean;
  customPrompt?: string;
  skipConditions?: SkipCondition[];
}

// 使用目的记录
export interface PurposeRecord {
  id: string;
  packageName: string;
  appName: string;
  purpose: string;
  timestamp: number;
  duration?: number; // 实际使用时长（可选功能）
}

// 跳过条件（高级功能）
export interface SkipCondition {
  type: 'time' | 'frequency' | 'location';
  parameters: Record<string, any>;
  isEnabled: boolean;
}

// 应用配置
export interface AppConfig {
  isFirstLaunch: boolean;
  advancedMode: boolean;
  defaultPromptText: string;
  autoLaunchDelay: number; // 秒
  enableUsageTracking: boolean;
}

// 权限状态
export interface PermissionStatus {
  accessibility: boolean;
  usageStats: boolean;
  overlay: boolean;
}

// 历史记录过滤器
export interface HistoryFilter {
  appPackage?: string;
  startDate?: number;
  endDate?: number;
  searchQuery?: string;
}

// 错误类型
export enum PermissionError {
  ACCESSIBILITY_DENIED = 'accessibility_denied',
  USAGE_STATS_DENIED = 'usage_stats_denied',
  OVERLAY_DENIED = 'overlay_denied'
}

// 应用信息
export interface AppInfo {
  packageName: string;
  appName: string;
  icon: string;
}