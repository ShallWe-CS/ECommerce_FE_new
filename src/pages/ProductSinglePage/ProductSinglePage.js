import React, { useEffect, useState } from "react";
import "./ProductSinglePage.scss";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncProductSingle,
  getProductSingle,
  getSingleProductStatus,
} from "../../store/productSlice";
import { STATUS } from "../../utils/status";
import Loader from "../../components/Loader/Loader";
import { formatPrice } from "../../utils/helpers";
import {
  addToCart,
  getCartMessageStatus,
  setCartMessageOff,
  setCartMessageOn,
} from "../../store/cartSlice";
import CartMessage from "../../components/CartMessage/CartMessage";
import SelectSizeMessage from "../../components/SelectSizeMessage/SelectSizeMessage";
import DropDown from "../../components/DropDown/DropDown";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Product from "../../components/Product/Product";
import { Navigation } from "swiper";
import "swiper/css/navigation";
import {
  getAllProductsByCategory,
  fetchAsyncProductsOfCategory,
} from "../../store/categorySlice";

const ProductSinglePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(getProductSingle);
  const productSingleStatus = useSelector(getSingleProductStatus);
  const [quantity, setQuantity] = useState(1);
  const cartMessageStatus = useSelector(getCartMessageStatus);
  const [selected, setSelected] = useState("Size");
  const [sizeSelected, setSizeSelected] = useState(false);
  const [showSizeMessage, setShowSizeMessage] = useState(false);
  const categoryProducts = useSelector(getAllProductsByCategory);
  const [baseUrl, setUrl] = useState();

  // getting single product
  useEffect(() => {
    dispatch(fetchAsyncProductSingle(id));

    if (cartMessageStatus) {
      setTimeout(() => {
        dispatch(setCartMessageOff());
      }, 2000);
    }
  }, [cartMessageStatus, id]);

  const category = product[0]?.attributes.categories.data[0].attributes.title;

  useEffect(() => {
    dispatch(fetchAsyncProductsOfCategory(category));
  }, []);

  const relateProducts = [];

  if (categoryProducts !== undefined) {
    for (let i = 0; i < categoryProducts.length; i++) {
      relateProducts.push(categoryProducts[i]);
    }
  }

  let discountedPrice =
    product[0]?.attributes.price -
    product[0]?.attributes.price * (product[0]?.attributes.discount / 100);
  if (productSingleStatus === STATUS.LOADING) {
    return <Loader />;
  }

  const increaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty + 1;
      if (tempQty > product?.stock) tempQty = product?.stock;
      return tempQty;
    });
  };

  const decreaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty - 1;
      if (tempQty < 1) tempQty = 1;
      return tempQty;
    });
  };

  const addToCartHandler = (product) => {
    if (!selected || selected === "Size") {
      setShowSizeMessage(true);

      setTimeout(() => {
        setShowSizeMessage(false);
      }, 1400);

      return;
    }

    setSizeSelected(true);

    let discountedPrice =
      product[0]?.attributes.price -
      product[0]?.attributes.price * (product[0]?.attributes.discount / 100);
    let totalPrice = quantity * discountedPrice;
    let size = selected; //part which will show the size that is selected in the cart
    let productID = product[0].id + size;

    dispatch(
      addToCart({
        ...product,
        quantity: quantity,
        totalPrice,
        discountedPrice,
        size,
        productID,
      })
    );
    dispatch(setCartMessageOn(true));
  };

  const url1 = product[0]?.attributes.images.data[0]?.attributes.url;
  const url2 = product[0]?.attributes.images.data[1]?.attributes.url;

  const dropDownArray = [];

  const dropDownItems = product[0]?.attributes.sizes.data;

  if (dropDownItems !== undefined) {
    for (let i = 0; i < dropDownItems.length; i++) {
      dropDownArray.push(dropDownItems[i].attributes.size);
    }
  }

  return (
    <main className="single-product py-5 bg-whitesmoke">
      <div className="product-single">
        <div className="container">
          <div className="product-single-content bg-white grid">
            <div className="product-single-l">
              <div className="product-img">
                <div className="product-img-zoom">
                  {baseUrl != null ? <img src={baseUrl} alt="" className="img-cover img-main" /> : <img src={url1} alt="" className="img-cover img-main" />}
                </div>
                <div className="product-img-thumbs flex align-center my-2">
                  <div className="thumb-item">
                    <img src={url1} alt="" className="img-cover" onClick={() => setUrl(url1)}/>
                  </div>
                  <div className="thumb-item">
                    <img src={url2} alt="" className="img-cover"  onClick={() => setUrl(url2)}/>
                  </div>
                  <div className="thumb-item">
                    <img src={url2} alt="" className="img-cover"  onClick={() => setUrl(url1)}/>
                  </div>
                </div>
              </div>
            </div>

            <div className="product-single-r">
              <div className="product-details font-manrope">
                <div className="title fs-20 fw-5">
                  {product[0]?.attributes.product_title}
                </div>
                {/* <div>
                  <p className="para fw-3 fs-15">{product?.description}</p>
                </div> */}
                <div className="info flex align-center flex-wrap fs-14">
                  {/* <div className="rating">
                    <span className="text-orange fw-5">Rating:</span>
                    <span className="mx-1">{product?.rating}</span>
                  </div> */}
                  {/* <div className="vert-line"></div> */}
                  {/* <div className="brand">
                    <span className="text-orange fw-5">Brand:</span>
                    <span className="mx-1">
                      {product[0]?.attributes.product_brand}
                    </span>
                  </div> */}
                  {/* <div className="vert-line"></div> */}
                  {/* <div className="brand">
                    <span className="text-orange fw-5">Category:</span>
                    <span className="mx-1 text-capitalize">
                      {product[0]?.attributes.categories.data[0].attributes
                        .title
                        ? product[0].attributes.categories.data[0].attributes.title.replace(
                            "-",
                            " "
                          )
                        : ""}
                    </span>
                  </div> */}
                </div>

                <div className="price">
                  <div className="flex align-center">
                    <div className="new-price fw-5 font-poppins fs-24 text-orange">
                      {formatPrice(discountedPrice)}
                    </div>
                    <div className="old-price text-gray">
                      {formatPrice(product[0]?.attributes.price)}
                    </div>
                    {/* <span className="fs-14 mx-2 text-dark">
                      Inclusive of all taxes
                    </span> */}
                  </div>

                  {/* <div className="flex align-center my-1">
                    <div className="new-price fw-5 font-poppins fs-24 text-orange">
                      {formatPrice(discountedPrice)}
                    </div>
                    <div className="discount bg-orange fs-13 text-white fw-6 font-poppins">
                      {product?.discountPercentage}% OFF
                    </div>
                  </div> */}
                </div>

                <div className="color">Color: Blue</div>

                <div className="qty flex toggle-flex align-center my-4">
                  <div className="flex">
                    <div className="qty-text">Quantity:</div>

                    <div className="qty-change flex align-center mx-3">
                      <button
                        type="button"
                        className="qty-decrease flex align-center justify-center"
                        onClick={() => decreaseQty()}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <div className="qty-value flex align-center justify-center">
                        {quantity}
                      </div>
                      <button
                        type="button"
                        className="qty-increase flex align-center justify-center"
                        onClick={() => increaseQty()}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>

                  <div>
                    <DropDown
                      selected={selected}
                      setSelected={setSelected}
                      title={"Size"}
                      dropDownItems={dropDownArray}
                    />
                  </div>

                  {product?.stock === 0 ? (
                    <div className="qty-error text-uppercase bg-danger text-white fs-12 ls-1 mx-2 fw-5">
                      out of stock
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="btns">
                  <button type="button" className="add-to-cart-btn btn">
                    <i className="fas fa-shopping-cart"></i>
                    <span
                      className="btn-text mx-2"
                      onClick={() => {
                        addToCartHandler(product);
                      }}
                    >
                      add to cart
                    </span>
                  </button>
                  {/* <button type="button" className="buy-now btn mx-3">
                    <span className="btn-text">buy now</span>
                  </button> */}
                </div>

                <div>
                  <div className="details">
                    <div className="detail-title">Details</div>
                    <ul>
                      <li className="li1">
                        Can’t contain your bossy attitude?! No need! Show who's
                        the boss in our new Relax Tee! When you can't express
                        what you need with a mango, this adorable Relax Tee
                        comes pretty close.
                      </li>
                    </ul>
                  </div>
                  <div className="details">
                    <div className="detail-title">
                      Materials & Care Insturctions
                    </div>
                    <ul>
                      <li className="li1">
                        The Relax Tee is an oversized T-Shirt (6XL) that comes
                        in one FREE size that fits almost anyone! - Lovingly
                        crafted from the best, most cuddly-soft materials:
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container related-products">
          <div className="bg-white">
            <h2 className="title">You may also Like!</h2>
            <Swiper
              modules={[Navigation]}
              spaceBetween={50}
              slidesPerView={4}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                400: {
                  slidesPerView: 1,
                },
                639: {
                  slidesPerView: 3,
                },
                865: {
                  slidesPerView: 4,
                },
                1000: {
                  slidesPerView: 4,
                },
                1500: {
                  slidesPerView: 4,
                },
                1700: {
                  slidesPerView: 4,
                },
              }}
              navigation
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {relateProducts.map((product) => {
                let discountedPrice =
                  product.attributes.price -
                  product.attributes.price *
                    (product.attributes.discount / 100);
                return (
                  <SwiperSlide>
                    {
                      <Product
                        key={product.id}
                        product={{ ...product, discountedPrice }}
                      />
                    }
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>

      {cartMessageStatus && <CartMessage />}
      {showSizeMessage && <SelectSizeMessage />}
    </main>
  );
};

export default ProductSinglePage;