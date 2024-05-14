import React, { useState,useEffect } from "react";
import { Card, Stack, Badge } from "react-bootstrap";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useMediaQuery } from "@mui/material";
import "./CardsProduct.css";
import img1 from "./320866.jpeg";
import { useDispatch, useSelector } from "react-redux";
import  { addToCart,decreaseCart } from "../../features/cartSlice";
import{addToFavourite,removeFromFavourite} from "../../features/favouriteSlice"
import axios from "axios";


const CardsProduct = ({ products }) => {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
 
  const cart = useSelector((state) => state.cart);
  const favourite=useSelector((state)=>state.favourite)

  const [imageUrls, setImageUrls] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    const fetchProductImages = async () => {
      const urls = {};
      for (const product of products) {
        const imageResponse = await axios.get(`https://localhost:7211/api/ProductImage/GetProductImages?productId=${product.id}`);
        urls[product.id] = imageResponse.data.map(base64ToImageUrl);
      }
      setImageUrls(urls);
    };

    fetchProductImages();
  }, [products]);

  const base64ToImageUrl = (base64String) => {
    return `data:image/jpeg;base64,${base64String}`;
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }

    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);
  const handleAddToFavourite = (product) => {
    dispatch(addToFavourite({ product, userId: user.id }));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, userId: user.id }));
  };
  function calculateDiscountedPrice(originalPrice, discountPercentage) {
    var discountedPrice = (
      originalPrice *
      (1 - discountPercentage / 100)
    ).toFixed(2);

    return discountedPrice;
  };

  const getProductQuantity = (productId) => {
    return cart.cartItems.find((item) => item.id === productId)?.cartQuantity || 0;
  };
  const getFavouriteQuantity = (productId) => {
    return favourite.favouriteItems.find((item) => item.id === productId)?.favouriteQuantity || 0;
  };

  const handleRemoveFromFavourite = (product) => {
    dispatch(removeFromFavourite({ product, userId: user.id }));
  };


  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart({ product, userId: user.id }));
  };

  const handleError=()=>{
    alert('Please LogIn to your account')
  }


  



  const isSmallerThan576 = useMediaQuery("(max-width:576px)");
  const isSmallerThan450 = useMediaQuery("(max-width:450px)");

  return (
    <div>
      {!isSmallerThan576 &&
        products.map((product) => (
          <Card
            key={product.id}
            style={{
              width: "200px",
              height: "400px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Card.Body className="">
         
              {product.discount > 0 && (
                <div className="ribbon ribbon-top-left">
                  <span>Special  </span>
                </div>
              )}
              <div
                style={{ width: "150px", height: "150px", marginLeft: "6px" }}
                className="  "
              >
              
                <Card.Img src={imageUrls[product.id]} style={{ height: "140px" }} />
              </div>

              <div
                className="card-link  text-left "
                style={{ height: "100px" }}
              >
             
                 <Card.Title
                   style={{
                     fontSize: "12px",
                     fontFamily: "poppins",
                     fontWeight: "bold",
                   }}
                 >
                   {product.productName}
                 </Card.Title>
               
                <Card.Subtitle
                  style={{
                    fontSize: "12px",
                    fontFamily: "poppins",
                    fontWeight: "bold",
                    marginBottom: "30px",
                  }}
                >
                 
                  {product.size}{product.sizeUnit}
                </Card.Subtitle>
              </div>

              <div className="d-flex align-items-center mb-2">
                {product.discount>0 &&(
                   <Badge bg="danger" style={{ position: "absolute" }}>
                   <del> ${product.price}</del>
                 </Badge>
                )}

               {getFavouriteQuantity(product.id)===1? 
               <FavoriteIcon
               sx={{
                 fontSize: "28px",
                 color: "red",
                 cursor: "pointer",
                 position: "absolute",
                 right: 10,
               }}
               onClick={() => handleRemoveFromFavourite(product)}
             />
               : 
               
               <FavoriteBorderOutlinedIcon
                  sx={{
                    fontSize: "28px",
                    color: "#A0A3BD",
                    cursor: "pointer",
                    position: "absolute",
                    right: 10,
                  }}
                  onClick={() => handleAddToFavourite(product)}
                />
               }
                
              </div>

              <div className="d-flex align-items-center">
                <span
                  style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                  }}
                >
                  ${calculateDiscountedPrice(product.price, product.discount)}
                </span>
              </div>

             
              {isLoggedIn ? (
  getProductQuantity(product.id) === 0 ? (
    <div className="card-Button" onClick={() => handleAddToCart(product)}>
      Add to Cart
    </div>
  ) : (
    <div className="quantity-controls d-flex align-items-center justify-content-between">
      <span
        onClick={() => handleDecreaseCart(product)}
        style={{ cursor: "pointer", fontSize: "18px" }}
      >
        —
      </span>
      <span className="flex flex-1">{getProductQuantity(product.id)}</span>
      <span
        onClick={() => handleAddToCart(product)}
        style={{ cursor: "pointer", fontSize: "23px" }}
      >
        +
      </span>
    </div>
  )
) : (
  <div className="card-Button" onClick={handleError}>Add to Cart</div>
)}

            </Card.Body>
          </Card>
        ))}

      {/* Media Query for smaller screens */}

      {isSmallerThan576 && !isSmallerThan450 && (
        <div >
          {products.map((product) => (
            <Card
            key={product.id}
              style={{
                width: "400px",
                height: "200px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                
              }}
             
            >
              <Card.Body>
                <div className="ribbon ribbon-top-left">
                  <span>Special</span>
                </div>
                <Stack direction="horizontal" gap={2}>
                  <div
                    className=""
                    style={{ height: "100%", position: "relative" }}
                  >
                    <div
                      style={{ width: "130px", height: "130px" }}
                      className=" mb-4"
                    >
                      <Card.Img src={imageUrls[product.id]} />
                    </div>
                  </div>

                  <div className="w-100">
                    <div
                      className="d-flex align-items-center"
                      style={{ position: "relative", height: "25px" }}
                    >
                      {getFavouriteQuantity==1? 
                      <FavoriteIcon
                      sx={{
                        position: "absolute",
                        right: "0",
                        fontSize: "28px",
                        color: "red",
                        backgroundColor: "red",
                        cursor: "pointer",
                      }}
                      onClick={() => handleAddToFavourite(product)}
                    />
                      :
                      <FavoriteBorderOutlinedIcon
                        sx={{
                          position: "absolute",
                          right: "0",
                          fontSize: "28px",
                          color: "#A0A3BD",
                          backgroundColor: "white",

                          cursor: "pointer",
                        }}
                        onClick={() => handleAddToFavourite(product)}
                      />
                      }
                      <FavoriteBorderOutlinedIcon
                        sx={{
                          position: "absolute",
                          right: "0",
                          fontSize: "28px",
                          color: "#A0A3BD",
                          backgroundColor: "white",

                          cursor: "pointer",
                        }}
                        onClick={() => handleAddToFavourite(product)}
                      />
                    </div>

                    <div className="card-link mb-1 text-left">
                      <Card.Title
                        style={{
                          fontSize: "15px",
                          fontFamily: "poppins",
                          fontWeight: "bold",
                        }}
                      >
                        {product.productName}
                      </Card.Title>
                      <Card.Subtitle
                        style={{
                          fontSize: "15px",
                          fontFamily: "poppins",
                          fontWeight: "bold",
                        }}
                      >
                        {product.size}{product.sizeUnit}
                      </Card.Subtitle>
                    </div>

                    <div className="d-flex align-items-center">
                      <span
                        style={{
                          fontSize: "35px",
                          fontWeight: "bold",
                          marginBottom: "10px",
                        }}
                      >
                        ${calculateDiscountedPrice(product.price, product.discount)}
                      </span>
                      <Badge bg="danger" style={{ marginLeft: "2px" }}>
                        <del> ${product.price}</del>
                      </Badge>
                    </div>

                    <div
                      className="w-100"
                      style={{ position: "relative", height: "45px" }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: "50%",
                          transform: "translateX(-50%)",
                        }}
                      >
                        {isLoggedIn ?(getProductQuantity(product.id) === 0 ? (
                          <div
                            className="card-Button"
                            onClick={() => handleAddToCart(product)}
                          >
                            Add to Cart
                            
                          </div>
                        ) : (
                          <div className="quantity-controls d-flex align-items-center justify-content-between">
                            <span
                              onClick={()=>handleDecreaseCart(product)}
                              style={{ cursor: "pointer", fontSize: "18px" }}
                            >
                              —
                            </span>
                            <span className="flex flex-1">{getProductQuantity(product.id)}</span>
                            <span
                              onClick={()=>handleAddToCart(product)}
                              style={{ cursor: "pointer", fontSize: "23px" }}
                            >
                              +
                            </span>
                          </div>
                        )
                      ) : (
                        <div className="card-Button" onClick={handleError}>Add to Cart</div>
                      )}
                      </div>
                    </div>
                  </div>
                </Stack>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}

      {isSmallerThan450 && (
        <div>
          {products.map((product) => (
            <Card
               key={product.id}
              style={{
                width: "308.8px",
                height: "162px",
                boxShadow: "0px 3.6px 7.2px rgba(0, 0, 0, 0.1)",
              }}
              className=""
            >
              <Card.Body>
                <div className="ribbon ribbon-top-left">
                  <span>Special</span>
                </div>
                <Stack direction="horizontal" gap={1.8}>
                  <div
                    className=""
                    style={{ height: "100%", position: "relative" }}
                  >
                    <div
                      style={{ width: "105.3px", height: "105.3px" }}
                      className=" mb-3.6"
                    >
                      <Card.Img src={imageUrls[product.id]} />
                    </div>
                  </div>

                  <div className="w-100">
                    <div
                      className="d-flex align-items-center"
                      style={{ position: "relative", height: "20.25px" }}
                    >
                      <FavoriteBorderOutlinedIcon
                        sx={{
                          position: "absolute",
                          right: "0",
                          fontSize: "22.68px",
                          color: "#A0A3BD",
                          backgroundColor: "white",

                          cursor: "pointer",
                        }}
                        onClick={() => handleAddToFavourite(product)}
                      />
                    </div>

                    <div className="card-link mb-0.9 text-left">
                      <Card.Title
                        style={{
                          fontSize: "12.15px",
                          fontFamily: "poppins",
                          fontWeight: "bold",
                        }}
                      >
                        {product.productName}
                      </Card.Title>
                      <Card.Subtitle
                        style={{
                          fontSize: "12.15px",
                          fontFamily: "poppins",
                          fontWeight: "bold",
                        }}
                      >
                        {product.size}
                      </Card.Subtitle>
                    </div>

                    <div className="d-flex align-items-center">
                      <span
                        style={{
                          fontSize: "28.35px",
                          fontWeight: "bold",
                          marginBottom: "8.1px",
                        }}
                      >
                        ${calculateDiscountedPrice(product.price, product.discount)}
                      </span>
                      <Badge bg="danger" style={{ marginLeft: "1.62px" }}>
                        <del> ${product.price}</del>
                      </Badge>
                    </div>

                    <div
                      className="w-100"
                      style={{ position: "relative", height: "36px" }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: "50%",
                          transform: "translateX(-50%)",
                        }}
                      >
                        {isLoggedIn ?(getProductQuantity(product.id)=== 0 ? (
                          <div
                            className="card-Button"
                            onClick={() => handleAddToCart(product)}
                          >
                            Add to Cart
                          </div>
                        ) : (
                          <div className="quantity-controls d-flex align-items-center justify-content-between">
                            <span
                              onClick={()=>handleDecreaseCart(product)}
                              style={{ cursor: "pointer", fontSize: "14.58px" }}
                            >
                              —
                            </span>
                            <span className="flex flex-1">{getProductQuantity(product.id)}</span>
                            <span
                              onClick={()=>handleAddToCart(product)}
                              style={{ cursor: "pointer", fontSize: "18.9px" }}
                            >
                              +
                            </span>
                          </div>
                        )
                      ) : (
                        <div className="card-Button" onClick={handleError}>Add to Cart</div>
                      )}
                      </div>
                    </div>
                  </div>
                </Stack>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardsProduct;
