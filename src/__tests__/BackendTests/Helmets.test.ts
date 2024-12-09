import { createMocks } from 'node-mocks-http'; // Simulate HTTP request and HTTP response
import handler from '@/pages/api/shop/products/helmets'; 
import Helmets from '@/pages/api/models/HelmetModel';
import mongoose from 'mongoose';

beforeAll(() => {
  //Delete console logs when running test or hide them
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(async () => {
  //Disconnect from MongoDB after finishing the test
  await mongoose.disconnect();
  jest.restoreAllMocks(); // Restaurar todos los mocks
});

describe('GET /api/shop/products/helmets', () => {
  it('should return an array of helmets products', async () => {

    ////////////////////////// ARRANGE //////////////////////////

    // Simulate data from MongoDB Helmet collection
    const mockData = [{ name: 'Helmet 1', price: 100 }, { name: 'Helmet 2', price: 150 }];
    
    // Mock the FIND function
    jest.spyOn(Helmets, 'find').mockResolvedValue(mockData);

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

    // Verify that helmets are the ones retrieved
    expect(responseData).toHaveProperty('helmets');

    // Verify that helmets is an array
    expect(Array.isArray(responseData.helmets)).toBe(true); 

    //Verify that IN THIS CASE helmets has a length of 2
    expect(responseData.helmets.length).toBe(2);
  });

  it('should handle errors correctly with a 500 status code', async () => {

    ////////////////////////// ARRANGE //////////////////////////

    // Simulate receiving an error
    jest.spyOn(Helmets, 'find').mockRejectedValue(new Error('Database connection error'));

    const { req, res } = createMocks({
      method: 'GET',
    });

    ////////////////////////// ACT //////////////////////////

    await handler(req, res);

    ////////////////////////// ASSERT //////////////////////////

     //Verify status code to be 500
    expect(res.statusCode).toBe(500);
    const responseData = JSON.parse(res._getData());

    //Verify that the error is in fact the error that our Helmets handler has on his 500 status code response
    expect(responseData).toHaveProperty('error');
    expect(responseData.error).toBe('Internal Server Error'); // O el mensaje de error adecuado
  });

});
