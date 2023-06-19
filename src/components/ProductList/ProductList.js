import React from 'react';
import "./ProductList.scss";
import Product from "../Product/Product";

const ProductList = ({products}) => {
  return (
    <div className='product-lists grid bg-white my-3'>
      {
        products.map(product => {
          let discountedPrice = (product.attributes.price) - (product.attributes.price * (product.attributes.discount / 100));
          return (
            <Product key = {product.id} product = {{...product, discountedPrice}} />
          )
        })
      }
    </div>
  )
}

export default ProductList