import './EventList.scss';

const EventList = () => {
    return (
      <div className='product-lists grid bg-whitesmoke my-3'>
        {/* {
          products.map(product => {
            let discountedPrice = (product.attributes.price) - (product.attributes.price * (product.attributes.discount / 100));
            return (
              <Product key = {product.id} product = {{...product, discountedPrice}} />
            )
          })
        } */}
      </div>
    )
  }
  
  export default EventList