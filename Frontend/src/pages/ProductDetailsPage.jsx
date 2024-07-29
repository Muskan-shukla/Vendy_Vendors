import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import ProductDetails from '../components/Products/ProductDetails';
import SuggestedProduct from '../components/Products/SuggestedProduct';
import { productData } from '../static/data';

const ProductDetailsPage = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const productName = name.replace(/-/g, ' ');
    const product = productData.find((item) => item.name === productName);
    setData(product);
  }, [name]);

  return (
    <div>
      <Header />
      {data ? (
        <>
          <ProductDetails data={data} />
          <SuggestedProduct data={data} />
        </>
      ) : (
        <p>Product not found</p>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
