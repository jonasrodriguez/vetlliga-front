import { Usuario } from '../models/Usuario';
import { authFetch } from '../utils/fetch';

export const login = async (username: string, password: string): Promise<string> => {
  const response = await fetch('/api/auth/login', {
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

export const fetchUsers = async (): Promise<Usuario[]> => {
  const response = await authFetch('/api/usuarios');
  if (!response.ok) {
    return Promise.reject('Failed to fetch users');
  }

  const data = await response.json();
  return Promise.resolve(data);
};

export const createUser = async (user: Partial<Usuario>): Promise<Usuario> => {
  user.id = undefined;
  user.username = user.username?.toLowerCase() || '';
  const response = await authFetch('/api/usuarios', {
    method: 'POST',
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    return Promise.reject('Failed to create user');
  }
  const data = await response.json();
  return Promise.resolve(data);
};

export const updateUserPassword = async (userId: number, newPassword: string): Promise<void> => {
  const response = await authFetch(`/api/usuarios/${userId}/password`, {
    method: 'PUT',
    body: JSON.stringify({ password: newPassword }),
  });
  if (!response.ok) {
    return Promise.reject('Failed to update password');
  }
  
  return Promise.resolve();
};

export const deleteUser = async (userId: number): Promise<void> => {
  const response = await authFetch(`/api/usuarios/${userId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    return Promise.reject('Failed to delete user');
  }

  return Promise.resolve();
}