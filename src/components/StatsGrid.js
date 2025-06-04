"use client";
import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';

const StatCard = ({ title, value, change }) => (
  <Paper sx={{ p: 2 }} elevation={1} role="article">
    <Typography variant="subtitle2" color="text.secondary">
      {title}
    </Typography>
    <Typography variant="h6" sx={{ mb: 1 }}>
      {value}
    </Typography>
    <Box sx={{ color: change >= 0 ? 'success.main' : 'error.main' }}>
      {change >= 0 ? '+' : ''}{change}%
    </Box>
  </Paper>
);

const StatsGrid = ({ metrics }) => (
  <Grid container spacing={2}>
    {metrics.map((m, idx) => (
      <Grid item xs={12} sm={6} md={3} key={idx}>
        <StatCard {...m} />
      </Grid>
    ))}
  </Grid>
);

export default StatsGrid;
