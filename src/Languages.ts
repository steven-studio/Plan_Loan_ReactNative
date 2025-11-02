// src/localization/Languages.ts
import LocalizedStrings from 'react-native-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import zhHans from './locales/zh-Hans.json';
import zhHant from './locales/zh-Hant.json';

export type SupportedLang = 'en' | 'zh-Hans' | 'zh-Hant';

const resources: Record<SupportedLang, Record<string, string>> = {
  en,
  'zh-Hans': zhHans,
  'zh-Hant': zhHant,
};

const strings = new LocalizedStrings(resources);

const defaultLanguage: SupportedLang = 'zh-Hant';

// Load saved language or set default
export const loadLanguage = async () => {
  const savedLang = await AsyncStorage.getItem('appLanguage');
  if (savedLang && Object.prototype.hasOwnProperty.call(resources, savedLang)) {
    strings.setLanguage(savedLang as SupportedLang);
  } else {
    strings.setLanguage(defaultLanguage);
  }
};

// Change language
export const changeAppLanguage = async (lang: SupportedLang) => {
  strings.setLanguage(lang);
  await AsyncStorage.setItem('appLanguage', lang);
};

export default strings;
