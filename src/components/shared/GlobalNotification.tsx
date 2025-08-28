import { Snackbar, Alert } from '@mui/material';
import useNotificationStore from '../../stores/NotificationStore';

const GlobalNotification = () => {
  const { open, message, severity, position, hide } = useNotificationStore();

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={hide} anchorOrigin={{ vertical: position, horizontal: 'center' }}>
      <Alert onClose={hide} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalNotification;