import { IconButton } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Stack } from "react-bootstrap";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch, useSelector } from "react-redux";


import {removeFromFavourite} from "../../../features/favouriteSlice"

import axios from "axios";

function Favourite() {
  const [show, setShow] = useState(false);
  const [imageUrls, setImageUrls] = useState({});
  const favourite = useSelector((state) => state.favourite);
  const dispatch = useDispatch();

  useEffect(() => {
   
    fetchProductImages();
  }, [favourite, dispatch]);



  const fetchProductImages = async () => {
    const urls = {};
    for (const favouriteItem of favourite.favouriteItems) {
      const imageResponse = await axios.get(
        `https://localhost:7211/api/ProductImage/GetProductImages?productId=${favouriteItem.id}`
      );
      urls[favouriteItem.id] = imageResponse.data.map(base64ToImageUrl);
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


 
  const handleRemoveFromFavourite = (product) => {
    dispatch(removeFromFavourite({ product, userId: user.id }));
  };
 

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);


  return (
    <>
      
      <span onClick={handleShow}>Favourite</span>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="start"
        scroll={true}
        style={{ width: "535px" }}
      >
        <Offcanvas.Header closeButton style={{ background: "#393939" }}>
          <Offcanvas.Title className="text-white">
          Favourite
            
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
         
            <div>
              {favourite.favouriteItems &&
                favourite.favouriteItems.map((favouriteItem) => (
                  <div key={favouriteItem.id}>
                    <Stack direction="horizontal" style={{ height: "150px" }}>
                      <div
                        style={{
                          width: "70px",
                          height: "70px",
                          marginRight: "8px",
                        }}
                      >
                        <img
                          src={imageUrls[favouriteItem.id]}
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
                              {favouriteItem.productName}
                            </span>
                            <span
                              style={{
                                display: "block",
                                fontSize: "14px",
                                fontFamily: "poppins",
                              }}
                            >
                              {favouriteItem.size}
                            </span>
                          </div>
                          <div className="align-items-center">
                            <IconButton
                              onClick={() => handleRemoveFromFavourite(favouriteItem)}
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
                                favouriteItem.price,
                                favouriteItem.discount
                              ) }
                            </span>
                          </div>
                          
                        </div>
                      </Stack>
                    </Stack>
                    <hr style={{ width: "100%" }} />
                  </div>
                ))}
            
            </div>
          
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Favourite;
