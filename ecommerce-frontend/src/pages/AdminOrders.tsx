import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Alert } from '@mui/material';

interface Order {
  _id: string;
  user: { email: string; name: string };
  items: { product: { name: string }; quantity: number }[];
  total: number;
  status: string;
  createdAt: string;
}

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.get('/orders')
      .then(res => setOrders(res.data))
      .catch(err => setError(err.response?.data?.message || 'Error al cargar órdenes'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>Órdenes</Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Usuario</TableCell>
            <TableCell>Productos</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Fecha</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map(order => (
            <TableRow key={order._id}>
              <TableCell>{order._id.slice(-6)}</TableCell>
              <TableCell>{order.user?.email || '-'}</TableCell>
              <TableCell>
                {order.items.map((item, idx) => (
                  <span key={idx}>{item.product.name} x{item.quantity}{idx < order.items.length - 1 ? ', ' : ''}</span>
                ))}
              </TableCell>
              <TableCell>${order.total}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default AdminOrders; 