import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

function getUser() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

const Header: React.FC = () => {
  const { items } = useCartStore();
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
          Ecommerce
        </Typography>
        <Button color="inherit" component={Link} to="/">Inicio</Button>
        <IconButton color="inherit" component={Link} to="/cart">
          <Badge badgeContent={items.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/profile">Perfil</Button>
            {user.role === 'admin' && (
              <>
                <Button color="inherit" component={Link} to="/admin/products">Admin Productos</Button>
                <Button color="inherit" component={Link} to="/admin/orders">Órdenes</Button>
                <Button color="inherit" component={Link} to="/admin/users">Usuarios</Button>
              </>
            )}
            <Button color="inherit" onClick={handleLogout}>Salir</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Registro</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header; 