import { Button, Dialog, DialogTitle, DialogActions } from '@mui/material';

interface DeleteConfirmationProps {
  confirmOpen: boolean;
  handleCancelDelete: () => void;
  handleConfirmDelete: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  confirmOpen,
  handleCancelDelete,
  handleConfirmDelete,
}) => {
  return (
    <Dialog open={confirmOpen} onClose={handleCancelDelete}>
      <DialogTitle>¿Estás seguro de que deseas eliminar?</DialogTitle>
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