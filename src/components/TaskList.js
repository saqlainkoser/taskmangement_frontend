import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Paper,
  Chip,
  Typography
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const getCategoryColor = (category) => {
  const colors = {
    Work: 'primary',
    Personal: 'secondary',
    Shopping: 'success',
    Health: 'error',
    Other: 'default'
  };
  return colors[category] || 'default';
};

const TaskList = ({ tasks, onToggleComplete, onDelete }) => {
  if (!tasks.length) {
    return (
      <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body1" color="textSecondary">
          No tasks yet. Add some tasks to get started!
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={2}>
      <List>
        {tasks.map((task) => (
          <ListItem
            key={task._id}
            sx={{
              borderBottom: '1px solid #eee',
              '&:last-child': { borderBottom: 'none' }
            }}
          >
            <Checkbox
              checked={task.completed}
              onChange={() => onToggleComplete(task._id)}
              color="primary"
            />
            <ListItemText
              primary={task.description}
              secondary={
                <Chip
                  label={task.category}
                  size="small"
                  color={getCategoryColor(task.category)}
                  sx={{ mt: 1 }}
                />
              }
              sx={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'text.secondary' : 'text.primary'
              }}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onDelete(task._id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TaskList;
