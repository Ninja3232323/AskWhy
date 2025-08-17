package com.askwhy;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class NativeAppInterceptorModule extends ReactContextBaseJavaModule {

    private static final String MODULE_NAME = "NativeAppInterceptor";

    public NativeAppInterceptorModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void requestAccessibilityPermission(Promise promise) {
        // Implementation will be added in later tasks
        promise.resolve(false);
    }

    @ReactMethod
    public void checkAccessibilityPermission(Promise promise) {
        // Implementation will be added in later tasks
        promise.resolve(false);
    }

    @ReactMethod
    public void startInterception(Promise promise) {
        // Implementation will be added in later tasks
        promise.resolve(false);
    }

    @ReactMethod
    public void stopInterception() {
        // Implementation will be added in later tasks
    }

    @ReactMethod
    public void getInstalledApps(Promise promise) {
        // Implementation will be added in later tasks
        promise.resolve("[]");
    }

    @ReactMethod
    public void setMonitoredApps(String packageNames, Promise promise) {
        // Implementation will be added in later tasks
        promise.resolve(null);
    }

    @ReactMethod
    public void getMonitoredApps(Promise promise) {
        // Implementation will be added in later tasks
        promise.resolve("[]");
    }
}