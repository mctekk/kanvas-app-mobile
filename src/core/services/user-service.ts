// Core
import { adminClient, client } from 'core/kanvas_client';

// Utils
import { handleCustomFields } from 'utils';

export class UserService {

  /**
   * Fetches user data from the server.
   *
   * @param withSocial - A boolean indicating whether to include social data in the response. Defaults to true.
   * @returns A promise that resolves to the formatted user data.
   * @throws Will throw an error if the request fails.
   */
  async getUserData(withSocial: boolean = true) {
    try {
      const response = await client.users.getUserData(withSocial);
      const formatResponse = handleCustomFields(response);
      return formatResponse;
    } catch (error) {
      console.log('getUserData error:', error);
      throw new Error(`Error fetching user data: ${error}`);
    }
  }

  /**
   * Updates the user data for a given user ID.
   *
   * @param userId - The ID of the user to update.
   * @param values - An object containing the new values for the user.
   * @param withSocial - A boolean indicating whether to update social data as well. Defaults to true.
   * @returns A promise that resolves to the formatted response after updating the user data.
   * @throws Will throw an error if the update operation fails.
   */
  async updateUserData(userId: number, values: any, withSocial: boolean = true) {
    try {
      const response = await client.users.updateUserData(
        userId,
        values,
        withSocial,
      );
      const formatResponse = handleCustomFields(response);
      return formatResponse;
    } catch (error) {
      console.log('updateUserData error:', error);
      throw new Error(`Error updating user data: ${error}`);
    }
  }

  /**
   * Retrieves the user profile by the given user ID.
   *
   * @param userId - The ID of the user whose profile is to be fetched.
   * @returns A promise that resolves to the user profile data.
   * @throws An error if there is an issue fetching the user profile.
   */
  async getUserProfileById(userId: string) {
    try {
      const userInfo = await adminClient.app.users.getAppUsers({
        first: 1,
        whereCondition: {
          column: 'ID',
          operator: 'EQ',
          value: userId,
        }
      })
      const { appUsers } = userInfo;
      return appUsers.data[0];
    } catch (error) {
      console.log('getUserProfileById Error:', error);
      throw new Error(`Error fetching user profile: ${error}`);
    }
  }

  /**
   * Fetches a user by their display name.
   *
   * @param displayName - The display name of the user to fetch.
   * @returns The user object if found.
   * @throws Will throw an error if there is an issue fetching the user.
   */
  async getUserByDisplayName(displayName: string) {
    try {
      const response = await adminClient.users.getUserByDisplayName(displayName);
      if (displayName === response.displayname.toLocaleLowerCase()) {
        return response;
      }

    } catch (error) {
      console.log('getUserByDisplayName Error:', error);
      throw new Error(`Error fetching user by display name: ${error}`);
    }
  }

}

export default new UserService();
