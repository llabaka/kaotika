/**
 * @jest-environment node
 */

import { createMocks } from 'node-mocks-http'; // Simulate HTTP request and HTTP response
import handler from '@/pages/api/shop/products/weapons'; 
import Weapons from '@/pages/api/models/WeaponsModel';
import { mockWeapons } from '../__mocks__/mockWeapons';
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

describe('GET /api/shop/products/weapons', () => {
  it('should return an array of WEAPON products', async () => {

    ////////////////////////// ARRANGE //////////////////////////

    // Simulate data from MongoDB Weapon collection
    const mockData = mockWeapons;
    
    // Mock the FIND function
    jest.spyOn(Weapons, 'find').mockResolvedValue(mockData);

    const { req, res } = createMocks({
      method: 'GET',
    });

    ////////////////////////// ACT //////////////////////////

    await handler(req, res); 

    ////////////////////////// ASSERT //////////////////////////

     // Verify status code to be 200
    expect(res.statusCode).toBe(200);

    // Parse the stweapon to a JSON
    const responseData = JSON.parse(res._getData());

    // Verify that weapons are the ones retrieved
    expect(responseData).toHaveProperty('weapons');

    // Verify that weapons is an array
    expect(Array.isArray(responseData.weapons)).toBe(true); 

    //Verify that IN THIS CASE weapons has a length of 4
    expect(responseData.weapons.length).toBe(4);

  });

  it('should have _id, name, image, min_lvl, value and modifiers properties on each weapon', async () => {

    ////////////////////////// ARRANGE //////////////////////////

    // Simulate data from MongoDB Weapon collection
    const mockData = mockWeapons;
    
    // Mock the FIND function
    jest.spyOn(Weapons, 'find').mockResolvedValue(mockData);

    const { req, res } = createMocks({
      method: 'GET',
    });

    ////////////////////////// ACT //////////////////////////

    await handler(req, res); 

    ////////////////////////// ASSERT //////////////////////////

    // Parse the stweapon to a JSON
    const responseData = JSON.parse(res._getData());

    // Verify that each weapon has the required attributes
    responseData.weapons.forEach((weapon: Product) => {
      expect(weapon).toHaveProperty('_id');
      expect(weapon).toHaveProperty('name');
      expect(weapon).toHaveProperty('image');
      expect(weapon).toHaveProperty('min_lvl');
      expect(weapon).toHaveProperty('value');
      expect(weapon).toHaveProperty('modifiers');
    });
  })

  it('should handle errors correctly with a 500 status code', async () => {

    ////////////////////////// ARRANGE //////////////////////////

    // Simulate receiving an error
    jest.spyOn(Weapons, 'find').mockRejectedValue(new Error('Database connection error'));

    const { req, res } = createMocks({
      method: 'GET',
    });

    ////////////////////////// ACT //////////////////////////

    await handler(req, res);

    ////////////////////////// ASSERT //////////////////////////

     //Verify status code to be 500
    expect(res.statusCode).toBe(500);
    const responseData = JSON.parse(res._getData());

    //Verify that the error is in fact the error that our Weapons handler has on his 500 status code response
    expect(responseData).toHaveProperty('error');
    expect(responseData.error).toBe('Internal Server Error'); // O el mensaje de error adecuado
  });

});
