/**
 * @jest-environment node
*/

import { createMocks } from "node-mocks-http";
import mongoose from "mongoose";
import PlayerModel from "@/pages/api/models/PlayerModel";
import handlerPlayer from "@/pages/api/player";  // Ajusta la ruta a tu controlador
import { mockPlayers } from "../__mocks__/mockPlayers";
import * as sampleController from "./sample.controller";
import { PlayerSampleModel } from "./sample.model";
import { populatedPlayer } from "../__mocks__/mockPopulatedPlayer";
import { mockPlayer } from "../__mocks__/mockPlayer";

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => { });  // Evitar logs de errores en las pruebas
});

afterAll(async () => {
  mongoose.disconnect();  // Desconectar de la base de datos después de todas las pruebas
  jest.resetAllMocks();  // Limpiar los mocks después de cada test
});

afterEach(() => {
  jest.restoreAllMocks(); // Restablece todos los mocks después de cada prueba
});

describe('GET /api/player', () => {

  it('should return status 200 and response player data', async () => {
    // Crear los mocks de solicitud y respuesta
    const { req, res } = createMocks({
      method: 'GET',
    });
  
    // Mockear el método findOne del modelo PlayerSampleModel para que devuelva mockPlayer
    jest.spyOn(PlayerSampleModel, 'findOne').mockResolvedValue(mockPlayer);
  
    // Llamar al controlador
    await handlerPlayer(req, res);
  
    // Verificar que el código de estado sea 200
    expect(res.statusCode).toBe(200);
  
    // Verificar que la respuesta contenga la propiedad 'gold' con el valor esperado
    const responseData = JSON.parse(res._getData());  // Obtener los datos de la respuesta

    expect(responseData).toHaveProperty('_id', responseData._id);  // Expected value of _id
    expect(responseData).toHaveProperty('gold', responseData.gold);  // Expected value of gold
    expect(responseData).toHaveProperty('level', responseData.level);   // Expected value of level
    expect(responseData).toHaveProperty('inventory', responseData.inventory);  // Expected value of inventory

  });

});
