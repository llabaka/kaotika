import React, { useState } from 'react';
import Loading from '@/components/Loading';
import Layout from '@/components/Layout';


const Shop = () => {
	const [loading, setLoading] = useState(false);
	if (loading) {
    return <Loading />;
	}
  return (
		<Layout>
    	<div>SHOP</div>
		</Layout>
  )
}



export default Shop;