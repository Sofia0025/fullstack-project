import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useCartStore } from '../store/cartStore';
import { Box, Grid, Card, CardContent, CardMedia, Typography, Button, Pagination, CircularProgress, Alert } from '@mui/material';

const PAGE_SIZE = 8;

const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  const { products, total, loading, error } = useProducts({ page, limit: PAGE_SIZE });
  const pageCount = Math.ceil(total / PAGE_SIZE);
  const { addToCart, loading: cartLoading } = useCartStore();

  return (
    <Box p={4}>
      <Typography variant="h4" mb={4}>Catálogo de productos</Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={3}>
        {products.map(product => (
          <Box key={product._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.imageUrl}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">{product.description}</Typography>
                <Typography variant="subtitle1" color="primary">${product.price}</Typography>
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 1 }}
                  onClick={() => addToCart(product._id)}
                  disabled={cartLoading}
                >
                  Agregar al carrito
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
      {pageCount > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination count={pageCount} page={page} onChange={(_e, val) => setPage(val)} />
        </Box>
      )}
    </Box>
  );
};

export default Home; 