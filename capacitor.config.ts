import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.japaneselearning.app',
  appName: 'japanese-learning',
  webDir: 'dist/japanese-learning',
  server: {
    androidScheme: 'https'
  }
};

export default config;
