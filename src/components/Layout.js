import { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Avatar,
  MenuItem,
  styled,
  alpha,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  DarkMode as DarkModeIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: alpha('#1C1B23', 0.8),
  backdropFilter: 'blur(10px)',
  borderBottom: `1px solid ${alpha('#fff', 0.1)}`,
  boxShadow: 'none'
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #6C5DD3, #2196F3)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
  letterSpacing: '1px'
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: alpha('#fff', 0.7),
  borderRadius: '8px',
  padding: '6px 16px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: alpha('#fff', 0.05),
    color: '#fff'
  }
}));

const NotificationBadge = styled(Box)(({ theme }) => ({
  width: '8px',
  height: '8px',
  backgroundColor: '#6C5DD3',
  borderRadius: '50%',
  position: 'absolute',
  top: '6px',
  right: '6px'
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: alpha('#6C5DD3', 0.2),
  color: '#6C5DD3',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: alpha('#6C5DD3', 0.3),
  }
}));

const Layout = ({ children }) => {
  const { logout, user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#0A1929' }}>
      <StyledAppBar position="sticky">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <GradientText
              variant="h6"
              component={motion.div}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              TaskMaster
            </GradientText>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <NavButton>Dashboard</NavButton>
            <NavButton>Projects</NavButton>
            <NavButton>Calendar</NavButton>

            <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
              <IconButton color="inherit" sx={{ position: 'relative' }}>
                <NotificationsIcon />
                <NotificationBadge />
              </IconButton>
              
              <IconButton color="inherit">
                <DarkModeIcon />
              </IconButton>

              <IconButton color="inherit">
                <SettingsIcon />
              </IconButton>

              <UserAvatar onClick={handleMenu}>
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </UserAvatar>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    backgroundColor: '#1C1B23',
                    border: `1px solid ${alpha('#fff', 0.1)}`,
                    borderRadius: '12px',
                    boxShadow: `0 4px 20px ${alpha('#000', 0.2)}`,
                    mt: 1.5,
                    '& .MuiMenuItem-root': {
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: alpha('#fff', 0.05)
                      }
                    }
                  }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar sx={{ width: 32, height: 32, mr: 2 }} />
                  Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <SettingsIcon sx={{ width: 20, height: 20, mr: 2 }} />
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon sx={{ width: 20, height: 20, mr: 2 }} />
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </StyledAppBar>

      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        sx={{ 
          position: 'relative',
          zIndex: 1
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
