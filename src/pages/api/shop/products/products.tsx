import { Product } from "@/_common/interfaces/shop/Product";


const endpoints = [
    "/api/shop/helmets",
    "/api/shop/armors",
    "/api/shop/boots",
    "/api/shop/shields",
    "/api/shop/weapons",
    "/api/shop/rings",
    "/api/shop/artifacts",
    "/api/shop/ingredients",
  ];
  
  export default async function handler(req: any, res: any) {
    try {
      // Realiza todas las solicitudes de forma paralela
      const responses = await Promise.all(
        endpoints.map((endpoint) =>
          fetch(endpoint).then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
            }
            return response.json(); // Convertir respuesta a JSON
          })
        )
      );
  
      // Combina los productos en un solo array
      const productsArray: Product[] = [];
      responses.forEach((data) => {
        // Supongamos que cada endpoint devuelve algo como { helmets: [...], armors: [...] }
        const products = Object.values(data)[0]; // Extraer el array del objeto
        if (Array.isArray(products)) {
          productsArray.push(...products); // Añadir los productos al array combinado
        }
      });
  
      return res.status(200).json(productsArray);
    } catch (err: any) {
      console.error("Error combining product data:", err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  