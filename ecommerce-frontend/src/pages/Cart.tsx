import React, { useEffect } from 'react';
import { useCartStore } from '../store/cartStore';
import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Button, Divider, Alert, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { items, loading, error, fetchCart, removeFromCart, clearCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line
  }, []);

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (items.length === 0) return <Alert severity="info">El carrito está vacío</Alert>;

  return (
    <Box maxWidth={600} mx="auto" mt={6}>
      <Typography variant="h4" mb={3}>Carrito</Typography>
      {items.length === 0 && !loading ? (
        <Alert severity="info">El carrito está vacío</Alert>
      ) : (
        <>
          <List>
            {items.map(({ product, quantity, _id }, idx) => (
              <React.Fragment key={_id}>
                <ListItem
                  key={_id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => removeFromCart(product._id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={product.imageUrl} alt={product.name} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={product.name}
                    secondary={`Cantidad: ${quantity} | $${product.price} c/u`}
                  />
                </ListItem>
                {idx < items.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
            <Typography variant="h6">Total: ${total}</Typography>
            <Box>
              <Button variant="outlined" color="secondary" onClick={clearCart} disabled={loading} sx={{ mr: 2 }}>
                Vaciar carrito
              </Button>
              <Button variant="contained" color="primary" onClick={() => navigate('/checkout')} disabled={loading || items.length === 0}>
                Ir a pagar
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Cart; 