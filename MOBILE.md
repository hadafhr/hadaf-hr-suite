# Hadaf HR Suite - Mobile Development Guide

This project includes mobile app capabilities using Capacitor.

## Mobile App Features
- Native iOS and Android support
- GPS-based attendance tracking
- Push notifications
- Offline capability
- Native device integration

## Development Setup

### Prerequisites
- Node.js 18+
- For iOS: macOS with Xcode
- For Android: Android Studio

### Getting Started

1. **Transfer to GitHub**
   - Click the "Export to GitHub" button in Lovable
   - Clone the repository to your local machine

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Add Mobile Platforms**
   ```bash
   # For iOS (macOS only)
   npx cap add ios
   
   # For Android
   npx cap add android
   ```

4. **Update Platform Dependencies**
   ```bash
   npx cap update ios    # or android
   ```

5. **Build the Project**
   ```bash
   npm run build
   ```

6. **Sync with Native Platform**
   ```bash
   npx cap sync
   ```

7. **Run on Device/Simulator**
   ```bash
   # iOS
   npx cap run ios
   
   # Android
   npx cap run android
   ```

## App Configuration

The app is configured with:
- **App ID**: `app.lovable.3a35ea4e52184868bcc6643025691c73`
- **App Name**: `boud-hr-suite`
- **Hot Reload**: Enabled for development

## Features

### GPS Attendance
- Location-based check-in/check-out
- Geofencing for workplace boundaries
- Real-time location tracking

### Push Notifications
- Instant updates for requests
- Attendance reminders
- System announcements

### Offline Support
- Local data caching
- Sync when online
- Basic functionality without internet

## Deployment

For production deployment, update the `capacitor.config.json` server URL to your production domain.

## Support

For mobile development questions and troubleshooting, visit: https://lovable.dev/blogs/TODO