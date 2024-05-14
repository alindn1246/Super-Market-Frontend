import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState({});
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://localhost:7211/api/product/${productId}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        const imageResponse = await axios.get(`https://localhost:7211/api/ProductImage/GetProductImages?productId=${productId}`);
        const urls = {};
        urls[productId] = imageResponse.data.map(base64ToImageUrl);
        setImageUrls(urls);
      } catch (error) {
        console.error('Error fetching product images:', error);
      }
    };

    fetchProductImages();
  }, [productId]);

  const base64ToImageUrl = (base64String) => {
    return `data:image/jpeg;base64,${base64String}`;
  };

  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    const discountedPrice = (originalPrice * (1 - discountPercentage / 100)).toFixed(2);
    return discountedPrice;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Card className="product-card">
      <Card.Body>
        <Row className="align-items-center" >
          <Col md={4} className="d-flex justify-content-center">
            <Card.Img src={imageUrls[productId]} />
          </Col>
          <Col md={8}>
            <Card.Title>{product.productName}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{product.size} {product.sizeUnit}</Card.Subtitle>
            <Card.Text>
              <p>Description: {product.productDescription}</p>
              <p>Discounted Price: ${calculateDiscountedPrice(product.price, product.discount)}</p>
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProductDetails;
