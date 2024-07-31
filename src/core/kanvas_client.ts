// Modules
import KanvasCore, { genericAuthMiddleware } from '@kanvas/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

// Constants
import { AUTH_TOKEN } from 'utils/constants';


const getToken = async () => {
  const token = await AsyncStorage.getItem(AUTH_TOKEN);
  return token;
};

export const client = new KanvasCore({
  url: `${Config.KANVAS_URL}`,
  key: `${Config.KANVAS_KEY}`,
  middlewares: [genericAuthMiddleware(getToken)],
});
