import { IconButton } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Stack } from "react-bootstrap";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../../../features/cartSlice";
import axios from "axios";
import { Link } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [imageUrls, setImageUrls] = useState({});
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
    fetchProductImages();
  }, [cart, dispatch]);



  const fetchProductImages = async () => {
    const urls = {};
    for (const cartItem of cart.cartItems) {
      const imageResponse = await axios.get(
        `https://localhost:7211/api/ProductImage/GetProductImages?productId=${cartItem.id}`
      );
      urls[cartItem.id] = imageResponse.data.map(base64ToImageUrl);
    }
    setImageUrls(urls);
  };

  const base64ToImageUrl = (base64String) => {
    return `data:image/jpeg;base64,${base64String}`;
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function calculateDiscountedPrice(originalPrice, discountPercentage) {
    var discountedPrice = (
      originalPrice * (1 - discountPercentage / 100)
    ).toFixed(2);

    return discountedPrice;
  }
const [user, setUser] = useState(null);
  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, userId: user.id }));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart({ product, userId: user.id }));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart({ product, userId: user.id }));
  };
  const handleClearCart = () => {
    dispatch(clearCart({userId: user.id}));
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleReviewCart = async () => {
    try {
      const response = await axios.post("https://localhost:7211/api/Order", {
        userId: user.id,
        totalAmount: cart.cartTotalAmount,
      });
      console.log("Order created:", response.data);
      navigate(`/Admin/Order/${response.data.id}`);
     
    } catch (error) {
      console.error("Error creating order:", error);
      // Handle errors
    }
  };

  return (
    <>
      <IconButton onClick={handleShow}>
        <ShoppingCart sx={{ color: "#DE0724", fontSize: "36px" }} />
      </IconButton>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        scroll={true}
        style={{ width: "535px" }}
      >
        <Offcanvas.Header closeButton style={{ background: "#393939" }}>
          <Offcanvas.Title className="text-white">
            Cart-
            <span style={{ fontWeight: "bold" }}>${cart.cartTotalAmount}</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cart.cartItems.length === 0 ? (
            <div
              style={{ height: "400px" }}
              className=" d-flex align-items-center justify-content-center"
            >
              <div className="text-center">
                <ShoppingCartTwoToneIcon
                  sx={{ width: "300px", height: "200px" }}
                />
                <h4> Your cart is empty</h4>
                <p>Browse and search for products to begin.</p>
              </div>
            </div>
          ) : (
            <div>
              {cart.cartItems &&
                cart.cartItems.map((cartItem) => (
                  <div key={cartItem.id}>
                    <Stack direction="horizontal" style={{ height: "150px" }}>
                      <div
                        style={{
                          width: "70px",
                          height: "70px",
                          marginRight: "8px",
                        }}
                      >
                        <img
                          src={imageUrls[cartItem.id]}
                          alt=""
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                      </div>
                      <Stack style={{ marginTop: "20px" }}>
                        <div className=" d-flex justify-content-between">
                          <div
                            className="card-link text-left "
                            style={{ width: "190px" }}
                          >
                            <span
                              style={{
                                display: "block",
                                fontSize: "14px",
                                fontFamily: "poppins",
                                lineHeight: "1",
                              }}
                            >
                              {cartItem.productName}
                            </span>
                            <span
                              style={{
                                display: "block",
                                fontSize: "14px",
                                fontFamily: "poppins",
                              }}
                            >
                              {cartItem.size}
                            </span>
                          </div>
                          <div className="align-items-center">
                            <IconButton
                              onClick={() => handleRemoveFromCart(cartItem)}
                            >
                              <DeleteOutlinedIcon />
                            </IconButton>
                          </div>
                        </div>
                        <div className=" d-flex justify-content-between">
                          <div className=" w-25">
                            <span
                              style={{
                                fontSize: "23px",
                                fontFamily: "poppins",
                                fontWeight: "bold",
                              }}
                            >
                              $
                              {calculateDiscountedPrice(
                                cartItem.price,
                                cartItem.discount
                              ) * cartItem.cartQuantity}
                            </span>
                          </div>
                          <div className="">
                            <div className="quantity-controls d-flex align-items-center justify-content-between">
                              <span
                                onClick={() => handleDecreaseCart(cartItem)}
                                style={{ cursor: "pointer", fontSize: "14.58px" }}
                              >
                                —
                              </span>
                              <span className="flex flex-1">
                                {" "}
                                {cartItem.cartQuantity}
                              </span>
                              <span
                                onClick={() => handleAddToCart(cartItem)}
                                style={{ cursor: "pointer", fontSize: "18.9px" }}
                              >
                                +
                              </span>
                            </div>
                          </div>
                        </div>
                      </Stack>
                    </Stack>
                    <hr style={{ width: "100%" }} />
                  </div>
                ))}
              <button
                style={{
                  width: "100%",
                  display: "flex",
                  border: "none",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "red",
                  color: "white",
                  borderRadius: "5px",
                  maxWidth: "500px",
                  padding: "7px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
                onClick={handleReviewCart}
              >

                
        
                 <span
                   style={{
                     fontWeight: "bold",
                     fontSize: "16px",
                   }}
                 
                 >
                   Review Cart
                 </span>
            

                
              
              </button>
             
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Cart;
