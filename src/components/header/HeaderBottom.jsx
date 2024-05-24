
import React, { useState,useEffect,useRef } from 'react';
import { NavLink,Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./HeaderBottom.css";
import image1 from "./1.svg";
import drinksImage from "./ImagesHeader/Drinks.jpeg";
import Image2 from "./ImagesHeader/FruitsandVegtables.jpeg"
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import SwiperCore from "swiper";
import { Pagination } from "swiper/modules";
import { useMediaQuery } from '@mui/material';
SwiperCore.use([Pagination]);

const slides = [
  {
    name: "Drinks",
    image: drinksImage,
    items: [
      "Soft Drinks",
      "Sports and Energy Drinks",
      "Juices",
      "Water",
      "Coffe",
      "Tea",
      "Hot Drinks",
      "Milk",
      "Alcohol",
      "Non-Alcoholic",
    ],
  },
  {
    name: "Fruit&Vegetables",
    image: Image2,
    items: [
      "Apples",
      "Bananas",
      "Oranges",
      "Spinach",
      "Broccoli",
      "Carrots",
      "Tomatoes",
      "Lettuce",
      "Cucumbers",
      "Bell Peppers",
      "Potatoes",
      "Onions",
    ],
  },
  {
    name: "Meat & Seafood",
    image: image1,
    items: [
      "Beef",
      "Chicken Breast",
      "Pork Chops",
      "Salmon",
      "Shrimp",
      "Tuna",
      "Lobster",
      "Crab",
      "Lamb",
      "Turkey",
      "Sausages",
      "Bacon",
    ],
  },
  {
    name: "Dairy, Eggs & Fridge",
    image: image1,
    items: [
      "Milk",
      "Cheese",
      "Eggs",
      "Butter",
      "Yogurt",
      "Cream",
      "Sour Cream",
      "Cream Cheese",
      "Cottage Cheese",
      "Orange Juice",
      "Apple Juice",
      "Yogurt Drinks",
    ],
  },
  {
    name: "Bakery",
    image: image1,
    items: [
      "Bread",
      "Bagels",
      "Croissants",
      "Donuts",
      "Muffins",
      "Rolls",
      "Pita Bread",
      "Tortillas",
      "Sourdough Bread",
      "Rye Bread",
      "Whole Wheat Bread",
      "Cinnamon Rolls",
    ],
  },
  {
    name: "Frozen Food",
    image: image1,
    items: [
      "Frozen Vegetables",
      "Frozen Fruits",
      "Frozen Pizza",
      "Frozen Meals",
      "Frozen Desserts",
      "Frozen Chicken",
      "Frozen Fish",
      "Frozen Shrimp",
      "Frozen Burgers",
      "Frozen Appetizers",
      "Frozen French Fries",
      "Frozen Waffles",
    ],
  },
  {
    name: "Health & Beauty",
    image: image1,
    items: [
      "Shampoo",
      "Conditioner",
      "Body Wash",
      "Soap",
      "Lotion",
      "Deodorant",
      "Toothpaste",
      "Mouthwash",
      "Floss",
      "Facial Cleanser",
      "Facial Moisturizer",
      "Sunscreen",
    ],
  },
  {
    name: "Baby",
    image: image1,
    items: [
      "Diapers",
      "Baby Wipes",
      "Baby Food",
      "Baby Formula",
      "Baby Lotion",
      "Baby Shampoo",
      "Baby Oil",
      "Baby Powder",
      "Baby Soap",
      "Baby Rash Cream",
      "Baby Bottles",
      "Pacifiers",
    ],
  },
  {
    name: "Household",
    image: image1,
    items: [
      "Toilet Paper",
      "Paper Towels",
      "Tissues",
      "Trash Bags",
      "Laundry Detergent",
      "Fabric Softener",
      "Bleach",
      "Disinfectant Wipes",
      "Dish Soap",
      "All-Purpose Cleaner",
      "Glass Cleaner",
      "Air Freshener",
    ],
  },
  {
    name: "Pet",
    image: image1,
    items: [
      "Dog Food",
      "Cat Food",
      "Pet Treats",
      "Pet Toys",
      "Pet Beds",
      "Pet Bowls",
      "Pet Collars",
      "Pet Leashes",
      "Cat Litter",
      "Fish Food",
      "Bird Food",
      "Reptile Food",
    ],
  },
 
  {
    name: "Pantry",
    image: image1,
    items: [
      "Rice",
      "Pasta",
      "Canned Beans",
      "Canned Vegetables",
      "Canned Fruits",
      "Cereal",
      "Granola Bars",
      "Snack Bars",
      "Crackers",
      "Chips",
      "Popcorn",
      "Nuts",
    ],
  },
 
];

const HeaderBottom = () => {
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const isLargeScreen = useMediaQuery('(min-width: 992px)');

 
  return (
    <>
      {isLargeScreen && ( 
        <Navbar className="header-bottom-navbar" style={{ padding: "8px", background: "#393939", position: "relative" }}>
          <Container fluid>
            <div className="d-flex  w-100 justify-content-center" >
            
              {slides.map((slide, index) => (
                <div className={`dropdownMenu ${isDropDownOpen ? 'open' : ''}`} key={index} style={{ textAlign: "center" }}>
                  <Button
                    sx={{
                      background: "transparent",
                      border: 0,
                      color: "#FFFFFF",
                      "&:hover": { backgroundColor: "lightgray", color: "red" },
                      fontWeight: "900",
                      width: "100%",
                      fontSize: "10px",
                      padding: "10px",
                      height: "auto",
                      overflow: "visible",
                    }}
                  >
                    {slide.name}
                  </Button>
                  

                  <div className="menu">
                    <Swiper
                      modules={[Pagination]}
                      slidesPerView={1}
                      pagination={{ clickable: true }}
                      id='swipe-headerbottom'
                      
                    >
                      {[slide].map((slide) => {
                        const numItems = slide.items.length;
                        const numPages = Math.ceil(numItems / itemsPerPage);
                        const pageIndexes = Array.from(Array(numPages).keys());

                        return pageIndexes.map((pageIndex) => (
                          <SwiperSlide
                            key={`${slide.name}_page_${pageIndex}`}
                          >
                            <img
                              style={{ marginTop: "20px" }}
                              src={slide.image}
                              alt={slide.name}
                            />
                            <div>
                              <h2
                                style={{
                                  fontSize: "14px",
                                  marginTop: "10px",
                                  color: " #9a99ac",
                                  cursor: "pointer",
                                }}
                              >
                                {slide.name}
                              </h2>

                              <div className="linksMenu">
                                {slide.items
                                  .slice(
                                    pageIndex * itemsPerPage,
                                    (pageIndex + 1) * itemsPerPage
                                  )
                                  .map((item, index) => (
                                    
                                    <Link 
                                      key={`${slide.name}_item_${index}`}
                                      to={`/displayproduct/${item}`}
                                     
                                   
                                      
                                    >
                                      {item}
                                    </Link>

                                  ))}
                              </div>
                            </div>
                          </SwiperSlide>
                        ));
                      })}
                    </Swiper>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Navbar>
      )}
    </>
  );
};

export default HeaderBottom;