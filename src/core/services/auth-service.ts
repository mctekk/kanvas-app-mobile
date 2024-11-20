// Core
import { client } from 'core/kanvas_client';

// Utils
import { handleCustomFields } from 'utils';

interface ILoginData {
  email: string;
  password: string;
}

export class AuthServices {

  /**
   * Handles the sign-in process for a user.
   *
   * @param {ILoginData} loginData - The login data containing the user's email and password.
   * @returns {Promise<any>} The formatted response from the authentication service.
   * @throws {Error} If there is an error during the sign-in process.
   */
  async onSignIn(loginData: ILoginData) {
    try {
      const response = await client.auth.login(loginData.email, loginData.password);
      return response;
    } catch (error) {
      console.log('onSignIn error:', error);
      throw new Error(`onSignIn error: ${error}`);
    }
  }

  /**
   * Handles social login using the specified provider and token.
   *
   * @param {string} provider - The social login provider (e.g., 'facebook', 'google').
   * @param {string} token - The token received from the social login provider.
   * @returns {Promise<any>} The formatted response after handling custom fields.
   * @throws {Error} Throws an error if the social login process fails.
   */
  async onSocialLogin(provider: string, token: string) {
    try {
      const response = await client.auth.socialLogin({
        provider,
        token,
      });
      const formatResponse = handleCustomFields(response);
      return formatResponse;
    } catch (error) {
      console.log('onSocialLogin error:', error);
      throw new Error(`onSocialLogin error: ${error}`);
    }
  }

  /**
   * Signs the user out by calling the client's logout method.
   * 
   * @returns {Promise<any>} The response from the logout method.
   * @throws {Error} If an error occurs during the sign-out process.
   */
  async onSignOut() {
    try {
      const response = await client.auth.logout();
      return response;
    } catch (error) {
      console.log('onSignOut error:', error);
      throw new Error(`onSignOut error: ${error}`);
    }
  }

}

export default new AuthServices();
