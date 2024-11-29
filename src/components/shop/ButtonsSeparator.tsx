import Image from 'next/image';

const ButtonsSeparator = () => {
    return (
        <div className="flex flex-col justify-center items-center w-11/12 mt-1 mb-2">
            <div className="w-11/12 h-5 flex relative items-center justify-center">
                <Image
                    src="/images/shop/ButtonsSeparator.png"
                    alt="Imagen 1"
                    layout="fill"
                />
            </div>
        </div>
    )
}

export default ButtonsSeparator;