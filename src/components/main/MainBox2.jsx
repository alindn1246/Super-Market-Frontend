
import React from 'react';
import { Container, Row, Col,Card } from 'react-bootstrap';
import img1 from "./ImagesMain/Fresh-Produce-Category-Card.jpg";
import img2 from "./ImagesMain/Meat-Seafood.png";
import img3 from "./ImagesMain/Pantry-Fillers.png";
import img4 from "./ImagesMain/Cleaning-Household-Goods.png";
import img5 from "./ImagesMain/Baby-Category-Card .jpg";
import img6 from "./ImagesMain/Pet-Category-Card.jpg";



  

function MainBox2() {
  return (
    <Container fluid className='mt-3'>
    
      <Row >
      <Col lg={4} md={6} sm={6} xs={12} className='Border align-content-center' style={{marginBottom:"4px"}}>
          <Card>
        <Card.Body>
        <Card.Img src={img1}  />
        </Card.Body>
          </Card>
        </Col>
      <Col lg={4} md={6} sm={6} xs={12} className='Border align-content-center' style={{marginBottom:"4px"}}>
          <Card>
        <Card.Body>
        <Card.Img src={img2}  />
        </Card.Body>
          </Card>
        </Col>
      <Col lg={4} md={6} sm={6} xs={12} className='Border align-content-center' style={{marginBottom:"4px"}}>
          <Card>
        <Card.Body>
        <Card.Img src={img3}  />
        </Card.Body>
          </Card>
        </Col>
      <Col lg={4} md={6} sm={6} xs={12} className='Border align-content-center' style={{marginBottom:"4px"}}>
          <Card>
        <Card.Body>
        <Card.Img src={img4}  />
        </Card.Body>
          </Card>
        </Col>
      <Col lg={4} md={6} sm={6} xs={12} className='Border align-content-center' style={{marginBottom:"4px"}}>
          <Card>
        <Card.Body>
        <Card.Img src={img5}  />
        </Card.Body>
          </Card>
        </Col>
      <Col lg={4} md={6} sm={6} xs={12} className='Border align-content-center' style={{marginBottom:"4px"}}>
          <Card>
        <Card.Body>
        <Card.Img src={img6}  />
        </Card.Body>
          </Card>
        </Col>
      
      
      </Row>
    </Container>
  );
}

export default MainBox2;
