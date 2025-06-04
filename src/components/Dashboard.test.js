import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Dashboard from './Dashboard';

// Mock ResizeObserver for MUI components
global.ResizeObserver = require('resize-observer-polyfill');

const theme = createTheme();
const renderWithTheme = (ui) => render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('Dashboard Component', () => {
  const metrics = [
    { title: 'Users', value: 100, change: 3 },
    { title: 'Orders', value: 50, change: -1 },
  ];
  const orders = [
    { id: 1, customer: 'Jane', amount: 10, status: 'Shipped', date: '2025-06-01' },
  ];
  const sales = [1, 2, 3];

  test('renders metric titles and values', () => {
    renderWithTheme(<Dashboard metrics={metrics} orders={orders} sales={sales} />);
    metrics.forEach(({ title, value }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });

  test('renders recent orders table', () => {
    renderWithTheme(<Dashboard metrics={metrics} orders={orders} sales={sales} />);
    expect(screen.getByText('Recent Orders')).toBeInTheDocument();
    expect(screen.getByRole('row')).toBeInTheDocument();
  });
});
