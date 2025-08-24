export class AppInfoItem {
  private appIconPath: string;
  private appName: string;

  constructor(appIconPath: string, appName: string) {
    this.appIconPath = appIconPath;
    this.appName = appName;
  }

  public getAppIconPath(): string {
    return this.appIconPath;
  }

  public getAppName(): string {
    return this.appName;
  }

  toJSON() {
    return {
      appIconPath: this.appIconPath,
      appName: this.appName,
    };
  }

  static fromObject(obj: any): AppInfoItem {
    return new AppInfoItem(obj.appIconPath, obj.appName);
  }
}