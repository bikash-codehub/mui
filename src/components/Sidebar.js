import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles'; // Import useTheme
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

// Icons used in menuItems
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import StoreIcon from '@mui/icons-material/Store';
import AssessmentIcon from '@mui/icons-material/Assessment';

// Icons for expand/collapse
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const drawerWidth = 240;

const menuItems = [
  { id: 'inbox', text: 'Inbox', icon: InboxIcon },
  { id: 'drafts', text: 'Drafts', icon: DraftsIcon },
  { 
    id: 'settings', 
    text: 'Settings', 
    icon: SettingsIcon,
    children: [
      { id: 'profile', text: 'Profile', icon: AccountCircleIcon },
      { id: 'users', text: 'Users', icon: GroupIcon },
      { 
        id: 'reports', 
        text: 'Reports', 
        icon: AssessmentIcon,
        children: [
          { id: 'sales-reports', text: 'Sales Reports', icon: AssessmentIcon },
          { id: 'performance-reports', text: 'Performance Reports', icon: AssessmentIcon },
        ]
      },
    ]
  },
  { id: 'products', text: 'Products', icon: StoreIcon },
];

const Sidebar = () => {
  const theme = useTheme(); // Get the theme object
  const [open, setOpen] = useState({});
  // For demonstration, let's assume 'inbox' is selected by default.
  // In a real app, this would likely come from routing or other state management.
  const [selectedItem, setSelectedItem] = useState('inbox'); 

  const handleClick = (id) => {
    setOpen(prevOpen => ({ ...prevOpen, [id]: !prevOpen[id] }));
    // In a real app, clicking an item might also change the selected item
    // setSelectedItem(id); 
  };

  const handleItemClick = (id) => {
    setSelectedItem(id);
    // If it's a parent item, also toggle its open state
    if (menuItems.find(item => item.id === id && item.children)) {
        // This is a simplified toggle for parent items when clicked directly
        // You might want a more sophisticated logic depending on UX requirements
        handleClick(id);
    }
  };


  const renderMenuItems = (items, depth = 0) => {
    return items.map((item) => {
      const IconComponent = item.icon;
      const hasChildren = item.children && item.children.length > 0;
      const isSelected = item.id === selectedItem;

      const listItemButtonSx = {
        py: 1.25, // Adjusted padding for comfort
        pl: theme.spacing(depth * 2 + 3), // Indentation using theme.spacing
        color: isSelected ? theme.palette.primary.main : theme.palette.text.secondary, // Dynamic color
        backgroundColor: isSelected ? theme.palette.action.selected : 'transparent', // Dynamic background for selected
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
        ...(isSelected && { // More prominent selected style
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': {
                backgroundColor: theme.palette.primary.dark, // Darken on hover if primary.main
            },
        }),
      };
      
      // Special styling for 'Inbox' item (first item) for demonstration as per instructions
      // This is now handled by the general `isSelected` logic above.
      // If item.id === 'inbox', specific styles can be merged here if needed.

      if (hasChildren) {
        return (
          <React.Fragment key={item.id}>
            <ListItemButton 
              onClick={() => handleClick(item.id)} 
              sx={listItemButtonSx}
            >
              <ListItemIcon sx={{ 
                minWidth: theme.spacing(5), 
                color: 'inherit' // Inherit color from ListItemButton
              }}>
                <IconComponent />
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontWeight: depth === 0 ? 'medium' : 'normal', // Bolder for top-level
                  fontSize: depth === 0 ? '0.95rem' : '0.9rem', // Slightly different sizes
                }} 
              />
              {open[item.id] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open[item.id]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderMenuItems(item.children, depth + 1)}
              </List>
            </Collapse>
          </React.Fragment>
        );
      }

      return (
        <ListItemButton 
          key={item.id} 
          onClick={() => handleItemClick(item.id)} // Allow selecting non-parent items
          sx={listItemButtonSx}
        >
          <ListItemIcon sx={{ 
            minWidth: theme.spacing(5),
            color: 'inherit' // Inherit color from ListItemButton
          }}>
            <IconComponent />
          </ListItemIcon>
          <ListItemText 
            primary={item.text}
            primaryTypographyProps={{ 
              fontWeight: depth === 0 ? 'medium' : 'normal',
              fontSize: depth === 0 ? '0.95rem' : '0.9rem',
            }} 
          />
        </ListItemButton>
      );
    });
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.paper, // Use theme background
          borderRight: `1px solid ${theme.palette.divider}`, // Use theme divider for border
        },
      }}
    >
      <List component="nav" sx={{ pt: theme.spacing(1) }}> {/* Add some padding top to the list */}
        {renderMenuItems(menuItems)}
      </List>
    </Drawer>
  );
};

export default Sidebar;
