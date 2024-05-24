import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./HeaderBottomList.css"

function HeaderBottomList({isAdmin, closeOffcanvas }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hover, setHover] = useState(false);

  const hoverStyle = {
    backgroundColor: hover ? '#f8f9fa' : 'transparent', // Light grey background on hover
  };
  const categories = [
    {
      name: "Drinks",

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

  const handleItemClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

  const handleLinkClick = () => {
   
    closeOffcanvas();
  };

  return (
    <ListGroup as="ol" style={{ justifyContent: "space-evenly", border: "1px solid #E5E7EB" }}>
      {selectedCategory ? (
        <>
          <ListGroup.Item action onClick={handleBackClick}  className="list-group" >
            <FaArrowLeft /> Back
          </ListGroup.Item>
          {categories
            .find((cat) => cat.name === selectedCategory)
            .items.map((item) => (
              <ListGroup.Item key={item} style={{ cursor: "pointer" }}>
                {
                  isAdmin ?<Link
                  to={`/Admin/MangeContent/${item}`}
                  onClick={handleLinkClick}
                  style={{textDecoration:"none",color:"black" }}

                >
                  {item}
                </Link>
                :
                <Link
                  to={`/displayproduct/${item}`}
                  onClick={handleLinkClick}
                  style={{textDecoration:"none",color:"black" }}

                >
                  {item}
                </Link>
                }
                
              </ListGroup.Item>
            ))}
        </>
      ) : (
        categories.map((category) => (
          <ListGroup.Item
            key={category.name}
            onClick={() => handleItemClick(category.name)}
            className="list-group"
          >
            <div className="d-flex align-items-center justify-content-between" 
            style={{ hoverStyle, cursor: "pointer" }}>
              {category.name}
              <FaArrowRight />
            </div>
          </ListGroup.Item>
        ))
      )}
    </ListGroup>
  );
}

export default HeaderBottomList;
