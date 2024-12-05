import { Player } from '@/_common/interfaces/Player';
import { AllProducts } from '@/_common/interfaces/shop/AllProducts';
import { Product } from '@/_common/interfaces/shop/CardProps';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import cartMock from '@/components/shop/helpers/mocks';
import LeftMainContainer from '@/components/shop/LeftMainContainer';
import MainShopContainer from '@/components/shop/MainShopContainer';
import MiddleMainContainer from '@/components/shop/MiddleMainContainer';
import RightMainContainer from '@/components/shop/RightMainContainer';
import { DISPLAY_SCREEN } from '@/constants/shopConstants';
import { CardProps } from '@/_common/interfaces/shop/CardProps';
import BuyingModal from '@/components/shop/BuyingModal/BuyingModal';


import { useEffect, useState } from 'react';

const Shop = () => {
	const [loading, setLoading] = useState(true);
  const [player, setPlayer] = useState<Player>();
  const [armors, setArmors] = useState([]);
  const [boots, setBoots] = useState([]);
  const [helmets, setHelmets] = useState([]);
  const [shields, setShields] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [rings, setRings] = useState([]);
  const [artifacts, setArtifacts] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [showingProducts, setShowingProducts] = useState<Product[] | []>([]);
  const [allProducts, setAllProducts] = useState<AllProducts | null>(null);
  const [cartProducts, setCartProducts] = useState<Product[] | []>(cartMock);
  const [displayingScreen, setDisplayingScreen] = useState(DISPLAY_SCREEN.BUY);
  const [error, setError] = useState<string | null>(null);
  const [isVisibleBuyModal, setIsVisibleBuyModal] = useState<boolean>(false);
  const [product, setProduct] = useState<CardProps | null>(null);
  

  useEffect(() => {
    setCartProducts((prevCartProducts) =>
      prevCartProducts.map((product) =>
        product.quantity === undefined
          ? { ...product, quantity: 1 }
          : product
      )
    );
  }, []);

  useEffect(() => {
    console.log("CART PRODUCTS NOW:");
    console.log(cartProducts);
    
    
  }, [cartProducts])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const result = await res.json();

      // Save all in localStorage
      localStorage.setItem('Products', JSON.stringify(result));

      //Set all equipments
      setAllProducts(result);
      
      //Set all equipment types
      setArmors(result.armors);
      setBoots(result.boots);
      setHelmets(result.helmets);
      setWeapons(result.weapons);
      setShields(result.shields);
      setRings(result.rings);
      setArtifacts(result.artifacts);
      setShowingProducts(result.weapons);
      //Set magic stuff types
      setIngredients(result.ingredients);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlayer = async () => {
    try {
      const playerFetch = await fetch('/api/playerFetch')

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
    setArmors(products.armors);
    setBoots(products.boots);
    setHelmets(products.helmets);
    setWeapons(products.weapons);
    setShields(products.shields);
    setRings(products.rings);
    setArtifacts(products.artifacts);
    setIngredients(products.ingredients);
    setShowingProducts(products.weapons);
  }


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

  if (error) {
    return <div>Error: {error}</div>;
  }

	if (loading && !player && !allProducts && !showingProducts) {
    return <Loading />;
	}
  return (
    <Layout>
      <div className=" text-medievalSepia bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url(/images/map.jpg)'}}>
      <MainShopContainer>
        <LeftMainContainer setDisplayingScreen={setDisplayingScreen} allProducts={allProducts} showingProducts={showingProducts} setShowingProducts={setShowingProducts}/>
        <MiddleMainContainer />
        <RightMainContainer products={showingProducts} displayingScreen={displayingScreen} allProducts={allProducts} setShowingProducts={setShowingProducts} cartProducts={cartProducts} setCartProducts={setCartProducts}/>
      </MainShopContainer>
      </div>
    </Layout>
  )
}



export default Shop;