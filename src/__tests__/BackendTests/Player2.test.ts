/**
 * @jest-environment node
*/

import { createMocks } from "node-mocks-http"; 
import mongoose from "mongoose";
import PlayerModel from "@/pages/api/models/PlayerModel";
import handlerPlayer from "@/pages/api/player";
import { mockPlayers } from "../__mocks__/mockPlayers";
import { mockPlayer } from "../__mocks__/mockPlayer";


beforeAll(() => {   
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(async () => {
    mongoose.disconnect();
    jest.resetAllMocks();
});

describe('GET /api/player' , () => {
    it('should return status 200 ', async() => {

        jest.spyOn(PlayerModel, 'findOne').mockResolvedValue(mockPlayers);

        const { req, res } = createMocks({
            method: 'GET',
        });

        await handlerPlayer(req, res);

        expect(res.statusCode).toBe(200);

    });
});