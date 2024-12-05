import React, { use, useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import Layout from '@/components/Layout';
import MainShopContainer from '@/components/shop/MainShopContainer';
import LeftMainContainer from '@/components/shop/LeftMainContainer';
import MiddleMainContainer from '@/components/shop/MiddleMainContainer';
import RightMainContainer from '@/components/shop/RightMainContainer';
import { DISPLAY_SCREEN } from '@/constants/shopConstants';
import { CardProps, Product } from '@/_common/interfaces/shop/CardProps';
import { AllProducts } from '@/_common/interfaces/shop/AllProducts';
import cartMock from '@/components/shop/helpers/mocks';
import { Player } from '@/_common/interfaces/Player';
import { json } from 'stream/consumers';

const Shop = () => {
	const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState<Player>(null);
  const [armors, setArmors] = useState([]);
  const [boots, setBoots] = useState([]);
  const [helmets, setHelmets] = useState([]);
  const [shields, setShields] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [rings, setRings] = useState([]);
  const [artifacts, setArtifacts] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [showingProducts, setShowingProducts] = useState<CardProps[] | []>([]);
  const [allProducts, setAllProducts] = useState<AllProducts | null>(null);
  const [cartProducts, setCartProducts] = useState<Product[] | []>(cartMock);
  const [displayingScreen, setDisplayingScreen] = useState(DISPLAY_SCREEN.BUY);
  const [error, setError] = useState<string | null>(null);

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
    }
  };

  useEffect(() => {
    fetchPlayer();
    //checkProducts();
  },[]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const checkProducts = async () => {
    const products = await localStorage.getItem('Products');
    if (products !== null) {

      // El item existe en LocalStorage
      console.log('El item existe:', products);
      localStorageProductsHandler(products);

  } else {
      // El item no existe en LocalStorage
      fetchProducts();
      console.log('El item no existe');
    }
  }

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

	if (loading) {
    return <Loading />;
	}
  return (
    <Layout>
      <div className=" text-medievalSepia bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url(/images/map.jpg)'}}>
      <MainShopContainer>
        <LeftMainContainer setDisplayingScreen={setDisplayingScreen} allProducts={allProducts} showingProducts={showingProducts} setShowingProducts={setShowingProducts} player={player}/>
        <MiddleMainContainer />
        <RightMainContainer products={showingProducts} displayingScreen={displayingScreen} allProducts={allProducts} setShowingProducts={setShowingProducts} cartProducts={cartProducts} setCartProducts={setCartProducts}/>
      </MainShopContainer>
      </div>
    </Layout>
  )
}



export default Shop;