import {Dimensions, Platform, StatusBar} from 'react-native';

export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 844 ||
      dimen.width === 390 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 428 ||
      dimen.height === 852 ||
      dimen.width === 393 || // iPhone 14 Pro
      dimen.height === 932 ||
      dimen.width === 430) // iPhone 14 Pro Max
  );
}

export function isIphone14Pro() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (dimen.height === 852 ||
      dimen.width === 393 || // iPhone 14 Pro
      dimen.height === 932 ||
      dimen.width === 430) // iPhone 14 Pro Max
  );
}

export function isIphone14() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (dimen.height === 844 || dimen.width === 390) // iPhone 14
  );
}

export function ifIphoneX(iphoneXStyle: any, regularStyle: any) {
  if (isIphoneX() || isIphone14Pro()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

export function getStatusBarHeight(safe: any) {
  return Platform.select({
    ios: ifIphoneX(safe ? 55 : 30, 20),
    android: StatusBar.currentHeight,
    default: 0,
  });
}

export function getBottomSpace() {
  return isIphoneX() ? 34 : 0;
}
