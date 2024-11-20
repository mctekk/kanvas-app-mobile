// Modules
import React, { useState, useEffect, useCallback } from 'react';
import { Alert, Platform } from 'react-native';
import Config from 'react-native-config';
import {
  initConnection,
  clearProductsIOS,
  getProducts,
  requestPurchase,
} from 'react-native-iap';
import { pricesIds } from 'utils/constants';

const skus = Platform.select({
  ios: Config.APP_CONFIG === 'dev' ? pricesIds.dev : pricesIds.prod,
});

export const initializeIap = async (): Promise<void> => {
  clearProductsIOS();
  try {
    const result = await initConnection();
    if (result === false) {
      Alert.alert("couldn't get in-app-purchase information");
      return;
    }
    if (result) {
      const skuRegister = _getProducts();
      return skuRegister;
    }
  } catch (err) {
    console.log('Error Getting IAP Products', err);
    Alert.alert('fail to get in-app-purchase information');
  }
};

export const _getProducts = async () => {
  try {
    const product = await getProducts({ skus });
    if (product.length === 0) {
      return;
    }
    return product;
  } catch (err) {
    console.log('Error getting IAP products', err);
  }
};

export const onInAppPurchase = async (sku: string) => {
  try {
    const onPayment = await requestPurchase({ sku });
    console.log('SE HIZO EL PAGO ==========', onPayment);
    return onPayment;
  } catch (err) {
    console.log('error', err);
  }
};
