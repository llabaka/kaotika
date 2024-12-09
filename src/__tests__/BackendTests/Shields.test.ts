/**
 * @jest-environment node
 */

import { createMocks } from 'node-mocks-http'; // Simulate HTTP request and HTTP response
import handler from '@/pages/api/shop/products/shields'; 
import Shields from '@/pages/api/models/ShieldsModel';
import { mockShields } from '../__mocks__/mockShields';
import mongoose from 'mongoose';
import { Product } from '@/_common/interfaces/shop/Product';
import { Shield } from '@/_common/interfaces/Shield';

beforeAll(() => {
  //Delete console logs when running test or hide them
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(async () => {
  mongoose.disconnect();
  jest.restoreAllMocks(); // Restaurar todos los mocks
});

describe('GET /api/shop/products/shields', () => {
  it('should return an array of SHIELD products', async () => {

    ////////////////////////// ARRANGE //////////////////////////

    // Simulate data from MongoDB Shield collection
    const mockData = mockShields;
    
    // Mock the FIND function
    jest.spyOn(Shields, 'find').mockResolvedValue(mockData);

    const { req, res } = createMocks({
      method: 'GET',
    });

    ////////////////////////// ACT //////////////////////////

    await handler(req, res); 

    ////////////////////////// ASSERT //////////////////////////

     // Verify status code to be 200
    expect(res.statusCode).toBe(200);

    // Parse the stshield to a JSON
    const responseData = JSON.parse(res._getData());

    // Verify that shields are the ones retrieved
    expect(responseData).toHaveProperty('shields');

    // Verify that shields is an array
    expect(Array.isArray(responseData.shields)).toBe(true); 

    //Verify that IN THIS CASE shields has a length of 4
    expect(responseData.shields.length).toBe(4);

  });

  it('should have _id, name, image, min_lvl, value and modifiers properties on each shield', async () => {

    ////////////////////////// ARRANGE //////////////////////////

    // Simulate data from MongoDB Shield collection
    const mockData = mockShields;
    
    // Mock the FIND function
    jest.spyOn(Shields, 'find').mockResolvedValue(mockData);

    const { req, res } = createMocks({
      method: 'GET',
    });

    ////////////////////////// ACT //////////////////////////

    await handler(req, res); 

    ////////////////////////// ASSERT //////////////////////////

    // Parse the stshield to a JSON
    const responseData = JSON.parse(res._getData());

    // Verify that each shield has the required attributes
    responseData.shields.forEach((shield: Shield) => {
      expect(shield).toHaveProperty('_id');
      expect(shield).toHaveProperty('name');
      expect(shield).toHaveProperty('image');
      expect(shield).toHaveProperty('min_lvl');
      expect(shield).toHaveProperty('value');
      expect(shield).toHaveProperty('modifiers');
    });
  })

  it('should handle errors correctly with a 500 status code', async () => {

    ////////////////////////// ARRANGE //////////////////////////

    // Simulate receiving an error
    jest.spyOn(Shields, 'find').mockRejectedValue(new Error('Database connection error'));

    const { req, res } = createMocks({
      method: 'GET',
    });

    ////////////////////////// ACT //////////////////////////

    await handler(req, res);

    ////////////////////////// ASSERT //////////////////////////

     //Verify status code to be 500
    expect(res.statusCode).toBe(500);
    const responseData = JSON.parse(res._getData());

    //Verify that the error is in fact the error that our Shields handler has on his 500 status code response
    expect(responseData).toHaveProperty('error');
    expect(responseData.error).toBe('Internal Server Error'); // O el mensaje de error adecuado
  });

});
