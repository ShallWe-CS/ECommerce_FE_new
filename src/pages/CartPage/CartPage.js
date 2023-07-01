import React, { useEffect } from "react";
import "./CartPage.scss";
import { useSelector, useDispatch } from "react-redux";
import { shopping_cart } from "../../utils/images";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";
import {
  getAllCarts,
  removeFromCart,
  toggleCartQty,
  clearCart,
  getCartTotal,
} from "../../store/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import {} from "axios";
import { makePaymentRequest } from "../../utils/api";
import { CardElement } from "@stripe/react-stripe-js";

const CartPage = () => {
  const dispatch = useDispatch();
  const carts = useSelector(getAllCarts);
  const { itemsCount, totalAmount } = useSelector((state) => state.cart);
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 576;

  console.log("width:", width);

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  if (carts.length === 0) {
    return (
      <div className="container my-5">
        <div className="empty-cart flex justify-center align-center flex-column font-manrope">
          <img src={shopping_cart} alt="" />
          <span className="fw-6 fs-15 text-gray">
            Your shopping cart is empty.
          </span>
          <Link to="/" className="shopping-btn bg-orange text-white fw-5">
            Go shopping Now
          </Link>
        </div>
      </div>
    );
  }

  // const stripePromise = loadStripe(
  //   process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  //   );

  // const handlePayment = async () => {
  //   try {
  //     const stripe = await stripePromise;

  //     const res = await makePaymentRequest.post("/api/orders", {
  //       products: carts,
  //     });

  //     await stripe.redirectToCheckout({
  //       sessionId: res.data.stripeSession.id,
  //     })

  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <div className="cart bg-white">
      <div className="container">
        <div className="cart-ctable">
          <div className="cart-chead bg-white">
            <div className="cart-ctr fw-6 font-manrope fs-15">
              <div>
                <div className="cart-cth">
                  <span className="cart-ctxt">Product</span>
                </div>
                <div className="cart-cth">
                  <span className="cart-ctxt"></span>
                </div>
              </div>

              <div className="flex cart-chead-r grid-title">
                <div className="cart-cth">
                  <span className="cart-ctxt">Unit Price</span>
                </div>
                <div className="cart-cth">
                  <span className="cart-ctxt">Quantity</span>
                </div>
                <div className="cart-cth-mobile-hide">
                  <span className="cart-ctxt">Total Price</span>
                </div>
                <div className="cart-cth-mobile-hide">
                  <span className="cart-ctxt">Actions</span>
                </div>
              </div>
            </div>
          </div>

          <div className="cart-cbody bg-white">
            {carts.map((cart, idx) => {
              console.log(cart);
              return (
                <div className="cart-ctr py-4" key={cart?.productID}>
                  <div className="flex">
                    <div className="cart-ctd">
                      <span>
                        <img
                          src={cart[0].attributes.images.data[0].attributes.url}
                          alt=""
                          className="img-cover"
                        />
                      </span>
                    </div>
                    <div className="cart-ctd mx-2">
                      {/* <span className='cart-ctxt'>{cart[0]?.attributes.product_title}</span> */}
                      <span className="cart-ctxt">
                        {cart[0]?.attributes.product_title + ` - ` + cart.size}
                      </span>
                    </div>
                  </div>

                  <div className="flex cart-cbody-r grid-title">
                    <div className="cart-ctd">
                      <span className="cart-ctxt">
                        {formatPrice(cart?.discountedPrice)}
                      </span>
                    </div>
                    <div className="cart-ctd">
                      <div className="qty-change flex align-center">
                        <button
                          type="button"
                          className="qty-decrease flex align-center justify-center"
                          onClick={() =>
                            dispatch(
                              toggleCartQty({
                                id: cart?.productID,
                                type: "DEC",
                              })
                            )
                          }
                        >
                          <i className="fas fa-minus"></i>
                        </button>

                        <div className="qty-value flex align-center justify-center">
                          {cart?.quantity}
                        </div>

                        <button
                          type="button"
                          className="qty-increase flex align-center justify-center"
                          onClick={() =>
                            dispatch(
                              toggleCartQty({
                                id: cart?.productID,
                                type: "INC",
                              })
                            )
                          }
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                    <div className="cart-ctd-mobile-hide">
                      <span className="cart-ctxt text-orange fw-5">
                        {formatPrice(cart?.totalPrice)}
                      </span>
                    </div>
                    <div className="cart-ctd">
                      <button
                        type="button"
                        className="delete-btn text-dark"
                        onClick={() =>
                          dispatch(removeFromCart(cart?.productID))
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-cfoot flex align-start justify-between py-3 bg-white">
            <div className="cart-cfoot-l">
              <button
                type="button"
                className="clear-cart-btn text-danger fs-15 text-uppercase fw-4"
                onClick={() => dispatch(clearCart())}
              >
                <i className="fas fa-trash"></i>
                <span className="mx-1">Clear Cart</span>
              </button>
            </div>

            <div className="cart-cfoot-r flex flex-column justify-end">
              <div className="total-txt flex align-center justify-end">
                <div className="font-manrope fw-5">
                  Total ({itemsCount}) items:{" "}
                </div>
                <span className="text-orange fs-22 fw-6">
                  {formatPrice(totalAmount)}
                </span>
              </div>
              {/* <button onClick={handlePayment} type="button" className='checkout-btn text-white bg-orange fs-16' >Check Out</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
