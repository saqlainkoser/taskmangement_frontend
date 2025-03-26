import { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';

const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Other'];

const TaskForm = ({ onSubmit }) => {
  const [task, setTask] = useState({
    description: '',
    category: 'Other',
    completed: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    setTask({
      description: '',
      category: 'Other',
      completed: false
    });
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Task Description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            required
            fullWidth
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={task.category}
              label="Category"
              onChange={(e) => setTask({ ...task, category: e.target.value })}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Add Task
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default TaskForm;
