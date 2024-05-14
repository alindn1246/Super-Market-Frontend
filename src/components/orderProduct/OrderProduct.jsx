import React, { useEffect, useState } from "react";
import { Table, Button, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../../features/cartSlice";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IconButton } from "@mui/material";

export default function OrderProduct() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [data, setData] = useState([]);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  function calculateDiscountedPrice(originalPrice, discountPercentage) {
    var discountedPrice = (
      originalPrice *
      (1 - discountPercentage / 100)
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
    dispatch(clearCart({ userId: user.id }));
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handlePlaceOrder = () => {
    cart.cartItems.forEach((cartItem) => {
      axios
        .post("https://localhost:7211/api/OrderProduct", {
          orderId: orderId,
          productId: cartItem.id,
          quantity: cartItem.cartQuantity,
          price: calculateDiscountedPrice(cartItem.price, cartItem.discount),
        })
        .then((response) => {
          console.log("Order placed successfully:", response.data);
          navigate("/");
        })
        .catch((error) => {
          console.error("Error placing order:", error);
        });
    });
  
    // Update the total amount of the order
    axios.patch(`https://localhost:7211/api/Order/${orderId}`, {
      totalAmount: cart.cartTotalAmount
    })
    .then((response) => {
      console.log("Total amount updated successfully:", response.data);
    })
    .catch((error) => {
      console.error("Error updating total amount:", error);
    });
  };

  return (
    <div className="container card shadow border-0 mt-4 mb-4">
      <div className="card-header bg-secondary bg-gradient ml-0 py-3">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="text-white"> Order Products</h1>
          </div>
        </div>
      </div>
      <div className="card-body p-4">
        <div className="row pb-3"></div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>cartQuantity</th>
              <th>Price</th>
              <th>Size</th>
              <th>Total amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.cartItems &&
              cart.cartItems.map((cartItem) => (
                <tr key={cartItem.id}>
                  <td>{cartItem.productName}</td>
                  <td>
                    <Stack direction="horizontal">
                      <IconButton onClick={() => handleDecreaseCart(cartItem)}>
                        <RemoveIcon sx={{ fontSize: "20px" }} />
                      </IconButton>
                      {cartItem.cartQuantity}
                      <IconButton onClick={() => handleAddToCart(cartItem)}>
                        <AddIcon sx={{ fontSize: "20px" }} />
                      </IconButton>
                    </Stack>
                  </td>
                  <td>
                    {calculateDiscountedPrice(
                      cartItem.price,
                      cartItem.discount
                    )}
                  </td>
                  <td>
                    {cartItem.size}
                    {cartItem.sizeUnit}
                  </td>
                  <td>
                    {" "}
                    {calculateDiscountedPrice(
                      cartItem.price,
                      cartItem.discount
                    ) * cartItem.cartQuantity}
                  </td>

                  <td className="text-center">
                    <Button
                      variant="danger"
                      onClick={() => {
                        handleRemoveFromCart(cartItem);
                      }}
                    >
                      <DeleteForeverOutlinedIcon />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
          <div>
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>
              {" "}
              Total amount:${cart.cartTotalAmount}
            </span>
          </div>
        </Table>
        <Button
          variant="primary"
          onClick={() => {
            handlePlaceOrder();
            handleClearCart();
          }}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}
