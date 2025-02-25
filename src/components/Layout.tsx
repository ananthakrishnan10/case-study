import { Outlet } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Box } from '@mui/material';

export const Layout = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">News App</Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ flexGrow: 1, my: 4 }}>
        <Outlet />
      </Container>
      <AppBar position="static" sx={{ mt: 'auto', top: 'auto', bottom: 0 }}>
        <Toolbar>
          <Typography variant="body2" align="center" sx={{ width: '100%' }}>
            © {new Date().getFullYear()} News App. All rights reserved.
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
