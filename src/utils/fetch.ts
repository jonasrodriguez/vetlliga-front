import { useAuthStore } from '../stores/AuthStore';

export const authFetch = async (input: RequestInfo, init: RequestInit = {}) => {

  const { auth, clearAuth } = useAuthStore.getState();

  const headers = new Headers({'Content-Type': 'application/json'});

  if (auth.token) {
    headers.set('Authorization', `Bearer ${auth.token}`);    
  }

  const response = await fetch(input, {
    ...init,
    headers,
  });

  if (response.status === 403) {
    clearAuth();
    console.error('Unauthorized – logged out');
  }

  return response;
};

export const postMultipart = async (input: RequestInfo, init: RequestInit = {}) => {

  const { auth, clearAuth } = useAuthStore.getState();

  const headers = new Headers();

  if (auth.token) {
    headers.set('Authorization', `Bearer ${auth.token}`);    
  }

  const response = await fetch(input, {
    ...init,
    headers,
  });

  if (response.status === 403) {
    clearAuth();
    console.error('Unauthorized – logged out');
  }

  return response;
};