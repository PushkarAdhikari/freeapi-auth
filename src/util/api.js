const BASE_URL = 'https://api.freeapi.app/api/v1';

/**
 * Get the access token from local storage
 * @returns {string|null}
 */
export const getAccessToken = () => {
  return localStorage.getItem('freeapi_access_token');
};

/**
 * Save tokens to local storage
 * @param {string} accessToken 
 * @param {string} refreshToken 
 */
export const saveTokens = (accessToken, refreshToken) => {
  localStorage.setItem('freeapi_access_token', accessToken);
  localStorage.setItem('freeapi_refresh_token', refreshToken);
};

/**
 * Clear tokens from local storage
 */
export const clearTokens = () => {
  localStorage.removeItem('freeapi_access_token');
  localStorage.removeItem('freeapi_refresh_token');
};

/**
 * Helper to make API requests with automatic authentication headers
 * @param {string} endpoint 
 * @param {object} options 
 * @returns {Promise<any>}
 */
async function apiRequest(endpoint, options = {}) {
  const token = getAccessToken();
  
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  let data;
  try {
    data = await response.json();
  } catch (err) {
    // If not JSON
    throw new Error('Something went wrong. Please try again.');
  }

  if (!response.ok) {
    // extract error message from standard FreeAPI envelope or fall back
    const errorMsg = data?.message || 'Request failed';
    throw new Error(errorMsg);
  }

  return data;
}

/**
 * Register a new user
 * @param {object} params
 * @param {string} params.username
 * @param {string} params.email
 * @param {string} params.password
 * @param {string} params.role
 */
export const registerUser = async ({ username, email, password, role = 'USER' }) => {
  return apiRequest('/users/register', {
    method: 'POST',
    body: JSON.stringify({ username, email, password, role }),
  });
};

/**
 * Login a user
 * @param {object} params
 * @param {string} params.username
 * @param {string} params.password
 */
export const loginUser = async ({ username, password }) => {
  const responseData = await apiRequest('/users/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

  const { accessToken, refreshToken, user } = responseData.data;
  saveTokens(accessToken, refreshToken);
  return { user, accessToken };
};

/**
 * Logout the current user
 */
export const logoutUser = async () => {
  try {
    await apiRequest('/users/logout', {
      method: 'POST',
    });
  } finally {
    // Always clear tokens locally even if API fails or session expired
    clearTokens();
  }
};

/**
 * Get current logged in user details
 */
export const getCurrentUser = async () => {
  const responseData = await apiRequest('/users/current-user', {
    method: 'GET',
  });
  return responseData.data;
};
