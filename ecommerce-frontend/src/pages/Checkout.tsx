import React, { useEffect, useState } from 'react';
import { useCartStore } from '../store/cartStore';
import api from '../utils/api';
import { Box, Typography, List, ListItem, ListItemText, Button, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { items, fetchCart, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line
  }, []);

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/orders');
      await clearCart(); // Esperar a que el carrito se limpie antes de continuar
      setSuccess('¡Orden creada con éxito!');

    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear la orden');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <CircularProgress />
    </Box>
  );
  if (error) return <Alert severity="error">{error}</Alert>;
  if (items.length === 0) return <Alert severity="info">El carrito está vacío</Alert>;
  if (success) {
    return (
      <Box maxWidth={600} mx="auto" mt={6} textAlign="center">
        <Typography variant="h4" mb={3} color="success.main">¡Pedido confirmado!</Typography>
        <Typography variant="body1" mb={4}>{success}</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/profile')}>
          Ver mis órdenes
        </Button>
      </Box>
    );
  }

  return (
    <Box maxWidth={600} mx="auto" mt={6}>
      <Typography variant="h4" mb={3}>Checkout</Typography>
      <List>
        {items.length > 0 && items.map(({ product, quantity }) => (
          <ListItem key={product._id}>
            <ListItemText
              primary={product.name}
              secondary={`Cantidad: ${quantity} | $${product.price} c/u`}
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" mt={2}>Total: ${total}</Typography>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleCheckout}
        disabled={loading || items.length === 0}
      >
        {loading ? <CircularProgress size={24} /> : 'Confirmar compra'}
      </Button>
    </Box>
  );
};

export default Checkout; 