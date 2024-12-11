import { SampleModel } from "./sample.model";

// Este método usa el modelo para buscar un solo documento
export const findOne = (req: any, res: any): void => {
    SampleModel.findOne()
        .where(req.body)  // Esta llamada es sobre el modelo, no una instancia
        .then((result: any) => res.json(result));
};

// Método encadenado que hace uso del modelo
export const chainActions = (req: any, res: any): void => {
    SampleModel.findOne()
        .where()  // Método de consulta
        .exec()  // Ejecuta la consulta
        .then((result: any) => res.json(result));  // Retorna el resultado
};

// Este método también usa el modelo para buscar múltiples documentos
export const find = (req: any, res: any): void => {
    SampleModel.find(req.body)
        .exec()
        .then((result: any) => res.json(result));
};
