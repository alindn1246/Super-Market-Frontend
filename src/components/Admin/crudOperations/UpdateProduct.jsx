import React, { useEffect, useState } from "react";
import { Col, Container, Row,Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const navigate = useNavigate();
  const units = [
    { id: "kg", name: "Kilogram" },
    { id: "g", name: "Gram" },
    { id: "oz", name: "Ounce" },
    { id: "lb", name: "Pound" },
    { id: "L", name: "Liter" },
    { id: "mL", name: "Milliliter" },
    { id: "cup", name: "Cup" },
    { id: "fl oz", name: "Fluid ounce" },
    { id: "pt", name: "Pint" },
    { id: "qt", name: "Quart" },
    { id: "gal", name: "Gallon" },
  ];
  const { type } = useParams();
  const { productId } = useParams();
  const [data, setData] = useState([]);
  const [productData, setProductData]=useState([]);

  const handleNavigateBack=()=>{
    navigate(`/Admin/MangeContent/${type}`);
  }
  
  const [formData, setFormData] = useState({
    id:0,
    productName: "",
    brandName: "",
    size: 0,
    sizeUnit: "",
    discount: 0,
    price: 0,
    productDescription: "",
    productQuantity: 0,
    categoryId: 0,
  });

  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      file: file,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData);
      const response = await axios.put(
        `https://localhost:7211/api/product`,
        formData
      );
      console.log("Product updated:", response.data);
      // Handle success, maybe redirect or show a success message
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    const fetchProductsbySubCategory = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7211/api/Category?sub=${type}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductsbySubCategory();
  }, [type]);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7211/api/product/${productId}`
        );
        const product = response.data;
        setProductData(product);
        setFormData({
            id:product.id|| "",
            productName: product.productName || "", 
            brandName: product.brandName || "",
            size: product.size || 0,
            sizeUnit: product.sizeUnit || "",
            discount: product.discount || 0,
            price: product.price || 0,
            productDescription: product.productDescription || "",
            productQuantity: product.productQuantity||0,
            categoryId: product.categoryId || 0,
          });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProductById();
  }, [productId]);

  console.log(productData);

  return (
    <Container className="card shadow border-0 mt-4">
      <div className="card-header bg-secondary bg-gradient ml-0 py-3 mb-4">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="text-white"> Create Products </h1>
          </div>
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
          <Col lg={6}>
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Name"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Label>Product BrandName</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter  BrandName"
              name="brandName"
              value={formData.brandName}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product Size</Form.Label>
          <Col md={9}>
            <Form.Control
              type="number"
              placeholder="Enter size"
              name="size"
              value={formData.size}
              onChange={handleChange}
            />
          </Col>
          <Col md={3}>
            <Form.Select
              aria-label="Default select example"
              name="sizeUnit"
              value={formData.sizeUnit}
              onChange={handleChange}
            >
              <option>Product Size Unit</option>
              {units &&
                units.map((op) => (
                  <option key={op.id} value={op.id}>
                    {op.name}
                  </option>
                ))}
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Label className="w-50 me-2">Product price</Form.Label>
        <Form.Label>Product discount</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control
            aria-label="Amount"
            className="me-4"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          <Form.Control
            aria-label="Amount"
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
          />
          <InputGroup.Text>%</InputGroup.Text>
        </InputGroup>
      
        <Form.Group className="mb-3">
          <Form.Label>product Quantity</Form.Label>
        <Form.Control
            aria-label="Amount"
            className="me-4"
            type="number"
            name="productQuantity"
            value={formData.productQuantity}
            onChange={handleChange}
          />
        </Form.Group>
        <InputGroup className="mb-3">
          <InputGroup.Text>Product Description</InputGroup.Text>
          <Form.Control
            as="textarea"
            aria-label="With textarea"
            style={{ height: "100px" }}
            name="productDescription"
            value={formData.productDescription}
            onChange={handleChange}
          />
        </InputGroup>

        <Form.Group className="mb-3">
          <Form.Select
            aria-label="Default select example"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
          >
            <option>Product Category</option>
            {data &&
              data.map((op) => (
                <option key={op.id} value={op.id}>
                  {op.name}
                </option>
              ))}
          </Form.Select>
        </Form.Group>

      

        <Stack direction="horizontal" className="align-items justify-content-center">
          <Button  variant="success" type="submit" style={{width:"200px",marginRight:"10px"}}>
            update
          </Button>
  
        <Button variant="primary" style={{width:"200px"}} onClick={handleNavigateBack}>
         Back to list
        </Button>
       </Stack>
      </Form>
    </Container>
  );
};

export default UpdateProduct;
