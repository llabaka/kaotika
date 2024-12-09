import request from 'supertest';
import mongoose from 'mongoose';
import { startServer, stopServer } from '../testServer';
import Helmets from '@/pages/api/models/HelmetModel';

beforeAll(async () => {
  jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress error logs
  await startServer(); // Start the test server before tests
});

afterAll(async () => {
  await mongoose.disconnect(); // Disconnect from MongoDB after the tests
  await stopServer(); // Stop the server after all tests
  jest.restoreAllMocks(); // Restore mocks
});

describe('GET /api/shop/products/helmets', () => {
  it('should return an array of helmets products', async () => {
    const mockData = [{ name: 'Helmet 1', price: 100 }, { name: 'Helmet 2', price: 150 }];
    
    // Mock the Helmets.find method to return mock data
    jest.spyOn(Helmets, 'find').mockResolvedValue(mockData);

    // Make a GET request to the fake server
    const response = await request('http://localhost:3001')
      .get('/api/shop/products/helmets'); // This corresponds to the route you set up in testServer.ts

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('helmets');
    expect(Array.isArray(response.body.helmets)).toBe(true);
    expect(response.body.helmets.length).toBe(2);
    expect(response.body.helmets[0].name).toBe('Helmet 1');
    expect(response.body.helmets[1].name).toBe('Helmet 2');
  });

  it('should handle errors correctly with a 500 status code', async () => {
    // Simulate a database error by rejecting the promise returned by Helmets.find
    jest.spyOn(Helmets, 'find').mockRejectedValue(new Error('Database connection error'));

    // Make a GET request to the fake server
    const response = await request('http://localhost:3001')
      .get('/api/shop/products/helmets');

    // Assertions for error handling
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Internal Server Error');
  });
});
