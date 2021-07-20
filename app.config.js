import keys from './constants/Keys';

export default {
  expo: {
    name: 'Echo.Church',
    description: 'Echo.Church App',
    slug: 'echo',
    scheme: 'echo',
    version: '1.0.8',
    orientation: 'portrait',
    icon: './assets/images/app-icon.png',
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
            authToken: keys.SENTRY_AUTH_TOKEN,
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
  },
};
