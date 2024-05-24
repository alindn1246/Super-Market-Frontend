import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Container, Stack, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseCart } from "../../src/features/cartSlice";
import {
  addToFavourite,
  removeFromFavourite,
} from "../../src/features/favouriteSlice";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState({});
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const favourite = useSelector((state) => state.favourite);

  const { productId } = useParams();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }

    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);
  const handleAddToFavourite = (product) => {
    dispatch(addToFavourite({ product, userId: user.id }));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, userId: user.id }));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7211/api/product/${productId}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        const imageResponse = await axios.get(
          `https://localhost:7211/api/ProductImage/GetProductImages?productId=${productId}`
        );
        const urls = {};
        urls[productId] = imageResponse.data.map(base64ToImageUrl);
        setImageUrls(urls);
      } catch (error) {
        console.error("Error fetching product images:", error);
      }
    };

    fetchProductImages();
  }, [productId]);

  const base64ToImageUrl = (base64String) => {
    return `data:image/jpeg;base64,${base64String}`;
  };

  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    const discountedPrice = (
      originalPrice *
      (1 - discountPercentage / 100)
    ).toFixed(2);
    return discountedPrice;
  };

  const getProductQuantity = (productId) => {
    return (
      cart.cartItems.find((item) => item.id === productId)?.cartQuantity || 0
    );
  };
  const getFavouriteQuantity = (productId) => {
    return (
      favourite.favouriteItems.find((item) => item.id === productId)
        ?.favouriteQuantity || 0
    );
  };

  const handleRemoveFromFavourite = (product) => {
    dispatch(removeFromFavourite({ product, userId: user.id }));
  };

  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart({ product, userId: user.id }));
  };

  const handleError = () => {
    alert("Please LogIn to your account");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="bg-grey">
      <Container
        className="mt-4"
        style={{
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <div className="product-card p-3">
          <div style={{ padding: "15px" }}>
            <Row style={{ height: "100%" }}>
              <Col md={4} className="d-flex justify-content-center">
                <img
                  src={imageUrls[productId]}
                  alt="Product"
                  style={{ width: "100%", borderRadius: "10px" }}
                />
              </Col>
              <Col md={8} className="h-100  ">
                <div className="mb-4">
                  <h1>{product.productName}</h1>
                  <h5 className="text-muted">
                    {product.size} {product.sizeUnit}
                  </h5>
                </div>
                <Stack direction="horizontal" gap={1}>
                  <div style={{ fontSize: "30px", fontWeight: "bold" }}>
                    ${calculateDiscountedPrice(product.price, product.discount)}
                  </div>
                  <div>
                    {product.discount > 0 && (
                      <Badge bg="danger">
                        <del> ${product.price}</del>
                      </Badge>
                    )}
                  </div>
                </Stack>
                <p>
                 {product.productDescription}
                </p>

               <Stack direction="horizontal" gap={4}>
                 <div className="d-flex align-items-center">
                   {isLoggedIn ? (
                     getProductQuantity(product.id) === 0 ? (
                       <div
                         className="card-Button"
                         onClick={() => handleAddToCart(product)}
                       >
                         Add to Cart
                       </div>
                     ) : (
                       <div className="quantity-controls d-flex align-items-center justify-content-between">
                         <span
                           onClick={() => handleDecreaseCart(product)}
                           style={{ cursor: "pointer", fontSize: "14.58px" }}
                         >
                           —
                         </span>
                         <span className="flex flex-1">
                           {getProductQuantity(product.id)}
                         </span>
                         <span
                           onClick={() => handleAddToCart(product)}
                           style={{ cursor: "pointer", fontSize: "18.9px" }}
                         >
                           +
                         </span>
                       </div>
                     )
                   ) : (
                     <div className="card-Button" onClick={handleError}>
                       Add to Cart
                     </div>
                   )}
                 </div>
                 <div>
                   <div>
                     {isLoggedIn ? (
                       <>
                         {getFavouriteQuantity(product.id) === 1 ? (
                           <FavoriteIcon
                             sx={{
                               fontSize: "28px",
                               color: "red",
                               cursor: "pointer",
                             }}
                             onClick={() => handleRemoveFromFavourite(product)}
                           />
                         ) : (
                           <FavoriteBorderOutlinedIcon
                             sx={{
                               fontSize: "28px",
                               color: "#A0A3BD",
                               cursor: "pointer",
                             }}
                             onClick={() => handleAddToFavourite(product)}
                           />
                         )}
                       </>
                     ) : (
                       <FavoriteBorderOutlinedIcon
                       sx={{
                         fontSize: "28px",
                         color: "#A0A3BD",
                         cursor: "pointer",
                       }}
                       onClick={() => handleError()}
                     />
                     )}
                   </div>
                 </div>
               </Stack >
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetails;
