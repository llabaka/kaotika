import React, { use, useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import Layout from '@/components/Layout';
import MainShopContainer from '@/components/shop/MainShopContainer';
import LeftMainContainer from '@/components/shop/LeftMainContainer';
import MiddleMainContainer from '@/components/shop/MiddleMainContainer';
import RightMainContainer from '@/components/shop/RightMainContainer';
import { DISPLAY_SCREEN } from '@/constants/shopConstants';
import { CardProps } from '@/_common/interfaces/shop/CardProps';

const Shop = () => {
	const [loading, setLoading] = useState(false);
  const [equipment, setEquipment] = useState([]);
  const [armors, setArmors] = useState([]);
  const [boots, setBoots] = useState([]);
  const [helmets, setHelmets] = useState([]);
  const [shields, setShields] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [rings, setRings] = useState([]);
  const [artifacts, setArtifacts] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [showingProducts, setShowingProducts] = useState([]);
  const [allProducts, setAllProducts] = useState<CardProps[] | []>([]);
  const [displayingScreen, setDisplayingScreen] = useState(DISPLAY_SCREEN.BUY);
  const [error, setError] = useState<string | null>(null);

  const fetchConnect = async () => {
    try {
      const res = await fetch('/api/connect');
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const result = await res.json();

      // Save all in localStorage
      localStorage.setItem('shopProducts', JSON.stringify(result));

      //Set all equipments
      setEquipment(result);

      console.log(result);
      

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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  useEffect(() => {
    const localStorageProducts = localStorage.getItem('shopData');
    console.log("LOCAL STORAGE DATA");
    console.log(localStorageProducts);
    
    //If localStorage have products set states
    if (localStorageProducts) {
      const parsedProducts = JSON.parse(localStorageProducts);
      setEquipment(parsedProducts);
      setArmors(parsedProducts.armors);
      setBoots(parsedProducts.boots);
      setHelmets(parsedProducts.helmets);
      setWeapons(parsedProducts.weapons);
      setShields(parsedProducts.shields);
      setRings(parsedProducts.rings);
      setArtifacts(parsedProducts.artifacts);
      setIngredients(parsedProducts.ingredients);

      console.log();
      
    } else {
      fetchConnect(); //Fetch if localstorage is empty
    }
  }, []);

	if (loading) {
    return <Loading />;
	}
  return (
    <Layout>
      <div className=" text-medievalSepia bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url(/images/map.jpg)'}}>
      <MainShopContainer>
        <LeftMainContainer />
        <MiddleMainContainer />
        <RightMainContainer products={weapons} displayingScreen={displayingScreen}/>
      </MainShopContainer>
      </div>
    </Layout>
  )
}



export default Shop;