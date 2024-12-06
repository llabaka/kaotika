export const buyProductClient = async(playerId: string, productId: string, type: string) => {

    try {
        const response = await fetch('/api/shop/buyObject', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                playerId,
                productId,
                type
            })
        });

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.error || `Uknown Error`);
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