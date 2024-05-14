import React, { useState, useEffect } from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import { Search } from "@mui/icons-material";
import { Input } from '@mui/material';
import {Link} from "react-router-dom"
import axios from 'axios';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';

const ModalSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showList, setShowList] = useState(false);
  const [backdropOpacity, setBackdropOpacity] = useState(0);
  const [products, setProducts] = useState([]);

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

  const handleBlur = () => {
    setTimeout(() => {
      setShowList(false);
      setBackdropOpacity(0);
    }, 200);
  };

  const renderProductList = () => {
    if (filteredProducts.length > 0) {
      return filteredProducts.map((product) => (
        <ListGroup.Item key={product.id} style={{ color: 'black' }}>
          <Link to={`/product/${product.id}`} style={{color:"black" ,textDecoration:"none"}}>
          {product.productName} 
          </Link>
        
        </ListGroup.Item>
      ));
    } else {
      return <ListGroup.Item style={{ color: 'white' }}>No Options</ListGroup.Item>;
    }
  };

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
      }} />
    )}
    <div style={{ position: 'relative' }}>
      <InputGroupText className='bg-light'>
        <Search sx={{ color: "black", marginRight: "4px" }} />
        <Form.Control
          type="search"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
          onBlur={handleBlur}
          style={{ position: 'relative', border: "none"}}
        />
      </InputGroupText>
      {showList && (
        <ListGroup style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          zIndex:1001,
          maxHeight: '300px',
          overflowY: 'auto',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          width: "100%"
        }}>
          {renderProductList()}
        </ListGroup>
      )}
    </div>
    </>
  );
};

export default ModalSearch;
