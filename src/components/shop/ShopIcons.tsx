const ShopIcons = () =>{

    return (
        <div className="flex justify-around w-full">
            <button className="w-10 h-10 rounded-full flex justify-center items-center hover:bg-gray-400 transition">
                <i className='bx bxs-purchase-tag-alt text-2xl'></i>
            </button>
            <button className="w-10 h-10 rounded-full flex justify-center items-center hover:bg-gray-400 transition">
                <i className='bx bx-dollar-circle text-2xl'></i>
            </button>
            <button className="w-10 h-10 rounded-full flex justify-center items-center hover:bg-gray-400 transition">
                <i className="bx bxs-cart text-2xl"></i>
            </button>
        </div>
    )
}

export default ShopIcons;