import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Sidebar from './Sidebar';

// Mock ResizeObserver to prevent errors with MUI components in JSDOM
global.ResizeObserver = require('resize-observer-polyfill');

const theme = createTheme();

const renderWithTheme = (component) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Sidebar Component', () => {
  test('initial render: displays top-level items and hides sub-items', () => {
    renderWithTheme(<Sidebar />);

    // Top-level items should be visible
    expect(screen.getByText('Inbox')).toBeInTheDocument();
    expect(screen.getByText('Drafts')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();

    // Sub-items of "Settings" should initially be hidden
    expect(screen.queryByText('Profile')).not.toBeVisible();
    expect(screen.queryByText('Users')).not.toBeVisible();
    expect(screen.queryByText('Reports')).not.toBeVisible(); 
    
    // Sub-items of "Reports" (which is under "Settings") should also be hidden
    expect(screen.queryByText('Sales Reports')).not.toBeVisible();
    expect(screen.queryByText('Performance Reports')).not.toBeVisible();
  });

  test('expand/collapse functionality for a top-level item', () => {
    renderWithTheme(<Sidebar />);

    const settingsMenuItem = screen.getByText('Settings');
    
    // Initially, children of Settings should not be visible
    expect(screen.queryByText('Profile')).not.toBeVisible();
    expect(screen.queryByText('Users')).not.toBeVisible();
    expect(screen.queryByText('Reports')).not.toBeVisible();

    // Click to expand "Settings"
    fireEvent.click(settingsMenuItem);
    
    expect(screen.getByText('Profile')).toBeVisible();
    expect(screen.getByText('Users')).toBeVisible();
    expect(screen.getByText('Reports')).toBeVisible(); // The nested parent item

    // Click to collapse "Settings"
    fireEvent.click(settingsMenuItem);

    expect(screen.queryByText('Profile')).not.toBeVisible();
    expect(screen.queryByText('Users')).not.toBeVisible();
    expect(screen.queryByText('Reports')).not.toBeVisible();
  });

  test('nested expand/collapse functionality (Settings -> Reports)', () => {
    renderWithTheme(<Sidebar />);

    const settingsMenuItem = screen.getByText('Settings');

    // Initially, "Reports" and its children are not visible
    expect(screen.queryByText('Reports')).not.toBeVisible();
    expect(screen.queryByText('Sales Reports')).not.toBeVisible();
    expect(screen.queryByText('Performance Reports')).not.toBeVisible();

    // Click to expand "Settings"
    fireEvent.click(settingsMenuItem);
    
    const reportsMenuItem = screen.getByText('Reports');
    expect(reportsMenuItem).toBeVisible();
    // Children of "Reports" should still be hidden as "Reports" itself hasn't been expanded
    expect(screen.queryByText('Sales Reports')).not.toBeVisible();
    expect(screen.queryByText('Performance Reports')).not.toBeVisible();

    // Click to expand "Reports"
    fireEvent.click(reportsMenuItem);

    expect(screen.getByText('Sales Reports')).toBeVisible();
    expect(screen.getByText('Performance Reports')).toBeVisible();

    // Click to collapse "Reports"
    fireEvent.click(reportsMenuItem);
    
    expect(screen.queryByText('Sales Reports')).not.toBeVisible();
    expect(screen.queryByText('Performance Reports')).not.toBeVisible();
    // "Reports" itself should still be visible as "Settings" is still expanded
    expect(screen.getByText('Reports')).toBeVisible();


    // Click to collapse "Settings"
    fireEvent.click(settingsMenuItem);
    
    expect(screen.queryByText('Reports')).not.toBeVisible();
    expect(screen.queryByText('Sales Reports')).not.toBeVisible();
    expect(screen.queryByText('Performance Reports')).not.toBeVisible();
  });
});
