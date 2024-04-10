// Modules
import KanvasCore, { genericAuthMiddleware } from '@kanvas/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constants
import { AUTH_TOKEN } from 'utils/constants';


const getToken = async () => {
  const token = await AsyncStorage.getItem(AUTH_TOKEN);
  return token;
};

export const client = new KanvasCore({
  url: 'https://graphapidev.kanvas.dev/graphql',
  key: '7d0488b2-632e-4045-9d2d-370d9161644a',
  middlewares: [genericAuthMiddleware(getToken)],
});
