import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Alert,
  Stack
} from '@mui/material';

const ShortenForm = () => {
  const [longUrl, setLongUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!longUrl || !validateUrl(longUrl)) {
      setError('Please enter a valid URL.');
      return;
    }

    if (validity && (!Number.isInteger(+validity) || +validity <= 0)) {
      setError('Validity must be a positive integer (minutes).');
      return;
    }

    const payload = {
      longUrl,
      validity: validity ? parseInt(validity, 10) : 30,
      shortcode: shortcode || undefined,
    };

    try {
      // Simulate API response
      const generatedCode = shortcode || Math.random().toString(36).substr(2, 5);
      setResult({
        shortUrl: `http://localhost:3000/${generatedCode}`,
        expiry: new Date(Date.now() + (payload.validity || 30) * 60000).toLocaleString(),
      });
    } catch (err) {
      setError('Failed to shorten URL.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ p: 4, mt: 5, borderRadius: '16px' }}>
        <Typography variant="h4" gutterBottom>
          URL Shortener
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Long URL"
              variant="outlined"
              fullWidth
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
            />
            <TextField
              label="Validity (minutes)"
              variant="outlined"
              fullWidth
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
              placeholder="Defaults to 30"
            />
            <TextField
              label="Custom Shortcode (optional)"
              variant="outlined"
              fullWidth
              value={shortcode}
              onChange={(e) => setShortcode(e.target.value)}
            />
            {error && <Alert severity="error">{error}</Alert>}
            <Button variant="contained" type="submit" color="primary">
              SHORTEN
            </Button>
          </Stack>
        </form>

        {result && (
          <Box mt={4}>
            <Alert severity="success">
              <Typography variant="body1">
                <strong>Short URL:</strong>{' '}
                <a href={result.shortUrl} target="_blank" rel="noopener noreferrer">
                  {result.shortUrl}
                </a>
              </Typography>
              <Typography variant="body2">
                <strong>Expires At:</strong> {result.expiry}
              </Typography>
            </Alert>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ShortenForm;
