import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  styled,
  alpha,
  IconButton
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

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
  marginBottom: theme.spacing(2)
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: alpha('#fff', 0.05),
  borderRadius: '12px',
  color: '#fff',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: alpha('#fff', 0.1),
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: alpha('#fff', 0.2),
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#6C5DD3',
  },
  '& .MuiSelect-icon': {
    color: alpha('#fff', 0.7),
  }
}));

const FormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: alpha('#fff', 0.03),
  borderRadius: '16px',
  padding: theme.spacing(3),
  position: 'relative'
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2)
}));

const SaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#6C5DD3',
  color: '#fff',
  borderRadius: '12px',
  padding: theme.spacing(1, 3),
  '&:hover': {
    backgroundColor: '#5B4FC9',
  }
}));

const CancelButton = styled(Button)(({ theme }) => ({
  backgroundColor: alpha('#fff', 0.05),
  color: '#fff',
  borderRadius: '12px',
  padding: theme.spacing(1, 3),
  '&:hover': {
    backgroundColor: alpha('#fff', 0.1),
  }
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(2),
  top: theme.spacing(2),
  color: alpha('#fff', 0.7),
  '&:hover': {
    backgroundColor: alpha('#fff', 0.1),
  }
}));

const TaskForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Other',
    dueDate: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      createdAt: new Date().toISOString()
    });
    setFormData({
      title: '',
      description: '',
      category: 'Other',
      dueDate: ''
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <FormContainer>
        <form onSubmit={handleSubmit}>
          {onCancel && (
            <CloseButton onClick={onCancel}>
              <CloseIcon />
            </CloseButton>
          )}
          
          <StyledTextField
            name="title"
            label="Task Title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
          />

          <StyledTextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <FormControl fullWidth>
              <StyledSelect
                name="category"
                value={formData.category}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value="Work">Work</MenuItem>
                <MenuItem value="Personal">Personal</MenuItem>
                <MenuItem value="Shopping">Shopping</MenuItem>
                <MenuItem value="Health">Health</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </StyledSelect>
            </FormControl>

            <StyledTextField
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ mb: 0 }}
            />
          </Box>

          <ButtonContainer>
            <SaveButton
              type="submit"
              variant="contained"
              fullWidth
            >
              Save Task
            </SaveButton>
            {onCancel && (
              <CancelButton
                onClick={onCancel}
                fullWidth
              >
                Cancel
              </CancelButton>
            )}
          </ButtonContainer>
        </form>
      </FormContainer>
    </motion.div>
  );
};

export default TaskForm;
