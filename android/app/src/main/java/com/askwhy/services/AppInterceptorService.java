package com.askwhy.services;

import android.accessibilityservice.AccessibilityService;
import android.view.accessibility.AccessibilityEvent;

public class AppInterceptorService extends AccessibilityService {

    @Override
    public void onAccessibilityEvent(AccessibilityEvent event) {
        // Implementation will be added in later tasks
        // This service will monitor app launches and trigger purpose input
    }

    @Override
    public void onInterrupt() {
        // Handle service interruption
    }

    @Override
    protected void onServiceConnected() {
        super.onServiceConnected();
        // Service connected, ready to monitor app launches
    }
}