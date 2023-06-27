import 'dotenv/config';

const timestamp = Math.floor(new Date().getTime() / 10000);

export default {
  expo: {
    name: 'Echo.Church',
    description: 'Echo.Church App',
    owner: 'echo-church',
    slug: 'echo',
    scheme: 'echo',
    version: '3.0.1',
    runtimeVersion:
      process.env.NODE_ENV === 'development'
        ? undefined
        : { policy: 'sdkVersion' },
    orientation: 'portrait',
    icon: './assets/images/app-icon.png',
    userInterfaceStyle: 'dark',
    backgroundColor: '#000000',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#000000',
    },
    updates: {
      fallbackToCacheTimeout: 3000,
      url: 'https://u.expo.dev/7ce5e2a0-a01a-4585-8211-371d22c90172',
    },
    assetBundlePatterns: ['**/*'],
    hooks: {
      postPublish: [
        {
          file: 'sentry-expo/upload-sourcemaps',
          config: {
            organization: 'echo-labs-team',
            project: 'echo-app',
            authToken: process.env.SENTRY_AUTH_TOKEN,
          },
        },
      ],
    },
    ios: {
      buildNumber: String(timestamp),
      bundleIdentifier: 'com.echo.church.app',
      supportsTablet: false,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/app-icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: 'com.echo.church.app',
      versionCode: timestamp,
    },
    plugins: [
      'expo-updates',
      'expo-splash-screen',
      'sentry-expo',
      [
        'expo-tracking-transparency',
        {
          userTrackingPermission:
            'Allow this app to collect app-related tracking data that can be used to improve your experience.',
        },
      ],
    ],
    extra: {
      eas: {
        projectId: '7ce5e2a0-a01a-4585-8211-371d22c90172',
      },
      AMPLITUDE: process.env.AMPLITUDE,
      TIMESTAMP: timestamp,
      ONESIGNAL_APP_ID: process.env.ONESIGNAL_APP_ID,
      SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
      SENTRY_DSN: process.env.SENTRY_DSN,
      TWITTER: process.env.TWITTER,
      YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
    },
  },
};
