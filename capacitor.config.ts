import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.memorizejapanese.app',
  appName: 'Hira/Kata Memorization',
  webDir: 'dist/japanese-learning',
  server: {
    androidScheme: 'https'
  },
  android: {
    backgroundColor: '#000000'
  }
};

export default config;

