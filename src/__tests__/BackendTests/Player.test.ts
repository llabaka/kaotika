/**
 * @jest-environment node
 */

import { NextApiRequest, NextApiResponse } from "next";
import handlerPlayer from "@/pages/api/player";
import Player from "@/pages/api/models/PlayerModel";
import { mockSession } from "@/__tests__/__mocks__/mockSession";
import connectDB from "../../../db/connection";

// Mock de la conexión a la base de datos y del modelo Player
jest.mock("../../../db/connection", () => jest.fn());
jest.mock("../../pages/api/models/PlayerModel", () => ({
  findOne: jest.fn(),
  populate: jest.fn(),
}));

describe("handlerPlayer API", () => {
    it("should return a 200 status with the player details", async () => {
      // Mock de la función de conexión a la base de datos
      (connectDB as jest.Mock).mockResolvedValueOnce(true);
  
      // Simular un "documento" Mongoose con el método populate
      const mockPopulate = jest.fn().mockReturnThis(); // Simula el método populate
      const mockPlayer = {
        _id: "12345",
        gold: 1000,
        level: 10,
        email: mockSession.email,
        equipment: {},
        inventory: [],
        populate: mockPopulate, // Simula populate en el documento
      };
  
      // Mock de la función 'findOne' del modelo 'Player' para devolver el mock del jugador
      (Player.findOne as jest.Mock).mockResolvedValueOnce(mockPlayer);
  
      // Simulación de un request y response
      const req = {} as NextApiRequest;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as NextApiResponse;
  
      // Llamada a la función handlerPlayer
      await handlerPlayer(req, res);
  
      // Verificar que la respuesta sea 200 y contenga los datos esperados
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        _id: "12345",
        gold: 1000,
        level: 10,
      });
  
      // Verificar si 'populate' fue llamado correctamente
      expect(mockPopulate).toHaveBeenCalledTimes(1);  // Verifica que populate haya sido llamado
      expect(Player.findOne).toHaveBeenCalledWith({ email: mockSession.email });
    });
  
    // Test para verificar el manejo de errores (ejemplo: jugador no encontrado)
    it("should return a 500 status if player is not found", async () => {
      // Mock para simular que el jugador no existe
      (Player.findOne as jest.Mock).mockResolvedValueOnce(null);
  
      const req = {} as NextApiRequest;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as NextApiResponse;
  
      await handlerPlayer(req, res);
  
      // Verificar que se retorna el status 500 y un mensaje de error
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });