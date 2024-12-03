import CartScreenMainTab from "../CartScreenMainTab";
import CartContainer from "../CartContainer";

const CartMainContainer = () => {
    return(
        <div className="h-full w-full text-xl">
            <CartScreenMainTab/>
            <CartContainer/>
        </div>
    )
}

export default CartMainContainer;