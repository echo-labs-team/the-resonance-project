import 'dotenv/config';

export default {
  expo: {
    name: 'Echo.Church',
    description: 'Echo.Church App',
    slug: 'echo',
    scheme: 'echo',
    version: '1.0.8',
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
      fallbackToCacheTimeout: 0,
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
      buildNumber: '3',
      bundleIdentifier: 'com.echo.church.app',
      supportsTablet: false,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/app-icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: 'com.echo.church.app',
      versionCode: 15,
    },
    plugins: ['expo-updates', 'expo-splash-screen', 'sentry-expo'],
    extra: {
      AMPLITUDE: process.env.AMPLITUDE,
      GITHUB_SHA: '🍺',
      ONESIGNAL_APP_ID: process.env.ONESIGNAL_APP_ID,
      SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
      SENTRY_DSN: process.env.SENTRY_DSN,
      TWITTER: process.env.TWITTER,
      YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
    },
  },
};
