/* eslint-disable no-lonely-if */
// @ts-ignore

// Modules
import DeepLinking from 'react-native-deep-linking';
import Config from 'react-native-config';

/**
 * Enables deep linking for the application by setting up URL schemes and routes.
 * 
 * This function configures the deep linking by adding URL schemes and defining routes
 * that the application can handle. It uses the base URL from the application configuration
 * and sets up routes for different URL patterns.
 * 
 * The following routes are configured:
 * - `https://<baseUrl>/:username`
 * 
 * Each route extracts parameters from the URL and makes them available in the response object.
 * 
 * @example
 * // Example URL: https://example.com/johndoe
 * 
 * @returns {void}
 */

const enableDeepLinking = () => {
  const baseUrl = Config.APP_WEB_URL.replace('https://', '');
  DeepLinking.addScheme('https://');

  DeepLinking.addRoute(`/${baseUrl}/:username`, async (response: any) => {
    const { username } = response;
  });

};


export default enableDeepLinking;
