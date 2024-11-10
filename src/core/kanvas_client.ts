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

/**
 * Initializes a new instance of the KanvasCore client with the specified configuration.
 *
 * @constant
 * @type {KanvasCore}
 * @param {string} url - The URL of the Kanvas API.
 * @param {string} key - The API key for authentication.
 * @param {Array<Function>} middlewares - An array of middleware functions to be applied to the client.
 */
export const client = new KanvasCore({
  url: `${Config.KANVAS_URL}`,
  key: `${Config.KANVAS_KEY}`,
  middlewares: [genericAuthMiddleware(getToken)],
});


/**
 * Creates an instance of KanvasCore configured for admin access.
 * 
 * @constant {KanvasCore} adminClient - The KanvasCore instance configured with admin credentials.
 * @param {string} url - The URL of the Kanvas service, retrieved from Config.KANVAS_URL.
 * @param {string} key - The API key for the Kanvas service, retrieved from Config.KANVAS_KEY.
 * @param {Array} middlewares - An array of middleware functions, including genericAuthMiddleware with getToken.
 * @param {string} adminKey - The admin key for the Kanvas service, retrieved from Config.ADMIN_KEY.
 */
export const adminClient = new KanvasCore({
  url: `${Config.KANVAS_URL}`,
  key: `${Config.KANVAS_KEY}`,
  middlewares: [genericAuthMiddleware(getToken)],
  adminKey: `${Config.ADMIN_KEY}`,
});
