import { I18n } from "i18n-js";
import {EN} from './locales';

// CHANGE THIS TO GET THE LANGUAGE FROM THE DEVICE
export const currentLocale = 'EN';

// i18n.locale = currentLocale;
const i18n = new I18n({
  en: EN,
});

export default i18n;
