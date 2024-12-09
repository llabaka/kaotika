/**
 * @jest-environment node
 */

import { createMocks } from 'node-mocks-http'; // Simulate HTTP request and HTTP response
import handler from '@/pages/api/shop/products/boots'; 
import Boots from '@/pages/api/models/BootsModel';
import { mockBoots } from '../__mocks__/mockBoots';
import mongoose from 'mongoose';
import { Product } from '@/_common/interfaces/shop/Product';
import { Boot } from '@/_common/interfaces/Boot';

beforeAll(() => {
  //Delete console logs when running test or hide them
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(async () => {
  mongoose.disconnect();
  jest.restoreAllMocks(); // Restaurar todos los mocks
});

describe('GET /api/shop/products/boots', () => {
  it('should return an array of BOOTS products', async () => {

    ////////////////////////// ARRANGE //////////////////////////

    // Simulate data from MongoDB Boots collection
    const mockData = mockBoots;
    
    // Mock the FIND function
    jest.spyOn(Boots, 'find').mockResolvedValue(mockData);

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

    // Verify that boots are the ones retrieved
    expect(responseData).toHaveProperty('boots');

    // Verify that boots is an array
    expect(Array.isArray(responseData.boots)).toBe(true); 

    //Verify that IN THIS CASE boots has a length of 4
    expect(responseData.boots.length).toBe(4);

  });

  it('should have _id, name, image, min_lvl, value and modifiers properties on each boot', async () => {

    ////////////////////////// ARRANGE //////////////////////////

    // Simulate data from MongoDB Boots collection
    const mockData = mockBoots;
    
    // Mock the FIND function
    jest.spyOn(Boots, 'find').mockResolvedValue(mockData);

    const { req, res } = createMocks({
      method: 'GET',
    });

    ////////////////////////// ACT //////////////////////////

    await handler(req, res); 

    ////////////////////////// ASSERT //////////////////////////

    // Parse the string to a JSON
    const responseData = JSON.parse(res._getData());

    // Verify that each boot has the required attributes
    responseData.boots.forEach((boot: Boot) => {
      expect(boot).toHaveProperty('_id');
      expect(boot).toHaveProperty('name');
      expect(boot).toHaveProperty('image');
      expect(boot).toHaveProperty('min_lvl');
      expect(boot).toHaveProperty('value');
      expect(boot).toHaveProperty('modifiers');
    });
  })

  it('should handle errors correctly with a 500 status code', async () => {

    ////////////////////////// ARRANGE //////////////////////////

    // Simulate receiving an error
    jest.spyOn(Boots, 'find').mockRejectedValue(new Error('Database connection error'));

    const { req, res } = createMocks({
      method: 'GET',
    });

    ////////////////////////// ACT //////////////////////////

    await handler(req, res);

    ////////////////////////// ASSERT //////////////////////////

     //Verify status code to be 500
    expect(res.statusCode).toBe(500);
    const responseData = JSON.parse(res._getData());

    //Verify that the error is in fact the error that our Boots handler has on his 500 status code response
    expect(responseData).toHaveProperty('error');
    expect(responseData.error).toBe('Internal Server Error'); // O el mensaje de error adecuado
  });

});
