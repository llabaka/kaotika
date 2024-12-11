/**
 * @jest-environment node
 */

import { SampleModel } from "./sample.model";
import * as sampleController from "./sample.controller";

// Aquí mockeamos las funciones del modelo, incluyendo `exec` y otras funciones encadenadas
jest.mock("./sample.model", () => {
    const actualModel = jest.requireActual("./sample.model");  // Obtenemos la implementación real del modelo

    return {
        ...actualModel, // Retenemos la funcionalidad real para otras partes del modelo
        SampleModel: {
            // Simulamos la función `findOne` y los métodos encadenados `where`, `exec`
            findOne: jest.fn().mockReturnThis(), // Permite encadenar `.findOne()`
            where: jest.fn().mockReturnThis(),   // Permite encadenar `.where()`
            exec: jest.fn().mockResolvedValue([]), // `exec` retorna una promesa resuelta
        },
    };
});

describe("Model Unit Tests", () => {
    let req: any, res: any;

    beforeEach(() => {
        jest.clearAllMocks();
        req = { body: {} };
        res = { json: jest.fn() };
    });

    it("Allows chaining of commands", () => {
        // Simula el encadenamiento de métodos
        SampleModel.findOne().where().exec().then();

        // Verificamos que se llamaron los métodos en el orden esperado
        expect(SampleModel.findOne).toHaveBeenCalled();
        expect(SampleModel.where).toHaveBeenCalled();
    });


});
