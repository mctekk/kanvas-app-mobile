import { Dimensions } from 'react-native';

const TOUCH_PADDING = 18;

export const TOUCHABLE_AREA = {
  top: TOUCH_PADDING,
  bottom: TOUCH_PADDING,
  left: TOUCH_PADDING,
  right: TOUCH_PADDING,
};

export const AUTH_TOKEN = 'AUTH_TOKEN';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const USER_DATA = 'USER_DATA';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_OUT = 'SIGN_OUT';
export const USER_DATA_UPDATE = 'USER_DATA_UPDATE';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';

// Prices list for in-app purchases in staging
export const pricesIds = {
  dev: [
    'test_price_01',
  ],
  prod: [
    'test_price_prod_01',
  ],
};
