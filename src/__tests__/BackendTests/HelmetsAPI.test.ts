const request = require('supertest');
import app from '@/pages/api/shop/products/helmets';

describe('GET /api/shop/products/helmets', () => {
  it('should return an array of helmets products', async () => {
    const response = await request(app).get('/api/shop/products/helmets'); // Realiza la solicitud GET a /helmets

    // Comprobamos que el código de respuesta sea 200
    expect(response.status).toBe(200);

    // Verificamos que el cuerpo de la respuesta sea un array (de productos)
    expect(Array.isArray(response.body)).toBe(true);
    
    // También podemos verificar que los objetos dentro del array tengan las propiedades esperadas
    if (response.body.length > 0) {
      const firstHelmet = response.body[0];
      expect(firstHelmet).toHaveProperty('name'); // Asegúrate de que 'name' sea una propiedad
      expect(firstHelmet).toHaveProperty('price'); // Asegúrate de que 'price' sea una propiedad
    }
  });

  it('should handle empty response correctly', async () => {
    // Simular que la respuesta está vacía para el caso de prueba
    const response = await request(app).get('/api/shop/products/helmets');

    // Verificamos que el código de respuesta sea 200 y que el cuerpo de la respuesta sea un array vacío
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]); // Esperamos un array vacío si no hay productos
  });

  it('should handle errors correctly', async () => {
    // Simula un endpoint fallido o de error (por ejemplo, URL incorrecta o error de red)
    const response = await request(app).get('/api/shop/products/helmets');

    // Verificamos que el código de respuesta sea 500 en caso de error
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Internal Server Error'); // O el mensaje de error adecuado
  });
});
