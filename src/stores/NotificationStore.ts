import { create } from 'zustand';

interface NotificationState {
  open: boolean;
  message: string;
  severity?: 'success' | 'info' | 'warning' | 'error';
  position: 'top' | 'bottom';
  show: (message: string, severity?: 'success' | 'info' | 'warning' | 'error', position?: 'top' | 'bottom') => void;
  hide: () => void;
}

const useNotificationStore = create<NotificationState>((set) => ({
  open: false,
  message: '',
  severity: 'info',
  position: 'top',
  show: (message, severity = 'info', position = 'top') => set({ open: true, message, severity, position }),
  hide: () => set({ open: false }),
}));

export default useNotificationStore;