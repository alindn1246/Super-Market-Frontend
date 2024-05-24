import React, { useState, useEffect } from 'react';
import { Form, ListGroup, InputGroup, Stack, Badge } from 'react-bootstrap'; 
import { Search } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './ModalSearch.css'

const ModalSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showList, setShowList] = useState(false);
  const [backdropOpacity, setBackdropOpacity] = useState(0);
  const [products, setProducts] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7211/api/product');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

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

  const getFirstThreeWords = (productName) => {
    return productName.split(' ').slice(0, 3).join(' ');
  };

  const filteredProducts = searchTerm.length > 0
    ? products.filter(product =>
      product.productName.toLowerCase().startsWith(searchTerm.toLowerCase()) &&
      getFirstThreeWords(product.productName.toLowerCase()).includes(searchTerm.toLowerCase())
    )
    : [];

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setShowList(value.length > 0);
    setBackdropOpacity(value.length > 0 ? 0.7 : 0);
  };

  const handleItemClick = (product) => {
    setBackdropOpacity(0);
    setShowList(false);
    setSearchTerm('');
    navigate(`/product/${product.id}`);
  };

  function calculateDiscountedPrice(originalPrice, discountPercentage) {
    var discountedPrice = (
      originalPrice *
      (1 - discountPercentage / 100)
    ).toFixed(2);

    return discountedPrice;
  }

  return (
    <>
      {backdropOpacity > 0 && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          opacity: backdropOpacity,
          transition: 'opacity 0.3s ease',
          zIndex: 999 
        }} />
      )}
      <div style={{ position: 'relative', zIndex: 999 }}>
        <InputGroup.Text className='bg-light'  style={searchTerm ? { borderRadius: "0px" } : { borderRadius: "30px" }}> 
          <Search sx={{ color: "black", marginRight: "4px" }} />
          <Form.Control
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            style={{  border: "none" }}
          />
        </InputGroup.Text> 
        {showList && (
          <ListGroup style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1001, 
            maxHeight: '300px',
            overflowY: 'auto',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            width: "100%"
          }}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ListGroup.Item key={product.id} style={{ 
                  cursor: "pointer", 
                  color: 'black', 
                  border: "1px solid #E5E7EB", 
                  zIndex: 1001,
                  
                 
                }} 
                className="listItem"
                  onClick={() => handleItemClick(product)}>
                  <div className='d-flex align-items-center' >
                    <div style={{ width: "70px", height: "70px" }}>
                      <img src={imageUrls[product.id]} style={{ width: "100%" }} />
                    </div>
                    <Stack className='mt-2'>
                      <div>
                        <span style={{ fontWeight: "bold" }}>
                          {product.productName} -
                        </span> 
                        <span style={{ fontSize: "14px" }}> {product.size}{product.sizeUnit} </span>
                      </div>
                      <Stack direction="horizontal" gap={1}>
                        <div>
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
                    </Stack>
                  </div>
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item style={{ cursor: "default", color: 'black', border: "1px solid #E5E7EB", zIndex: 1001 }}>
                No options
              </ListGroup.Item>
            )}
          </ListGroup>
        )}
      </div>
    </>
  );
};

export default ModalSearch;
