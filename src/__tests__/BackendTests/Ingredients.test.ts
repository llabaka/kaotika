/**
 * @jest-environment node
 */

import { createMocks } from 'node-mocks-http'; // Simulate HTTP request and HTTP response
import handler from '@/pages/api/shop/products/ingredients'; 
import Ingredients from '@/pages/api/models/IngredientsModel';
import { mockIngredients } from '../__mocks__/mockIngredients';
import mongoose from 'mongoose';
import { Product } from '@/_common/interfaces/shop/Product';
import { Ingredient } from '@/_common/interfaces/shop/Product';

beforeAll(() => {
  //Delete console logs when running test or hide them
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(async () => {
  mongoose.disconnect();
  jest.restoreAllMocks(); // Restaurar todos los mocks
});

describe('GET /api/shop/products/ingredients', () => {
  it('should return an array of INGREDIENT products', async () => {

    ////////////////////////// ARRANGE //////////////////////////

    // Simulate data from MongoDB Ingredient collection
    const mockData = mockIngredients;
    
    // Mock the FIND function
    jest.spyOn(Ingredients, 'find').mockResolvedValue(mockData);

    const { req, res } = createMocks({
      method: 'GET',
    });

    ////////////////////////// ACT //////////////////////////

    await handler(req, res); 

    ////////////////////////// ASSERT //////////////////////////

     // Verify status code to be 200
    expect(res.statusCode).toBe(200);

    // Parse the stingredient to a JSON
    const responseData = JSON.parse(res._getData());

    // Verify that ingredients are the ones retrieved
    expect(responseData).toHaveProperty('ingredients');

    // Verify that ingredients is an array
    expect(Array.isArray(responseData.ingredients)).toBe(true); 

    //Verify that IN THIS CASE ingredients has a length of 4
    expect(responseData.ingredients.length).toBe(4);

  });

  it('should have _id, name, image and value properties on each ingredient', async () => {

    ////////////////////////// ARRANGE //////////////////////////

    // Simulate data from MongoDB Ingredient collection
    const mockData = mockIngredients;
    
    // Mock the FIND function
    jest.spyOn(Ingredients, 'find').mockResolvedValue(mockData);

    const { req, res } = createMocks({
      method: 'GET',
    });

    ////////////////////////// ACT //////////////////////////

    await handler(req, res); 

    ////////////////////////// ASSERT //////////////////////////

    // Parse the stingredient to a JSON
    const responseData = JSON.parse(res._getData());

    // Verify that each ingredient has the required attributes
    responseData.ingredients.forEach((ingredient: Ingredient) => {
      expect(ingredient).toHaveProperty('_id');
      expect(ingredient).toHaveProperty('name');
      expect(ingredient).toHaveProperty('image');
      expect(ingredient).toHaveProperty('value');
    });
  })

  it('should handle errors correctly with a 500 status code', async () => {

    ////////////////////////// ARRANGE //////////////////////////

    // Simulate receiving an error
    jest.spyOn(Ingredients, 'find').mockRejectedValue(new Error('Database connection error'));

    const { req, res } = createMocks({
      method: 'GET',
    });

    ////////////////////////// ACT //////////////////////////

    await handler(req, res);

    ////////////////////////// ASSERT //////////////////////////

     //Verify status code to be 500
    expect(res.statusCode).toBe(500);
    const responseData = JSON.parse(res._getData());

    //Verify that the error is in fact the error that our Ingredients handler has on his 500 status code response
    expect(responseData).toHaveProperty('error');
    expect(responseData.error).toBe('Internal Server Error'); // O el mensaje de error adecuado
  });

});
