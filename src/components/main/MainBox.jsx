import { Box } from "@mui/material";
import React from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import img1 from "./Specials-Content-Card.png";
import img2 from "./ImagesMain/LP_Header.png";
import './MainBox.css'

const MainBox = () => {
  return (
    <Box  sx={{ marginTop: "20px" }}>
      <Container fluid>
        <Row className="align-items-center ">
          <Col lg={3} sm={6} className="mb-2 mt-2 d-flex justify-content-center">
            <Card className="special-card" style={{background:"#f8f8f8"}}>
              <Card.Body className="text-left">
                <Card.Title className="title-maincard">Low Prices</Card.Title>
                <Card.Subtitle className="mb-1 text-muted subtitle-maincard">
                Where Quality Meets Price
                </Card.Subtitle>
                <Card.Img src={img2}  />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} sm={6} className="mb-2 mt-2 d-flex justify-content-center">
            <Card className="special-card" style={{background:"#f8f8f8"}}>
              <Card.Body className="text-left">
                <Card.Title className="title-maincard">The Essiential's</Card.Title>
                <Card.Subtitle className="mb-2 text-muted subtitle-maincard">
                  Discover the week special's offers
                </Card.Subtitle>
                <Card.Img src={img1}  />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} sm={6} className="mb-2 mt-2 d-flex justify-content-center">
            <Card className="special-card" style={{background:"#f8f8f8"}}>
              <Card.Body className="text-left">
                <Card.Title className="title-maincard">The Essiential's</Card.Title>
                <Card.Subtitle className="mb-2 text-muted subtitle-maincard">
                 Stock up o everyday must-haves
                </Card.Subtitle>
                <Card.Img src={`https://storage.googleapis.com/dam-met-prd-2c44f3b.met.prd.v8.commerce.mi9cloud.com/Images/Essentials-Content-Card-2023.png`}  />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} sm={6} className="mb-2 mt-2 d-flex justify-content-center">
            <Card className="special-card" style={{background:"#f8f8f8"}} >
              <Card.Body className="text-left">
                <Card.Title className="title-maincard">Lunch On The Go</Card.Title>
                <Card.Subtitle className="mb-2 text-muted subtitle-maincard">
                 Save on your weekly lunch shop
                </Card.Subtitle>
                <Card.Img src={`https://braze-images.com/appboy/communication/marketing/content_cards_message_variations/images/6541b8882457a9004e1711e8/d0151ba5c2000b46400722d72966ff2320815245/original.png?1698805900`}  />
              </Card.Body>
            </Card>
          </Col>
        
         
        
        </Row>
      </Container>
    </Box>
  );
};

export default MainBox;
