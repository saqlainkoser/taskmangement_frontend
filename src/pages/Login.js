import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  styled,
  alpha
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';

// Styled components
const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#1C1B23',
  color: '#fff'
}));

const LeftSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '40px',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(76, 0, 255, 0.05) 0%, rgba(76, 0, 255, 0.05) 100%)',
    zIndex: 0
  }
}));

const RightSection = styled(Box)(({ theme }) => ({
  flex: 1,
  background: `url('https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '40px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(10px)'
  },
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: alpha('#fff', 0.05),
    borderRadius: '12px',
    '&:hover': {
      backgroundColor: alpha('#fff', 0.08),
    },
    '&.Mui-focused': {
      backgroundColor: alpha('#fff', 0.08),
    }
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: alpha('#fff', 0.1),
  },
  '& .MuiInputLabel-root': {
    color: alpha('#fff', 0.7),
  },
  '& .MuiOutlinedInput-input': {
    color: '#fff',
  },
  '& .MuiInputAdornment-root': {
    color: alpha('#fff', 0.7),
  },
  marginBottom: theme.spacing(2)
}));

const SocialButton = styled(Button)(({ theme }) => ({
  backgroundColor: alpha('#fff', 0.05),
  color: '#fff',
  borderRadius: '12px',
  padding: '12px',
  flex: 1,
  '&:hover': {
    backgroundColor: alpha('#fff', 0.1),
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#6C5DD3',
  color: '#fff',
  borderRadius: '12px',
  padding: '12px',
  fontSize: '1rem',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#5B4FC9',
  }
}));

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to login');
    }
  };

  return (
    <PageContainer>
      <LeftSection>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{
            width: '100%',
            maxWidth: '400px',
            zIndex: 1,
            position: 'relative'
          }}
        >
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Sign in
            </Typography>
            <Button
              component={Link}
              to="/"
              sx={{ color: 'rgba(255,255,255,0.7)' }}
            >
              Back to website
            </Button>
          </Box>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <StyledTextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <StyledTextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: 'rgba(255,255,255,0.7)' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 3
            }}>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    sx={{ 
                      color: 'rgba(255,255,255,0.7)',
                      '&.Mui-checked': {
                        color: '#6C5DD3',
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                    Remember me
                  </Typography>
                }
              />
              <Link
                to="/forgot-password"
                style={{
                  color: '#6C5DD3',
                  textDecoration: 'none',
                  fontSize: '0.9rem'
                }}
              >
                Forgot password?
              </Link>
            </Box>

            {error && (
              <Typography 
                color="error" 
                sx={{ 
                  mb: 2,
                  backgroundColor: alpha('#f44336', 0.1),
                  padding: '10px',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}
              >
                {error}
              </Typography>
            )}

            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mb: 2 }}
            >
              Sign in
            </StyledButton>

            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                Or register with
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <SocialButton startIcon={<GoogleIcon />}>
                Google
              </SocialButton>
              <SocialButton startIcon={<AppleIcon />}>
                Apple
              </SocialButton>
            </Box>

            <Typography 
              variant="body2" 
              align="center" 
              sx={{ color: 'rgba(255,255,255,0.7)' }}
            >
              Don't have an account?{' '}
              <Link
                to="/signup"
                style={{
                  color: '#6C5DD3',
                  textDecoration: 'none',
                  fontWeight: 600
                }}
              >
                Create account
              </Link>
            </Typography>
          </form>
        </Box>
      </LeftSection>

      <RightSection>
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          sx={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            maxWidth: '500px'
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Task Manager
          </Typography>
          <Typography
            variant="h6"
            sx={{ opacity: 0.9 }}
          >
            Capturing Moments, Creating Memories
          </Typography>
        </Box>
      </RightSection>
    </PageContainer>
  );
};

export default Login;
