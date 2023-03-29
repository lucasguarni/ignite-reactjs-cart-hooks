import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';
import { api } from '../../services/api';
import { formatPrice } from '../../util/format';
import { useCart } from '../../hooks/useCart';
import { ProductItem } from '../../components/ProductItem';
import { ProductFormatted, Product } from '../../types';


interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const { addProduct, cart } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    return {
      ...sumAmount,
      [product.id]: product.amount
    }
  }, {} as CartItemsAmount)


  useEffect(() => {
    async function loadProducts() {
      const { data:products } = await api.get<Product[]>('products');
      const productFormatted: ProductFormatted[] = products.map((product: Product) => {
        return {
          ...product,
          priceFormatted: formatPrice(product.price)
        };
      });
      
      setProducts(productFormatted);
    }

    loadProducts();
  }, []);

  function handleAddProduct(id: number) {
    addProduct(id);
  }

  return (
    <ProductList>
      { products.length && products.map(product => {
          return <ProductItem 
            key={product.id}
            product={product}
            addProduct={() => handleAddProduct(product.id)} 
            amount={cartItemsAmount[product.id]}
          />
        })
      }
    </ProductList>
  );
};

export default Home;
