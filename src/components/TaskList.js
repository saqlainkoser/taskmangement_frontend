import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Typography,
  Box,
  alpha,
  Chip,
  Tooltip
} from '@mui/material';
import {
  Delete as DeleteIcon,
  AccessTime as AccessTimeIcon,
  Event as EventIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const TaskList = ({ tasks, onToggleComplete, onDelete }) => {
  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (!tasks.length) {
    return (
      <Typography variant="body1" sx={{ color: alpha('#fff', 0.5), textAlign: 'center', padding: 4 }}>
        No tasks found. Add a new task to get started!
      </Typography>
    );
  }

  return (
    <List>
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            key={task._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <ListItem
              secondaryAction={
                <IconButton
                  edge="end"
                  onClick={() => onDelete(task._id)}
                  sx={{ color: alpha('#fff', 0.3), '&:hover': { color: '#f44336', backgroundColor: alpha('#f44336', 0.1) } }}
                >
                  <DeleteIcon />
                </IconButton>
              }
              sx={{
                backgroundColor: alpha('#fff', 0.03),
                borderRadius: '12px',
                marginBottom: 1,
                '&:hover': {
                  backgroundColor: alpha('#fff', 0.05),
                },
                '& .checkbox-container': {
                  opacity: 0,
                  transition: 'opacity 0.2s ease-in-out',
                },
                '&:hover .checkbox-container': {
                  opacity: 1
                }
              }}
            >
              <Box className="checkbox-container" sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                <Checkbox
                  edge="start"
                  checked={task.completed}
                  onChange={() => onToggleComplete(task._id)}
                  sx={{ color: alpha('#fff', 0.3), '&.Mui-checked': { color: '#6C5DD3', opacity: 1 } }}
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 100 }}>
                <Box
                  sx={{
                    backgroundColor: alpha('#4CAF50', 0.1),
                    color: '#4CAF50',
                    borderRadius: '8px',
                    padding: '2px 8px',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <EventIcon />
                  {formatDate(task.createdAt)}
                </Box>
              </Box>

              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography
                      variant="body1"
                      component="span"
                      sx={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? alpha('#fff', 0.5) : '#fff'
                      }}
                    >
                      {task.title || task.description || 'Untitled Task'}
                    </Typography>
                    <Chip
                      label={task.category || 'Other'}
                      sx={{
                        backgroundColor: (theme) => alpha(getColor(task.category), 0.1),
                        color: (theme) => getColor(task.category),
                        borderRadius: '8px',
                        height: '24px',
                        '& .MuiChip-label': {
                          padding: '0 8px',
                        }
                      }}
                      size="small"
                    />
                  </Box>
                }
                secondary={
                  <Box component="span">
                    {task.description && task.title && (
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{
                          color: task.completed ? alpha('#fff', 0.3) : alpha('#fff', 0.7),
                          textDecoration: task.completed ? 'line-through' : 'none',
                          display: 'block',
                          mb: 0.5
                        }}
                      >
                        {task.description}
                      </Typography>
                    )}
                    {task.dueDate && (
                      <Tooltip title={isOverdue(task.dueDate) ? "Task is overdue!" : ""}>
                        <Box
                          component="span"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            color: isOverdue(task.dueDate) ? '#f44336' : alpha('#fff', 0.5),
                            fontSize: '0.75rem'
                          }}
                        >
                          <AccessTimeIcon sx={{ fontSize: 16 }} />
                          {formatDate(task.dueDate)}
                        </Box>
                      </Tooltip>
                    )}
                  </Box>
                }
              />
            </ListItem>
          </motion.div>
        ))}
      </AnimatePresence>
    </List>
  );
};

const getColor = (category) => {
  switch (category) {
    case 'Work':
      return '#4CAF50';
    case 'Personal':
      return '#2196F3';
    case 'Shopping':
      return '#FF9800';
    case 'Health':
      return '#E91E63';
    default:
      return '#9C27B0';
  }
};

export default TaskList;
