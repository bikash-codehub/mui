"use client";
import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

// Simple sparkline chart using SVG
const SalesChart = ({ data }) => {
  const max = Math.max(...data);
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${100 - (v / max) * 100}`)
    .join(' ');
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Sales Trend
      </Typography>
      <Box sx={{ width: '100%', height: 100 }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%">
          <polyline
            fill="none"
            stroke="#1976d2"
            strokeWidth="2"
            points={points}
          />
        </svg>
      </Box>
    </Paper>
  );
};

export default SalesChart;
