import { NativeModules } from 'react-native';
import type { InstalledApp, PermissionStatus } from '@/types';

interface NativeAppInterceptorInterface {
  // 权限管理
  requestAccessibilityPermission(): Promise<boolean>;
  checkAccessibilityPermission(): Promise<boolean>;
  
  // 监控控制
  startInterception(): Promise<boolean>;
  stopInterception(): void;
  
  // 应用信息
  getInstalledApps(): Promise<InstalledApp[]>;
  
  // 配置管理
  setMonitoredApps(packageNames: string[]): Promise<void>;
  getMonitoredApps(): Promise<string[]>;
}

const { NativeAppInterceptor } = NativeModules;

export default NativeAppInterceptor as NativeAppInterceptorInterface;