import React from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

function StatsPage() {
  const urls = JSON.parse(localStorage.getItem("shortUrls") || "[]");

  return (
    <Container>
      <Typography variant="h5" gutterBottom>URL Analytics</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Short URL</TableCell>
            <TableCell>Original URL</TableCell>
            <TableCell>Clicks</TableCell>
            <TableCell>Expiry</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urls.map((u) => (
            <TableRow key={u.shortcode}>
              <TableCell>{`http://localhost:3000/${u.shortcode}`}</TableCell>
              <TableCell>{u.originalUrl}</TableCell>
              <TableCell>{u.clicks.length}</TableCell>
              <TableCell>{new Date(u.expiresAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default StatsPage;
