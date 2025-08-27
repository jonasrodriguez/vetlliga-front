import { Button, Dialog, DialogTitle, DialogActions, DialogContent, Typography } from '@mui/material';

interface DeleteConfirmationProps {
  confirmOpen: boolean;
  subtitle?: string | null;
  handleCancelDelete: () => void;
  handleConfirmDelete: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({confirmOpen, handleCancelDelete, handleConfirmDelete, subtitle}) => {

  const dialogContent = subtitle || null;

  return (
    <Dialog open={confirmOpen} onClose={handleCancelDelete}>
      <DialogTitle>¿Estás seguro de que deseas eliminar?</DialogTitle>
      {dialogContent && (
        <DialogContent>
          <Typography variant="body2" color="textSecondary">
            {dialogContent}
          </Typography>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={handleCancelDelete} color="primary" variant="contained">
          Cancelar
        </Button>
        <Button onClick={handleConfirmDelete} color="error" variant="contained">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmation;