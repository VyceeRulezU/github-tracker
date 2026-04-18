const BASE_URL = 'https://api.github.com';

export const githubService = {
  /**
   * Returns the URL for a GitHub user profile.
   * @param {string} username 
   * @returns {string}
   */
  getUserUrl: (username) => `${BASE_URL}/users/${username}`,

  /**
   * Returns the URL for a GitHub user's repositories.
   * @param {string} username 
   * @returns {string}
   */
  getReposUrl: (username) => `${BASE_URL}/users/${username}/repos?sort=updated&per_page=100`,
};
