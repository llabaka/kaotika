import CartItems from "./shop/CartItems";
import CartSeparator from "./shop/CartSeparator";
import CartTotal from "./shop/CartTotal";

const Cart = () => {
    return (
        <div className="flex flex-col h-[75%] w-[90%] text-xl border-white border-2 items-center justify-center">
            <CartItems/>
            <CartSeparator/>
            <CartTotal/>
        </div>

    )
}

export default Cart;