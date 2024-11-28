import React, { useState } from 'react';
import Loading from '@/components/Loading';
import Layout from '@/components/Layout';
import MainShopContainer from '@/components/shop/MainShopContainer';
import LeftMainContainer from '@/components/shop/LeftMainContainer';
import MiddleMainContainer from '@/components/shop/MiddleMainContainer';
import RightMainContainer from '@/components/shop/RightMainContainer';

const Shop = () => {
	const [loading, setLoading] = useState(false);
	if (loading) {
    return <Loading />;
	}
  return (
    <Layout>
      <MainShopContainer>
        <LeftMainContainer />
        <MiddleMainContainer />
        <RightMainContainer />
      </MainShopContainer>
    </Layout>
  )
}



export default Shop;