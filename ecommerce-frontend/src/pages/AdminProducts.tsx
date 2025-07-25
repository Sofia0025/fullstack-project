import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Alert, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
}

const emptyProduct: Omit<Product, '_id'> = {
  name: '', description: '', price: 0, stock: 0, category: '', imageUrl: ''
};

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyProduct);

  const fetchProducts = () => {
    setLoading(true);
    setError(null);
    api.get('/products?limit=100')
      .then(res => setProducts(res.data.products))
      .catch(err => setError(err.response?.data?.message || 'Error al cargar productos'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleOpen = (product?: Product) => {
    if (product) {
      setEditId(product._id);
      setForm({ ...product });
    } else {
      setEditId(null);
      setForm(emptyProduct);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm(emptyProduct);
    setEditId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (editId) {
        await api.put(`/products/${editId}`, form);
      } else {
        await api.post('/products', form);
      }
      fetchProducts();
      handleClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al guardar producto');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Eliminar producto?')) return;
    setLoading(true);
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al eliminar producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>Administrar productos</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()} sx={{ mb: 2 }}>
        Nuevo producto
      </Button>
      {loading && <CircularProgress />}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Categoría</TableCell>
            <TableCell>Imagen</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(product => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell><img src={product.imageUrl} alt={product.name} width={50} /></TableCell>
              <TableCell>
                <IconButton onClick={() => handleOpen(product)}><EditIcon /></IconButton>
                <IconButton onClick={() => handleDelete(product._id)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editId ? 'Editar producto' : 'Nuevo producto'}</DialogTitle>
        <DialogContent>
          <TextField label="Nombre" name="name" value={form.name} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Descripción" name="description" value={form.description} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Precio" name="price" type="number" value={form.price} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Stock" name="stock" type="number" value={form.stock} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Categoría" name="category" value={form.category} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Imagen (URL)" name="imageUrl" value={form.imageUrl} onChange={handleChange} fullWidth margin="normal" required />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminProducts; 