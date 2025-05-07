import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'FortiManager Live Monitor': 'FortiManager Live Monitor',
      'API Config': 'API Config',
      ADOMs: 'ADOMs',
      Devices: 'Devices',
      Thresholds: 'Thresholds',
      Save: 'Save',
      Cancel: 'Cancel',
      Reset: 'Reset',
      // ...add more keys as needed
    },
  },
  nl: {
    translation: {
      'FortiManager Live Monitor': 'FortiManager Live Monitor',
      'API Config': 'API-instellingen',
      ADOMs: 'ADOMs',
      Devices: 'Apparaten',
      Thresholds: 'Drempelwaarden',
      Save: 'Opslaan',
      Cancel: 'Annuleren',
      Reset: 'Reset',
      // ...add more keys as needed
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
