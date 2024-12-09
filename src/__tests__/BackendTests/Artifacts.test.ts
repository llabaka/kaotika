/**
 * @jest-environment node
 */

import { createMocks } from 'node-mocks-http'; // Simulate HTTP request and HTTP response
import handler from '@/pages/api/shop/products/artifacts'; 
import Artifacts from '@/pages/api/models/ArtifactsModel';
import { mockArtifacts } from '../__mocks__/mockArtifacts';
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

describe('GET /api/shop/products/artifacts', () => {
  it('should return an array of ARTIFACT products', async () => {

    ////////////////////////// ARRANGE //////////////////////////

    // Simulate data from MongoDB Artifact collection
    const mockData = mockArtifacts;
    
    // Mock the FIND function
    jest.spyOn(Artifacts, 'find').mockResolvedValue(mockData);

    const { req, res } = createMocks({
      method: 'GET',
    });

    ////////////////////////// ACT //////////////////////////

    await handler(req, res); 

    ////////////////////////// ASSERT //////////////////////////

     // Verify status code to be 200
    expect(res.statusCode).toBe(200);

    // Parse the startifact to a JSON
    const responseData = JSON.parse(res._getData());

    // Verify that artifacts are the ones retrieved
    expect(responseData).toHaveProperty('artifacts');

    // Verify that artifacts is an array
    expect(Array.isArray(responseData.artifacts)).toBe(true); 

    //Verify that IN THIS CASE artifacts has a length of 4
    expect(responseData.artifacts.length).toBe(4);

  });

  it('should have _id, name, image, min_lvl, value and modifiers properties on each artifact', async () => {

    ////////////////////////// ARRANGE //////////////////////////

    // Simulate data from MongoDB Artifact collection
    const mockData = mockArtifacts;
    
    // Mock the FIND function
    jest.spyOn(Artifacts, 'find').mockResolvedValue(mockData);

    const { req, res } = createMocks({
      method: 'GET',
    });

    ////////////////////////// ACT //////////////////////////

    await handler(req, res); 

    ////////////////////////// ASSERT //////////////////////////

    // Parse the startifact to a JSON
    const responseData = JSON.parse(res._getData());

    // Verify that each artifact has the required attributes
    responseData.artifacts.forEach((artifact: Product) => {
      expect(artifact).toHaveProperty('_id');
      expect(artifact).toHaveProperty('name');
      expect(artifact).toHaveProperty('image');
      expect(artifact).toHaveProperty('min_lvl');
      expect(artifact).toHaveProperty('value');
      expect(artifact).toHaveProperty('modifiers');
    });
  })

  it('should handle errors correctly with a 500 status code', async () => {

    ////////////////////////// ARRANGE //////////////////////////

    // Simulate receiving an error
    jest.spyOn(Artifacts, 'find').mockRejectedValue(new Error('Database connection error'));

    const { req, res } = createMocks({
      method: 'GET',
    });

    ////////////////////////// ACT //////////////////////////

    await handler(req, res);

    ////////////////////////// ASSERT //////////////////////////

     //Verify status code to be 500
    expect(res.statusCode).toBe(500);
    const responseData = JSON.parse(res._getData());

    //Verify that the error is in fact the error that our Artifacts handler has on his 500 status code response
    expect(responseData).toHaveProperty('error');
    expect(responseData.error).toBe('Internal Server Error'); // O el mensaje de error adecuado
  });

});
