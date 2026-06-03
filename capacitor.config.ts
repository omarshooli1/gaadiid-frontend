import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gaadiid.app',
  appName: 'Gaadiid',
  webDir: 'out',
  android: {
    buildOptions: {
      keystorePath: 'gaadiid-release.keystore',
      keystoreAlias: 'gaadiid',
    }
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#080808',
      androidSplashResourceName: 'splash',
      showSpinner: false,
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#080808',
    },
  },
};

export default config;
