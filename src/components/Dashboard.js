"use client";
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import StatsGrid from './StatsGrid';
import RecentOrders from './RecentOrders';
import SalesChart from './SalesChart';

const Dashboard = ({ metrics = [], orders = [], sales = [] }) => (
  <Box sx={{ p: 2 }}>
    <Typography variant="h5" sx={{ mb: 2 }}>
      Dashboard Overview
    </Typography>
    <StatsGrid metrics={metrics} />
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid item xs={12} md={8}>
        <SalesChart data={sales} />
      </Grid>
      <Grid item xs={12} md={4}>
        <RecentOrders orders={orders} />
      </Grid>
    </Grid>
  </Box>
);

export default Dashboard;
