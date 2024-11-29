import { useState } from "react"
import ProductRowContainer from "./ProductRowContainer";
import ProductHorizontalSeparator from "./ProductHorizontalSeparator";

const ProductsContainer = () => {
    const [products, setProducts] = useState(
		Array.from({ length: 26 }, (_, i) => ({
			id: i + 1,
			name: `Product ${i + 1}`,
		}))
    );

    const itemsPerRow = 3; // Número de productos por fila

    // Función para dividir los productos en filas de `itemsPerRow` productos
    const chunkProducts = (products: any, rowSize: number) => {
      const result = [];
      for (let i = 0; i < products.length; i += rowSize) {
        result.push(products.slice(i, i + rowSize));
      }
      return result;
    };
  
    // Generamos las filas de productos
    const productRows = chunkProducts(products, itemsPerRow);

    return (
    <div className="w-full h-full overflow-y-auto bg-white bg-scroll mt-2">

        <ProductRowContainer/>

        <ProductHorizontalSeparator/>

        <ProductRowContainer/>

        <ProductHorizontalSeparator/>


    </div>
); 
}

export default ProductsContainer;

// return (
//         <div className="w-full h-full overflow-y-auto bg-white bg-scroll mt-2">
//         {/* Contenedor interno para las filas */}
//         <div className="flex w-full h-[49%] bg-gray-500 justify-center items-center text-center">
//         <div className="flex w-[32%] h-full bg-yellow-500 text-center items-center justify-center text-white">PRODUCT</div>
//         <div className="flex w-[2%] h-full bg-orange-500 text-white"></div>
//         <div className="flex w-[32%] h-full bg-yellow-500 text-white text-center items-center justify-center">PRODUCT</div>
//         <div className="flex w-[2%] h-full bg-orange-500 text-white" ></div>
//         <div className="flex w-[32%] h-full bg-yellow-500 text-white text-center items-center justify-center">PRODUCT</div>
//     </div>
//     <div className="flex flex-col w-full h-[2%] bg-white"></div>
//     <div className="flex w-full h-[49%] bg-gray-500">
//         <div className="flex w-[32%] h-full bg-yellow-500 text-white text-center items-center justify-center">PRODUCT</div>
//         <div className="flex w-[2%] h-full bg-orange-500"></div>
//         <div className="flex w-[32%] h-full bg-yellow-500 text-white text-center items-center justify-center">PRODUCT</div>
//         <div className="flex w-[2%] h-full bg-orange-500"></div>
//         <div className="flex w-[32%] h-full bg-yellow-500 text-white text-center items-center justify-center">PRODUCT</div>
//     </div>

// </div>
// ); 


// {/* <div className="w-full h-full overflow-y-auto bg-scroll mt-2">
// {productRows.map((row, rowIndex) => (
// <div
//     key={rowIndex}
//     className="flex w-full h-[49%] justify-center items-center text-center"
// >
//     {row.map((product: any, productIndex: any) => {
//     Logs for product tracking
//     console.log(`Product ID: ${product.id}`);
//     console.log(`Row length: ${row.length}`);
//     console.log(`Product Index: ${productIndex}`);
//     console.log(`ROW Index: ${rowIndex}`);

//     if(rowIndex === 3){
//         console.log("Metiendo separador horizontal");
        
//         <div className="flex w-full h-[2%] bg-blue-500"></div>
//     }
//     return (
//     <>
//         {/* Show product */}
//         <div key={product.id} className="flex w-[32%] h-full text-white text-center items-center justify-center">{product.name}</div>

//         {/* Separador si es el primer o el segundo item*/}
//         {(productIndex % 3 === 0 || productIndex % 3 === 1) && (
//         <div className="flex w-[2%] h-full bg-orange-500"></div>
//         )}

//     </>
//     );
    
// })}
// </div>
// ))}
// </div> */}