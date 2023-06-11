import './EventPage.scss';

const EventPage = () => {

    return (
      <div className='cat-products py-5 bg-whitesmoke'>
        <div className='container'>
          <div className='cat-products-content'>
            <div className='title-md'>
              {/* <h3>See our <span className='text-capitalize'>{category.replace("-", " ")}</span></h3> */}
              <h2>Events</h2>
            </div>
  
            {/* {
              categoryProductsStatus === STATUS.LOADING ? <Loader /> : <ProductList products = {categoryProducts} />
            } */}
          </div>
        </div>
      </div>
    )
  }
  
  export default EventPage