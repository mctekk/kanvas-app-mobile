// Core
import { client } from "core/kanvas_client";
import { handleCustomFields } from "utils";

export class KanvasService {

  /**
   * Retrieves user data from the server.
   * @returns {Promise<any>} A promise that resolves with the formatted user data.
   * @throws {Error} If there is an error fetching the user data.
   */
  async getUserData() {
    const withSocial = true;

    try {
      const response = await client.users.getUserData(withSocial);
      const formatResponse = handleCustomFields(response);
      return formatResponse;
    } catch (error) {
      console.log('Error:', error);
      throw new Error(`Error fetching user data: ${error}`);
    }
  }

  /**
   * Updates the user data for a given user ID.
   *
   * @param userId - The ID of the user to update.
   * @param values - The updated values for the user data.
   * @returns The formatted response after updating the user data.
   * @throws If there is an error updating the user data.
   */
  async updateUserData(userId: number, values: any) {
    const withSocial = true;

    try {
      const response = await client.users.updateUserData(
        userId,
        values,
        withSocial,
      );
      const formatResponse = handleCustomFields(response);
      return formatResponse;
    } catch (error) {
      console.log('Error:', error);
      throw new Error(`Error updating user data: ${error}`);
    }
  }

}

export default new KanvasService();
