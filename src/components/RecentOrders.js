"use client";
import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography } from '@mui/material';

const RecentOrders = ({ orders }) => (
  <Paper sx={{ p: 2 }}>
    <Typography variant="h6" sx={{ mb: 1 }}>
      Recent Orders
    </Typography>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Customer</TableCell>
          <TableCell>Date</TableCell>
          <TableCell align="right">Amount</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map((o) => (
          <TableRow key={o.id} role="row">
            <TableCell>{o.id}</TableCell>
            <TableCell>{o.customer}</TableCell>
            <TableCell>{o.date}</TableCell>
            <TableCell align="right">${o.amount}</TableCell>
            <TableCell>{o.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

export default RecentOrders;
