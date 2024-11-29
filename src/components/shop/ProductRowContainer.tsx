
import CardItem from "./CardItem";

const ProductRowContainer = () => {

    const cards = [1, 2, 3]

    return(

        <div className="flex w-full h-[49%] bg-gray-500 justify-center items-center text-center">
            <CardItem/>
            <div className="flex w-[2%] h-full bg-orange-500 text-white"></div>
            <CardItem/>
            <div className="flex w-[2%] h-full bg-orange-500 text-white" ></div>
            <CardItem/>
        </div>
    )
}

export default ProductRowContainer;