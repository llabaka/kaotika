import { Player } from '@/_common/interfaces/Player';
import { AllProducts } from '@/_common/interfaces/shop/AllProducts';
import { Product } from '@/_common/interfaces/shop/Product';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import BuyingModal from '@/components/shop/BuyingModal/BuyingModal';
import LeftMainContainer from '@/components/shop/LeftMainContainer';
import MainShopContainer from '@/components/shop/MainShopContainer';
import MiddleMainContainer from '@/components/shop/MiddleMainContainer';
import RightMainContainer from '@/components/shop/RightMainContainer';
import SellingModal from '@/components/shop/SellingModal.tsx/SellingModal';
import { DISPLAY_SCREEN } from '@/constants/shopConstants';
import { useEffect, useState } from 'react';
import ShopTooltip from '@/components/tooltips/ShopTooltip';
import { ShopTooltipProps } from '@/_common/interfaces/shop/ShopTooltip';



const Shop = () => {
	const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState<Player>();
  const [showingProducts, setShowingProducts] = useState<Product[] | []>([]);
  const [allProducts, setAllProducts] = useState<AllProducts | null>(null);
  const [cartProducts, setCartProducts] = useState<Product[] | []>([]);
  const [displayingScreen, setDisplayingScreen] = useState(DISPLAY_SCREEN.BUY);
  const [error, setError] = useState<string | null>(null);
  const [isVisibleBuyModal, setIsVisibleBuyModal] = useState<boolean>(false);
  const [isVisibleSellModal, setIsVisibleSellModal] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [haveBuy, setHaveBuy] = useState(false);
  const [haveSell, setHaveSell] = useState(false);
  const [shopTooltips, setShopTooltips] = useState<ShopTooltipProps[]>([]);
  const [sellingItem, setSellingItem] = useState<Product>({} as Product);
  const [sellingImage, setSellingImage] = useState('');

  //Set products from local storage
  useEffect(() => {
    const localStorageProducts = localStorage.getItem('cartProducts');
    
    if (localStorageProducts) {
        const parsedLocalStorageProducts = JSON.parse(localStorageProducts);
        console.log("Productos cargados desde localStorage", parsedLocalStorageProducts);
        setCartProducts(parsedLocalStorageProducts);
    }
}, []);

//Save products in local storage
  useEffect(() => {
    console.log(allProducts);

    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [allProducts])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/shop/products');
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const result = await res.json();

      console.log("RESULT PRODUCTS");
      console.log(result);
      

      // Save all in localStorage
      localStorage.setItem('Products', JSON.stringify(result));

      //Set all equipments
      setAllProducts(result);


    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlayer = async () => {
    try {
      const playerFetch = await fetch('/api/player')

      if (!playerFetch.ok) {
        throw new Error(`Error: ${playerFetch.status}`);
      }

      const player = await playerFetch.json();
      setPlayer(player);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const localStorageProductsHandler = (products:any) => {
    setAllProducts(products);
    setShowingProducts(products.weapons);
  }
  
  useEffect(() => {
    if (shopTooltips.length > 0) {
        const timeout = setTimeout(() => {
            const newTooltips = shopTooltips.slice(1);
            setShopTooltips(newTooltips);
        }, 1500);

        return () => clearTimeout(timeout);
    }
}, [shopTooltips]);


  const checkProducts = async () => {
    const products: any = await localStorage.getItem('Products');
    const parsedProducts = JSON.parse(products);
    
    if (products !== null) {

      // El item existe en LocalStorage
      console.log('El item existe:', parsedProducts);
      localStorageProductsHandler(parsedProducts);
      setAllProducts(parsedProducts);
      setShowingProducts(parsedProducts.weapons)
  } else {
      // El item no existe en LocalStorage
      fetchProducts();
      console.log('El item no existe');
    }
  }

  useEffect(()=> {
    fetchPlayer();
    checkProducts();
  },[]);

	if (loading) {
    return <Loading />;
	}

  const buyButton = () => {
    setIsVisibleBuyModal(true);
  }

  const closeModal = () => {
    setIsVisibleBuyModal(false);
    document.documentElement.style.overflow = "";
  } 

  const sellButton = () => {
    setIsVisibleSellModal(true);
  }

  const declineSellButton = () => {
    setIsVisibleSellModal(false);
    document.documentElement.style.overflow = "";
  }
  useEffect(() => {
    const htmlElement = document.documentElement;

    // Hide scrollbar
    htmlElement.style.overflow = 'scroll';
    htmlElement.style.scrollbarWidth = 'none';
    
    const css = `
        ::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
    `;

    // Use global styles
    const styleSheet = document.createElement('style');
    styleSheet.innerText = css;
    document.head.appendChild(styleSheet);

    return () => {
        // Reset values
        htmlElement.style.overflow = '';
        htmlElement.style.scrollbarWidth = '';
        document.head.removeChild(styleSheet);
    };
}, []);

  if (loading && !player && !allProducts && !showingProducts) {
    return <Loading />;
  } else if (!loading && player && allProducts && showingProducts) {
    return (
      <Layout>
        <div className=" text-medievalSepia bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url(/images/map.jpg)'}}>
        <MainShopContainer>

          <LeftMainContainer 
          setDisplayingScreen={setDisplayingScreen} 
          allProducts={allProducts} 
          setShowingProducts={setShowingProducts} 
          player={player}/>
          
          <MiddleMainContainer />

          <RightMainContainer 
            products={showingProducts} 
            displayingScreen={displayingScreen} 
            allProducts={allProducts} 
            setShowingProducts={setShowingProducts} 
            cartProducts={cartProducts} 
            setCartProducts={setCartProducts}
            onClickBuy={buyButton}
            onClickSell={sellButton}
            setProduct={setProduct}
            player={player}
            setPlayer={setPlayer}
            setSellingItem={setSellingItem}
            sellingItem={sellingItem}
            setSellingImage={setSellingImage}
            sellingImage={sellingImage}
            setShopTooltips={setShopTooltips}
            />

        </MainShopContainer>
        { isVisibleBuyModal ? (

          <BuyingModal
            onclick={closeModal}
            product={product}
            player={player}
            setPlayer={setPlayer}
            setHaveBuy={setHaveBuy}
            setShopTooltips={setShopTooltips}
            
            /> ) : null }  
        { isVisibleSellModal ? ( 
          <SellingModal 
            onClickSell={declineSellButton} 
            sellingItem={product} 
            player={player} 
            setPlayer={setPlayer}
            setHaveSell={setHaveSell}
            setShopTooltips={setShopTooltips}
            setSellingImage={setSellingImage}
            setSellingItem={setSellingItem}
            /> 
          ) : null }
          <div className='w-[24%] fixed top-[30%] right-[2%] z-20'>
            { shopTooltips.map((shopTooltip, index) => (
                
                <ShopTooltip image={shopTooltip.image} itemName={shopTooltip.itemName} key={index} action={shopTooltip.action}/>
            ))}
          </div>
        </div>
      </Layout>
    )
  } else {
    console.log("ESTA EN ELSE");
    return <Loading />;
  }
}



export default Shop;
