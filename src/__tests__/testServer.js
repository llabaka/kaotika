// testServer.ts
import express from 'express';
import next from 'next';
import helmetRoute from '@/pages/api/shop/products/helmets'; // Adjust according to your folder structure
import mongoose from 'mongoose';

let server = null;

export const startServer = async () => {
  const app = express();
  const handle = next({ dev: process.env.NODE_ENV !== 'production' });
  await handle.prepare();

  app.use(express.json()); // Add middleware to handle JSON requests

  // Use the handler for the API route
  app.get('/api/shop/products/helmets', async (req, res) => {
    await helmetRoute(req, res); // Call the actual handler function for the route
  });

  // Start the server on port 3001 (or any port you prefer)
  server = app.listen(3000, () => {
    console.log('Test server running at http://localhost:3001');
  });
};

export const stopServer = async () => {
  if (server) {
    await server.close(); // Close the server after tests
  }
};
