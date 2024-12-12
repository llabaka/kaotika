export const sellingProductClient = async (playerId: string, productId: string, type: string) => {

  try {
    const response = await fetch('/api/shop/sellObject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        playerId,
        productId,
        type
      })
    });

    return response;
  }
  catch (error: any) {
    console.error('Error in selling process: ', error);
    throw error;
  }
}