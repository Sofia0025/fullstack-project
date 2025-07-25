import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Box, Typography, List, ListItem, ListItemText, Divider, Alert, CircularProgress, Paper } from '@mui/material';

interface Order {
  _id: string;
  items: { product: { name: string }; quantity: number }[];
  total: number;
  status: string;
  createdAt: string;
}

const Profile: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.get('/orders/my')
      .then(res => setOrders(res.data))
      .catch(err => setError(err.response?.data?.message || 'Error al cargar órdenes'))
      .finally(() => setLoading(false));
    // Obtener usuario del token/localStorage
    const userStr = localStorage.getItem('token');
    if (userStr) {
      try {
        const payload = JSON.parse(atob(userStr.split('.')[1]));
        setUser(payload);
      } catch {}
    }
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (orders.length === 0) return <Alert severity="info">No tienes órdenes aún.</Alert>;

  return (
    <Box maxWidth={700} mx="auto" mt={6}>
      <Typography variant="h4" mb={3}>Mi perfil</Typography>
      {user && (
        <Paper sx={{ p: 2, mb: 4 }}>
          <Typography variant="subtitle1">Email: {user.email || user.id}</Typography>
          <Typography variant="subtitle1">Rol: {user.role}</Typography>
        </Paper>
      )}
      <Typography variant="h5" mb={2}>Mis órdenes</Typography>
      <List>
        {orders.map(order => (
          <React.Fragment key={order._id}>
            <ListItem>
              <ListItemText
                primary={`#${order._id.slice(-6)} - ${new Date(order.createdAt).toLocaleString()} - $${order.total}`}
                secondary={
                  <>
                    {order.items.map((item, idx) => (
                      <span key={item.product.name + '-' + idx}>
                        {item.product.name} x{item.quantity}{idx < order.items.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                    <br />
                    Estado: {order.status}
                  </>
                }
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Profile; 