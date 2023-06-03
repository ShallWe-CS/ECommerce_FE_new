import React from 'react';
import { Link } from 'react-router-dom';
import {formatPrice} from "../../utils/helpers";
import "./Product.scss";

const Product = ({product}) => {

  const url = process.env.REACT_APP_DEV_URL + product.attributes.images.data[0].attributes.url;

  return (
    <Link to = {`/product/${product?.id}`} key = {product?.id}>
      <div className='product-item bg-white'>
        <div className='category'>{product?.attributes.product_category}</div>
        <div className='product-item-img'>
          <img className='img-cover' src = {url} alt = {product.title} />
        </div>
        <div className='product-item-info fs-14'>
          <div className='brand'>
            <span>Brand: </span>
            <span className='fw-7'>{product?.attributes.product_brand}</span>
          </div>
          <div className='title py-2'>
            {product?.attributes.product_title}
          </div>
          <div className='price flex align-center justify-center'>
            <span className='old-price'>
              {formatPrice(product?.attributes.price)}
            </span>
            <span className='new-price'>
              {formatPrice(product?.discountedPrice)}
            </span>
            <span className='discount fw-6'>
              ({product?.attributes.discount}% Off)
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product