/**
 * @jest-environment node
 */

import { createMocks } from 'node-mocks-http'; // Simulate HTTP request and HTTP response
import handler from '@/pages/api/shop/products/armors'; 
import Armors from '@/pages/api/models/ArmorModel';
import { mockArmors } from '../__mocks__/mockArmors';
import mongoose from 'mongoose';
import { Product } from '@/_common/interfaces/shop/Product';

beforeAll(() => {
  //Delete console logs when running test or hide them
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(async () => {
  mongoose.disconnect();
  jest.restoreAllMocks(); // Restaurar todos los mocks
});

describe('GET /api/shop/products/armors', () => {
  it('should return an array of ARMOR products', async () => {

    ////////////////////////// ARRANGE //////////////////////////

    // Simulate data from MongoDB Armor collection
    const mockData = mockArmors;
    
    // Mock the FIND function
    jest.spyOn(Armors, 'find').mockResolvedValue(mockData);

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

    // Verify that armors are the ones retrieved
    expect(responseData).toHaveProperty('armors');

    // Verify that armors is an array
    expect(Array.isArray(responseData.armors)).toBe(true); 

    //Verify that IN THIS CASE armors has a length of 4
    expect(responseData.armors.length).toBe(4);

  });

  it('should have _id, name, image, min_lvl, value and modifiers properties on each armor', async () => {

    ////////////////////////// ARRANGE //////////////////////////

    // Simulate data from MongoDB Armor collection
    const mockData = mockArmors;
    
    // Mock the FIND function
    jest.spyOn(Armors, 'find').mockResolvedValue(mockData);

    const { req, res } = createMocks({
      method: 'GET',
    });

    ////////////////////////// ACT //////////////////////////

    await handler(req, res); 

    ////////////////////////// ASSERT //////////////////////////

    // Parse the string to a JSON
    const responseData = JSON.parse(res._getData());

    // Verify that each armor has the required attributes
    responseData.armors.forEach((armor: Product) => {
      expect(armor).toHaveProperty('_id');
      expect(armor).toHaveProperty('name');
      expect(armor).toHaveProperty('image');
      expect(armor).toHaveProperty('min_lvl');
      expect(armor).toHaveProperty('value');
      expect(armor).toHaveProperty('modifiers');
    });
  })

  it('should handle errors correctly with a 500 status code', async () => {

    ////////////////////////// ARRANGE //////////////////////////

    // Simulate receiving an error
    jest.spyOn(Armors, 'find').mockRejectedValue(new Error('Database connection error'));

    const { req, res } = createMocks({
      method: 'GET',
    });

    ////////////////////////// ACT //////////////////////////

    await handler(req, res);

    ////////////////////////// ASSERT //////////////////////////

     //Verify status code to be 500
    expect(res.statusCode).toBe(500);
    const responseData = JSON.parse(res._getData());

    //Verify that the error is in fact the error that our Armors handler has on his 500 status code response
    expect(responseData).toHaveProperty('error');
    expect(responseData.error).toBe('Internal Server Error'); // O el mensaje de error adecuado
  });

});
