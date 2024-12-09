import { Product } from "@/_common/interfaces/shop/Product";

  export default async function handler(req: any, res: any) {

    const endpoints = [
      "/api/shop/products/helmets",
      "/api/shop/products/armors",
      "/api/shop/products/boots",
      "/api/shop/products/shields",
      "/api/shop/products/weapons",
      "/api/shop/products/rings",
      "/api/shop/products/artifacts",
      "/api/shop/products/ingredients",
    ];
  
    const URL = "http://localhost:3000";

    try {
      // Realiza todas las solicitudes de forma paralela
      const responses = await Promise.all(
        endpoints.map((endpoint) =>
          fetch(`${URL}${endpoint}`).then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
            }
            return response.json(); // Convertir respuesta a JSON
          })
        )
      );
  
            // Crear un objeto estructurado
            const productsObject: Record<string, Product[]> = {}; // Tipo explícito para el objeto

        responses.forEach((data, index) => {
            //Use endpoints to get the key names
            const key = endpoints[index].split("/").pop(); // OBtain helmets, armors, boots, shields, weapons, artifacts, rings and ingredients as names separatedly
            if (key) {
            const products = Object.values(data)[0];

            //Verify that products is an Array

            //Assign the name to the array

            //Ejemplo: si la ruta era /api/shop/products/helmets, le hemos hecho un split por la "/" y eso ha separado todas las palabras. El pop luego insertará en la
            //constante "key" de arriba el ultimo string del array de strings que se habrá formado despues del split (en este caso helmets) y lo añadira como un nombre
            //en el array de productos

            if (Array.isArray(products)) {
                productsObject[key] = products; 
            } else {
                console.error(`No se encontraron productos para ${key}`);
            }
            }
  });

        console.log("Products Object");
        console.log(productsObject.helmets);
      
  
      return res.status(200).json(productsObject);
    } catch (err: any) {
      console.error("Error combining product data:", err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  