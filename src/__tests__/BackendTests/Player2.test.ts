/**
 * @jest-environment node
*/

import { createMocks } from "node-mocks-http"; 
import mongoose from "mongoose";
import PlayerModel from "@/pages/api/models/PlayerModel";
import handlerPlayer from "@/pages/api/player";
import { mockPlayers } from "../__mocks__/mockPlayers";


beforeAll(() => {   
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(async () => {
    mongoose.disconnect();
    jest.resetAllMocks();
});

describe('GET /api/player' , () => {
    it('should return an Object Player ', async() => {

        const mockEmail = 'miguelangel.rojas@ikasla.aeg.eus';
        const mockData = mockPlayers;


        jest.spyOn(PlayerModel, 'find').mockResolvedValue(mockData);

        const { req, res } = createMocks({
            method: 'GET',
            query: {
                email: mockEmail
            }
        });

        await handlerPlayer(req, res);

        expect(res._getData()).toEqual(mockData[1]);
        expect(res.statusCode).toBe(200);
    });
});