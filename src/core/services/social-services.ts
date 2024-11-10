
// Core
import { adminClient, client } from "core/kanvas_client";

export class SocialService {

  /**
   * Retrieves the list of users that the specified user is following.
   *
   * @param userId - The unique identifier of the user whose following list is to be fetched.
   * @returns A promise that resolves to the list of users the specified user is following.
   * @throws An error if there is an issue fetching the following list.
   */
  async getFollowingList(userId: string) {
    try {
      const data = await adminClient.follow.getFollowing(userId);
      return data;
    } catch (error) {
      console.log('getFollowingList Error:', error);
      throw new Error(`Error fetching Following list: ${error}`);
    }
  }

  /**
   * Retrieves the list of followers for a given user.
   *
   * @param userId - The unique identifier of the user whose followers are to be fetched.
   * @returns A promise that resolves to the list of followers.
   * @throws An error if there is an issue fetching the followers list.
   */
  async getFollowersList(userId: string) {
    try {
      const data = await adminClient.follow.getFollowers(userId);
      return data;
    } catch (error) {
      console.log('getFollowersList Error:', error);
      throw new Error(`Error fetching Followers list: ${error}`);
    }
  }

  /**
   * Follows a user by their user ID.
   * 
   * @param {string} userId - The ID of the user to follow.
   * @returns {Promise<any>} - A promise that resolves to the data returned by the followUser API call.
   * @throws {Error} - Throws an error if the followUser API call fails.
   */
  async followUser(userId: string) {
    try {
      const data = await client.follow.followUser(userId);
      return data;
    } catch (error) {
      console.log('followUser Error:', error);
      throw new Error(`Error following user: ${error}`);
    }
  }

  /**
   * Unfollows a user by their user ID.
   *
   * @param userId - The ID of the user to unfollow.
   * @returns A promise that resolves with the data returned from the unfollow operation.
   * @throws An error if the unfollow operation fails.
   */
  async unfollowUser(userId: string) {
    try {
      const data = await client.follow.unFollowUser(userId);
      return data;
    } catch (error) {
      console.log('unfollowUser Error:', error);
      throw new Error(`Error unfollowing user: ${error}`);
    }
  }

  /**
   * Blocks a user by their user ID.
   *
   * @param userId - The ID of the user to block.
   * @returns A promise that resolves to the data returned by the blockUser API call.
   * @throws An error if the blockUser API call fails.
   */
  async blockUser(userId: string) {
    try {
      const data = await client.users.blockUser(userId);
      return data;
    } catch (error) {
      console.log('blockUser Error:', error);
      throw new Error(`Error blocking user: ${error}`);
    }
  }

  /**
   * Unblocks a user by their user ID.
   *
   * @param userId - The ID of the user to unblock.
   * @returns A promise that resolves with the data returned from the unblocking operation.
   * @throws An error if the unblocking operation fails.
   */
  async unblockUser(userId: string) {
    try {
      const data = await client.users.unBlockUser(userId);
      return data;
    } catch (error) {
      console.log('unblockUser Error:', error);
      throw new Error(`Error unblocking user: ${error}`);
    }
  }

  /**
   * Shares the user profile by the given user ID.
   *
   * @param {string} userId - The ID of the user whose profile is to be shared.
   * @returns {Promise<any>} A promise that resolves to the data returned by the admin client.
   * @throws {Error} Throws an error if there is an issue sharing the user profile.
   */
  async shareUserProfile(userId: string) {
    try {
      const data = await adminClient.users.shareUserById(userId);
      return data;
    } catch (error) {
      console.log('shareUserProfile Error:', error);
      throw new Error(`Error sharing user profile: ${error}`);
    }
  }

  /**
   * Retrieves the list of blocked accounts for a given user.
   *
   * @param userId - The ID of the user whose blocked accounts are to be fetched.
   * @returns An object containing the blocked accounts data, current page, and total pages.
   * @throws Will throw an error if there is an issue fetching the blocked accounts.
   */
  async getUserBlockedAccounts(userId: string) {
    try {
      const response = await adminClient.users.getBlockedUsers(userId);
      const { data, paginatorInfo } = response.blockedUsers;
      const newObejct = {
        data: data,
        current_page: paginatorInfo.currentPage,
        total_pages: paginatorInfo.lastPage,
      };
      return newObejct;
    } catch (error) {
      console.log('getUserBlockedAccounts Error:', error);
      throw new Error(`Error fetching blocked accounts: ${error}`);
    }
  }

}

export default new SocialService ();
