#!/bin/bash

# Set Android environment variables
export ANDROID_HOME=/home/MciG/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/emulator

echo "Android environment set up:"
echo "ANDROID_HOME: $ANDROID_HOME"
echo "ADB version:"
adb version

echo "Available emulators:"
emulator -list-avds

echo "Connected devices:"
adb devices

echo "Starting React Native Android..."
npx react-native run-android