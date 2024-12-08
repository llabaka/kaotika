interface Product {
    type: string,
    productId: string;
}

export const buyProductClient = async(playerId: string, products: Product[]) => {
    console.log(playerId);
    console.log(products);

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

        if(!response.ok){
            const errorData = await response.json();
            console.log(errorData.error || `Uknown error`);
            return;
        }

        const data = await response.json();
        console.log('Buy succesfull: ', data);
        return data;
    }
    catch (error : any){
        console.error('Error in buying process: ', error);
        throw error;
    }
}