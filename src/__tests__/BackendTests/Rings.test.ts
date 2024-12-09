/**
 * @jest-environment node
 */

import { createMocks } from 'node-mocks-http'; // Simulate HTTP request and HTTP response
import handler from '@/pages/api/shop/products/rings'; 
import Rings from '@/pages/api/models/RingsModel';
import { mockRings } from '../__mocks__/mockRings';
import mongoose from 'mongoose';
import { Product } from '@/_common/interfaces/shop/Product';
import { Ring } from '@/_common/interfaces/Ring';

beforeAll(() => {
  //Delete console logs when running test or hide them
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(async () => {
  mongoose.disconnect();
  jest.restoreAllMocks(); // Restaurar todos los mocks
});

describe('GET /api/shop/products/rings', () => {
  it('should return an array of RING products', async () => {

    ////////////////////////// ARRANGE //////////////////////////

    // Simulate data from MongoDB Ring collection
    const mockData = mockRings;
    
    // Mock the FIND function
    jest.spyOn(Rings, 'find').mockResolvedValue(mockData);

    const { req, res } = createMocks({
      method: 'GET',
    });

    ////////////////////////// ACT //////////////////////////

    await handler(req, res); 

    ////////////////////////// ASSERT //////////////////////////

     // Verify status code to be 200
    expect(res.statusCode).toBe(200);

    // Parse the string to a JSON
    const responseData = JSON.parse(res._getData());

    // Verify that rings are the ones retrieved
    expect(responseData).toHaveProperty('rings');

    // Verify that rings is an array
    expect(Array.isArray(responseData.rings)).toBe(true); 

    //Verify that IN THIS CASE rings has a length of 4
    expect(responseData.rings.length).toBe(4);

  });

  it('should have _id, name, image, min_lvl, value and modifiers properties on each ring', async () => {

    ////////////////////////// ARRANGE //////////////////////////

    // Simulate data from MongoDB Ring collection
    const mockData = mockRings;
    
    // Mock the FIND function
    jest.spyOn(Rings, 'find').mockResolvedValue(mockData);

    const { req, res } = createMocks({
      method: 'GET',
    });

    ////////////////////////// ACT //////////////////////////

    await handler(req, res); 

    ////////////////////////// ASSERT //////////////////////////

    // Parse the string to a JSON
    const responseData = JSON.parse(res._getData());

    // Verify that each ring has the required attributes
    responseData.rings.forEach((ring: Ring) => {
      expect(ring).toHaveProperty('_id');
      expect(ring).toHaveProperty('name');
      expect(ring).toHaveProperty('image');
      expect(ring).toHaveProperty('min_lvl');
      expect(ring).toHaveProperty('value');
      expect(ring).toHaveProperty('modifiers');
    });
  })

  it('should handle errors correctly with a 500 status code', async () => {

    ////////////////////////// ARRANGE //////////////////////////

    // Simulate receiving an error
    jest.spyOn(Rings, 'find').mockRejectedValue(new Error('Database connection error'));

    const { req, res } = createMocks({
      method: 'GET',
    });

    ////////////////////////// ACT //////////////////////////

    await handler(req, res);

    ////////////////////////// ASSERT //////////////////////////

     //Verify status code to be 500
    expect(res.statusCode).toBe(500);
    const responseData = JSON.parse(res._getData());

    //Verify that the error is in fact the error that our Rings handler has on his 500 status code response
    expect(responseData).toHaveProperty('error');
    expect(responseData.error).toBe('Internal Server Error'); // O el mensaje de error adecuado
  });

});
