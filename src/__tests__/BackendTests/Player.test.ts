/**
 * @jest-environment node
*/

import { createMocks } from "node-mocks-http";
import mongoose from "mongoose";
import PlayerModel from "@/pages/api/models/PlayerModel";
import handlerPlayer from "@/pages/api/player";  // Ajusta la ruta a tu controlador
import handleObjectIdPlayer from "@/pages/api/shop/playerObjectID";
import { mockPlayers } from "../__mocks__/mockPlayers";
import * as sampleController from "../PlayerUtils/player.controller";
import { PlayerSampleModel } from "../PlayerUtils/playerSample.model";
import { populatedPlayer } from "../__mocks__/mockPopulatedPlayer";
import { mockPlayer } from "../__mocks__/mockPlayer";

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {}); // Silence console logs
  jest.spyOn(console, 'error').mockImplementation(() => {}); // Silence console errors
  jest.spyOn(console, 'warn').mockImplementation(() => {}); // Silence console warnings
});

afterAll(async () => {
  mongoose.disconnect();  // Desconectar de la base de datos después de todas las pruebas
  jest.resetAllMocks();  // Limpiar los mocks después de cada test
});

afterEach(() => {
  jest.restoreAllMocks(); // Restablece todos los mocks después de cada prueba
});

describe('GET /api/player', () => {

  ////////////////////////// ARRANGE //////////////////////////

  it('should return status 200 and response player data', async () => {
    // Crear los mocks de solicitud y respuesta
    const { req, res } = createMocks({
      method: 'GET',
    });
  
    // Mockear el método findOne del modelo PlayerSampleModel para que devuelva mockPlayer
    jest.spyOn(PlayerSampleModel, 'findOne').mockResolvedValue(mockPlayer);
  
    ////////////////////////// ACT //////////////////////////

    // Call the handler
    await handlerPlayer(req, res);
  
    ////////////////////////// ASSERT //////////////////////////

    // Verify status code to be 200
    expect(res.statusCode).toBe(200);
  
    // Verificar que la respuesta contenga la propiedad 'gold' con el valor esperado
    const responseData = JSON.parse(res._getData());  // Obtener los datos de la respuesta

    expect(responseData).toHaveProperty('_id', responseData._id);  // Expected value of _id
    expect(responseData).toHaveProperty('gold', responseData.gold);  // Expected value of gold
    expect(responseData).toHaveProperty('level', responseData.level);   // Expected value of level
    expect(responseData).toHaveProperty('inventory', responseData.inventory);  // Expected value of inventory

  });

  it('should return status 404 when player is not found by email', async () => {
    // Crear los mocks de solicitud y respuesta
    const { req, res } = createMocks({
      method: 'GET',
      query: { email: 'asier.arguinchona21@ikasle.aeg.eus' }, // Simulamos que el email se pasa por query
    });
  
    // Mockear el método findOne del modelo PlayerModel para que devuelva null (jugador no encontrado)
    jest.spyOn(PlayerModel, 'findOne').mockResolvedValue(null);
  
    ////////////////////////// ACT //////////////////////////
  
    // Llamar al controlador
    await handleObjectIdPlayer(req, res);
  
    ////////////////////////// ASSERT //////////////////////////
  
    // Verificar que el código de estado sea 404
    expect(res.statusCode).toBe(404);
  
    // Verificar que la respuesta contenga el mensaje de error esperado
    const responseData = JSON.parse(res._getData());  // Obtener los datos de la respuesta
    expect(responseData).toHaveProperty('error', 'Player was not found');
  });

});
