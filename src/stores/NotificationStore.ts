import { create } from 'zustand';

interface NotificationState {
  open: boolean;
  message: string;
  severity?: 'success' | 'info' | 'warning' | 'error';
  show: (message: string, severity?: 'success' | 'info' | 'warning' | 'error') => void;
  hide: () => void;
}

const useNotificationStore = create<NotificationState>((set) => ({
  open: false,
  message: '',
  severity: 'info',
  show: (message, severity = 'info') => set({ open: true, message, severity }),
  hide: () => set({ open: false }),
}));

export default useNotificationStore;