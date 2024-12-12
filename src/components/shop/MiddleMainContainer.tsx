import Image from "next/image";

const MiddleMainContainer = () => {
  return (
    <div className="relative w-12 h-full">

      <Image
        src="/images/shop/MainSeparator.png"
        alt="MainSeparator"
        fill
        sizes='(max-width: 78px) 100vw'
        className="rounded-lg z-1"
      />


    </div>
  );
};

export default MiddleMainContainer;