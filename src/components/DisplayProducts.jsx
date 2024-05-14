import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CardsProduct from "./cards/CardsProduct";
import { Container, Row, Col, Form } from "react-bootstrap";

const DisplayProducts = () => {
  const { type } = useParams();
  const [data, setData] = useState([]);
  const [uniqueBrands, setUniqueBrands] = useState([]);
  const [uniqueCategory, setUniqueCategory] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedcategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchProductsbySubCategory = async () => {
      try { if(!selectedBrand && !selectedcategory){
        const response = await axios.get(
          `https://localhost:7211/api/product/GetProductWithSubCategoryAsync?subcategory=${type}`
        );
        setData(response.data);
      }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductsbySubCategory();
  }, [type,selectedBrand,selectedcategory]);

  useEffect(() => {
    if (data.length > 0) {
      const category = new Set(data.map((product) => product.categories.name));
      setUniqueCategory([...category]);
    }
  }, [data]);

  const handlecategoryChange = (event) => {
    const selectedcategory = event.target.value;
    setSelectedCategory((prevValue) => (prevValue === selectedcategory ? '' : selectedcategory ));
   
  };

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        if (selectedcategory) {
          const response = await axios.get(
            `https://localhost:7211/api/product/GetProductWithCategoryAsync?category=${selectedcategory}`
          );
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching products by brand:", error);
      }
    };

    fetchProductsByCategory();
  }, [selectedcategory]);

  useEffect(() => {
    if (data.length > 0) {
      const brands = new Set(data.map((product) => product.brandName));
      setUniqueBrands([...brands]);
    }
  }, [data]);

  const handleBrandChange = (event) => {
    const selectedBrand = event.target.value;
    setSelectedBrand((prevValue) => (prevValue === selectedBrand ? '' : selectedBrand ));
   
  };

  useEffect(() => {
    const fetchProductsByBrand = async () => {
      try {
        if (selectedBrand) {
          const response = await axios.get(
            `https://localhost:7211/api/product/GetProductsByBrandNameAsync?brandname=${selectedBrand}`
          );
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching products by brand:", error);
      }
    };

    fetchProductsByBrand();
  }, [selectedBrand]);


  return (
    <Container fluid>
      <Row>
        <Col lg={12} className="d-flex justify-content-center mb-3"><h1 >{selectedcategory? selectedcategory :type}</h1> </Col>
        <Col md={4} lg={2} className="">
          <div>
            <h6>Product Filter</h6>

          <div>
            <label>Brand</label>
              {uniqueBrands.map((brand) => (
                <Form key={brand}>
                  <Form.Group as={Row} className="mb-3">
                    <Col sm={10}>
                      <Form.Check
                        inline
                       
                        label={brand}
                        name={brand}
                        id={brand}
                        value={brand}
                        checked={selectedBrand === brand}
                        onChange={handleBrandChange}
                      />
                    </Col>
                  </Form.Group>
                </Form>
              ))}
          </div>
          <div>
            <label>Category</label>
              {uniqueCategory.map((category) => (
                <Form key={category}>
                  <Form.Group as={Row} className="mb-3">
                    <Col sm={10}>
                      <Form.Check
                        inline
                       
                        label={category}
                        name={category}
                        id={category}
                        value={category}
                        checked={selectedcategory === category}
                        onChange={handlecategoryChange}
                      />
                    </Col>
                  </Form.Group>
                </Form>
              ))}
          </div>
          </div>
        </Col>
        <Col md={8} lg={10} className="">
          <Row>
            {data.map((product) => (
              <Col
                lg={3}
                key={product.id}
                className="mb-2 d-flex justify-content-center align-items-center"
              >
                <CardsProduct products={[product]} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default DisplayProducts;
