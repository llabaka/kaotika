import { NextApiRequest, NextApiResponse } from "next";
import helmetsHandler from "@/pages/api/shop/products/helmets";
import connectDB from "../../../db/connection";
import Helmets from "@/pages/api/models/HelmetModel";

// Mockear la conexión a la base de datos y el modelo Helmets
jest.mock("../../../../../db/connection", () => jest.fn());
jest.mock("../../models/HelmetModel", () => ({
  find: jest.fn(),
}));

describe("helmetsHandler", () => {
  let req: Partial<NextApiRequest>;
  let res: Partial<NextApiResponse>;

  beforeEach(() => {
    req = {};  // Puedes configurar los valores que necesitas para el request
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();  // Limpiar mocks entre pruebas
  });

  it("debería retornar los cascos correctamente cuando la base de datos responde", async () => {
    // Configurar el mock de Helmets.find para que retorne una lista simulada
    const mockHelmets = [
      { _id: "1", name: "Helmet 1", value: 100, isUnique: false },
      { _id: "2", name: "Helmet 2", value: 200, isUnique: false },
    ];
    (Helmets.find as jest.Mock).mockResolvedValue(mockHelmets);

    // Ejecutar la función
    await helmetsHandler(req as NextApiRequest, res as NextApiResponse);

    // Verificar que la conexión a la base de datos se haya establecido
    expect(connectDB).toHaveBeenCalledTimes(1);

    // Verificar que Helmets.find haya sido llamado con el filtro correcto
    expect(Helmets.find).toHaveBeenCalledWith({
      $and: [
        { isUnique: { $ne: true } },
        { value: { $ne: 0 } },
        { value: { $exists: true } },
      ],
    });

    // Verificar que la respuesta tenga los cascos correctos
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ helmets: mockHelmets });
  });

  it("debería retornar un error si ocurre un problema al buscar los cascos", async () => {
    // Configurar el mock para que lance un error
    (Helmets.find as jest.Mock).mockRejectedValue(new Error("Database error"));

    // Ejecutar la función
    await helmetsHandler(req as NextApiRequest, res as NextApiResponse);

    // Verificar que se llame a status 500 y con el mensaje de error correspondiente
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});
