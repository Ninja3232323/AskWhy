# Ask Why - Mindful App Launcher

An open-source Android app that helps users clarify their purpose before opening specific apps, reducing mindless scrolling behavior.

## 项目结构

```
src/
├── components/          # 可复用UI组件
│   ├── common/         # 通用组件 (Button, Input, List等)
│   └── ui/             # 应用特定UI组件
├── screens/            # 应用屏幕
│   ├── HomeScreen/     # 主界面
│   ├── AppConfigScreen/ # 应用配置界面
│   ├── HistoryScreen/  # 历史记录界面
│   ├── SettingsScreen/ # 设置界面
│   └── PurposeInputOverlay/ # 目的输入覆盖层
├── services/           # 业务逻辑服务
│   ├── database/       # SQLite数据库服务
│   ├── storage/        # AsyncStorage工具
│   └── managers/       # 业务管理器
├── native/             # 原生模块桥接
│   └── NativeAppInterceptor/ # Android原生模块接口
├── types/              # TypeScript类型定义
├── utils/              # 工具函数
└── App.tsx            # 应用入口组件
```

## 技术栈

- **框架**: React Native 0.72+
- **语言**: TypeScript
- **状态管理**: React Context + useReducer
- **导航**: React Navigation 6
- **本地存储**: SQLite + AsyncStorage
- **UI组件**: React Native Elements + 自定义组件
- **原生开发**: Java/Kotlin (Android)

## Development Environment Setup for Arch Linux

### Complete Development Stack

Here's everything you need to develop this React Native app on Arch Linux:

#### 1. Core Development Tools

```bash
# Update system first
sudo pacman -Syu

# Essential development tools
sudo pacman -S base-devel git curl wget unzip

# Node.js and package managers
sudo pacman -S nodejs npm yarn

# Java Development Kit (choose one)
sudo pacman -S jdk11-openjdk  # Recommended for React Native
# or
sudo pacman -S jdk17-openjdk

# Set default JDK
sudo archlinux-java set java-11-openjdk
```

#### 2. Android Development Environment

**Option A: Full Android Studio (Recommended)**
```bash
# Install from AUR
yay -S android-studio

# Or using official package
sudo pacman -S android-studio
```

**Option B: Minimal SDK Setup**
```bash
# Install Android SDK tools
yay -S android-sdk android-sdk-platform-tools android-sdk-build-tools
yay -S android-sdk-cmdline-tools-latest

# Set permissions
sudo groupadd android-sdk
sudo gpasswd -a $USER android-sdk
sudo setfacl -R -m g:android-sdk:rwx /opt/android-sdk
sudo setfacl -d -m g:android-sdk:rwX /opt/android-sdk
```

#### 3. Emulator and Virtualization

```bash
# For better emulator performance
sudo pacman -S qemu-desktop libvirt virt-manager
sudo systemctl enable --now libvirtd
sudo usermod -a -G libvirt $USER

# Intel HAXM alternative for AMD/Intel
yay -S intel-haxm  # Intel processors
# or use KVM (works on both AMD/Intel)
```

#### 4. Development Tools and Editors

```bash
# Code editors (choose your preference)
sudo pacman -S code  # VS Code
# or
yay -S visual-studio-code-bin

# Alternative editors
sudo pacman -S vim neovim
yay -S sublime-text-4

# Git configuration
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

#### 5. React Native CLI and Tools

```bash
# Install React Native CLI globally
npm install -g @react-native-community/cli

# Useful development tools
npm install -g react-devtools
npm install -g flipper  # For debugging

# Optional: Watchman for better file watching
yay -S watchman
```

#### 6. Device Development Setup

```bash
# USB debugging support
sudo pacman -S android-udev
sudo usermod -a -G adbusers $USER

# Create udev rules for your device (if needed)
echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="18d1", MODE="0666", GROUP="adbusers"' | sudo tee /etc/udev/rules.d/51-android.rules
sudo udevadm control --reload-rules
```

#### 7. Environment Variables Setup

Add these to your `~/.bashrc` or `~/.zshrc`:

```bash
# Android SDK paths
export ANDROID_HOME=/opt/android-sdk  # or $HOME/Android/Sdk if using Android Studio
export ANDROID_SDK_ROOT=$ANDROID_HOME
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
export PATH=$PATH:$ANDROID_HOME/tools/bin

# Java
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk

# React Native
export REACT_EDITOR=code  # or your preferred editor

# Reload shell
source ~/.bashrc  # or ~/.zshrc
```

#### 8. VS Code Extensions (Recommended)

If using VS Code, install these extensions:

```bash
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension bradlc.vscode-tailwindcss
code --install-extension ms-vscode.vscode-json
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.vscode-eslint
code --install-extension msjsdiag.vscode-react-native
code --install-extension vscode-icons-team.vscode-icons
```

#### 9. Verify Installation

```bash
# Check versions
node --version          # Should be 16+
npm --version
java -version          # Should show OpenJDK 11 or 17
adb version           # Android Debug Bridge

# Check React Native setup
npx react-native doctor

# List available emulators
emulator -list-avds

# Check connected devices
adb devices
```

#### 10. Create Your First Emulator

```bash
# List available system images
sdkmanager --list | grep system-images

# Install a system image
sdkmanager "system-images;android-33;google_apis;x86_64"

# Create AVD
avdmanager create avd -n "Pixel_6_API_33" -k "system-images;android-33;google_apis;x86_64" -d "pixel_6"

# Start emulator
emulator -avd Pixel_6_API_33
```

### Development Workflow

1. **Start development server**: `npm start`
2. **Run on device/emulator**: `npm run android`
3. **Debug**: Use React DevTools or Flipper
4. **Test**: `npm test`
5. **Build**: `npm run build:android`

## How to Run the App

### Prerequisites

- Node.js 16+
- React Native CLI
- Android Studio or Android SDK
- Java Development Kit (JDK 11 or higher)

### Arch Linux Setup Instructions

1. **Install required packages**:
   ```bash
   # Install Node.js and npm
   sudo pacman -S nodejs npm
   
   # Install JDK (OpenJDK 11 or 17)
   sudo pacman -S jdk11-openjdk
   # or
   sudo pacman -S jdk17-openjdk
   
   # Install Android Studio (recommended) or just the SDK
   yay -S android-studio
   # or for minimal setup:
   yay -S android-sdk android-sdk-platform-tools android-sdk-build-tools
   ```

2. **Install React Native CLI**:
   ```bash
   npm install -g @react-native-community/cli
   ```

3. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd ask-why
   npm install
   ```

4. **Android Setup**:
   ```bash
   # Set environment variables (add to ~/.bashrc or ~/.zshrc)
   export ANDROID_HOME=$HOME/Android/Sdk
   # or if using AUR android-sdk package:
   export ANDROID_HOME=/opt/android-sdk
   
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
   
   # Reload your shell
   source ~/.bashrc  # or ~/.zshrc
   ```

5. **Setup Android SDK** (if not using Android Studio):
   ```bash
   # Accept licenses
   sdkmanager --licenses
   
   # Install required SDK components
   sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.0"
   
   # Create an emulator (optional)
   sdkmanager "system-images;android-33;google_apis;x86_64"
   avdmanager create avd -n "Pixel_API_33" -k "system-images;android-33;google_apis;x86_64"
   ```

6. **Device Setup**:
   - **Physical device**: Enable Developer Options and USB Debugging
   - **Emulator**: Start with `emulator -avd Pixel_API_33` or use Android Studio

### Running the App

#### Development Mode

```bash
# Start Metro bundler
npm start

# In a new terminal, run on Android
npm run android

# Or run on a specific device
npx react-native run-android --deviceId=<device-id>
```

#### Building APK

```bash
# Build debug APK
npm run build:android-debug

# Build release APK (for production)
npm run build:android
```

#### Other Commands

```bash
# Run unit tests
npm test

# Lint code
npm run lint

# Clean project (if you encounter issues)
npm run clean
```

### Troubleshooting (Arch Linux Specific)

- **Metro bundler issues**: Try `npx react-native start --reset-cache`
- **Android build issues**: Clean project with `cd android && ./gradlew clean`
- **Device not found**: Check `adb devices` to see connected devices
- **Permission issues**: 
  - Make sure USB debugging is enabled and device is authorized
  - Add your user to the `adbusers` group: `sudo usermod -a -G adbusers $USER`
  - Restart or re-login after adding to group
- **ANDROID_HOME not found**: Verify the path exists and environment variables are set
- **Java issues**: Make sure you're using the correct JDK version:
  ```bash
  # Check Java version
  java -version
  
  # Switch JDK if needed (using archlinux-java)
  sudo archlinux-java set java-11-openjdk
  ```
- **Emulator performance**: Enable hardware acceleration:
  ```bash
  # Check if KVM is available
  lscpu | grep Virtualization
  
  # Install QEMU/KVM if needed
  sudo pacman -S qemu-desktop libvirt
  sudo systemctl enable --now libvirtd
  ```
- **Build tools not found**: Install missing Android build tools:
  ```bash
  sdkmanager "build-tools;33.0.0" "platforms;android-33"
  ```

## Required Permissions

The app requires the following Android permissions:

- `BIND_ACCESSIBILITY_SERVICE`: Monitor app launch events
- `SYSTEM_ALERT_WINDOW`: Display system-level overlay
- `PACKAGE_USAGE_STATS`: Get app usage statistics
- `QUERY_ALL_PACKAGES`: Query installed app list

## Development Status

The project is currently in the initialization phase with basic architecture completed. Development will proceed in the following order:

1. ✅ Project initialization and basic architecture setup
2. ⏳ Data layer implementation (SQLite + Repository pattern)
3. ⏳ Native Android module development
4. ⏳ Core business logic implementation
5. ⏳ UI component development
6. ⏳ Feature screen implementation
7. ⏳ Advanced features and permission management
8. ⏳ Testing and quality assurance
9. ⏳ App packaging and release preparation

## Contributing

Issues and Pull Requests are welcome to improve this project.

## License

This project is licensed under the MIT License.