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
import { Visibility, VisibilityOff, Person, Email } from '@mui/icons-material';
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

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreeToTerms) {
      setError('Please agree to the Terms & Conditions');
      return;
    }
    try {
      await signup(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account');
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
              Create account
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
              label="Full name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />

            <StyledTextField
              fullWidth
              label="Email address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />

            <StyledTextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
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

            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
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
                    I agree to the{' '}
                    <Link
                      to="/terms"
                      style={{
                        color: '#6C5DD3',
                        textDecoration: 'none'
                      }}
                    >
                      Terms & Conditions
                    </Link>
                  </Typography>
                }
              />
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
              Create account
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
              Already have an account?{' '}
              <Link
                to="/login"
                style={{
                  color: '#6C5DD3',
                  textDecoration: 'none',
                  fontWeight: 600
                }}
              >
                Sign in
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

export default Signup;
