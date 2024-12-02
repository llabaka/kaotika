import React, { use, useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import Layout from '@/components/Layout';
import MainShopContainer from '@/components/shop/MainShopContainer';
import LeftMainContainer from '@/components/shop/LeftMainContainer';
import MiddleMainContainer from '@/components/shop/MiddleMainContainer';
import RightMainContainer from '@/components/shop/RightMainContainer';

const Shop = () => {
	const [loading, setLoading] = useState(false);
  const [equipment, setEquipment] = useState([]);
  const [armors, setArmors] = useState([]);
  const [boots, setBoots] = useState([]);
  const [helmets, setHelmets] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const fetchConnect = async () => {
    try {
      const res = await fetch('/api/connect');
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const result = await res.json();
      setEquipment(result);

      //Set all equipment types
      setArmors(result.armors);
      setBoots(result.boots);
      setHelmets(result.helmets)
      
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
    fetchConnect();
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
        <RightMainContainer />
      </MainShopContainer>
      </div>
    </Layout>
  )
}



export default Shop;