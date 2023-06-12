import { Link } from 'react-router-dom';

const Event = ({event}) => {
  
  console.log("event details: ",event);

  const url = event.attributes.banner.data.attributes.url;

    return (
      <Link key = {event?.id}>
        <div className='product-item bg-white'>
          {/* <div className='category'>{product?.attributes.product_category}</div> */}
          <div className='product-item-img'>
            <img className='img-cover' src = {url} />
          </div>
          <div className='product-item-info fs-14'>
            <div className='brand'>
              <span>Brand: </span>
              <span className='fw-7'>bbbb</span>
            </div>
            {/* <div className='title py-2'>
              {product?.attributes.product_title}
            </div> */}
            <div className='price flex align-center justify-center'>
              <span className='old-price'>
                {/* {formatPrice(product?.attributes.price)} */}
              </span>
              <span className='new-price'>
                {/* {formatPrice(product?.discountedPrice)} */}
              </span>
              <span className='discount fw-6'>
                {/* ({product?.attributes.discount}% Off) */}
              </span>
            </div>
          </div>
        </div>
      </Link>
    )
  }
  
  export default Event