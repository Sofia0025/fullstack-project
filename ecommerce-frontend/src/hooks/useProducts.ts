import { useEffect, useState } from 'react';
import api from '../utils/api';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
}

export function useProducts(params: { page?: number; limit?: number; category?: string; name?: string } = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.get('/products', { params })
      .then(res => {
        setProducts(res.data.products);
        setTotal(res.data.total);
      })
      .catch(err => {
        setError(err.response?.data?.message || 'Error al cargar productos');
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [JSON.stringify(params)]);

  return { products, total, loading, error };
} 