const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + '/api';

export const login = async (username: string, password: string): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    return Promise.reject('Login failed');
  }

  const data = await response.json();
  return Promise.resolve(data.token);
};