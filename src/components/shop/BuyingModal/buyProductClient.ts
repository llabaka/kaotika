interface Product {
  type: string,
  productId: string;
}

export const buyProductClient = async (playerId: string, products: Product[]) => {

  try {
    const response = await fetch('/api/shop/buyObject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        playerId,
        products
      })
    });

    return response;
  }
  catch (error: any) {
    console.error('Error in buying process: ', error);
    throw error;
  }
}