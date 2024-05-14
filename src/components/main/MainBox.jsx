import { Box } from "@mui/material";
import React from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import img1 from "./Specials-Content-Card.png";
import './MainBox.css'

const MainBox = () => {
  return (
    <Box  sx={{ marginTop: "20px" }}>
      <Container fluid>
        <Row className="align-items-center ">
          <Col lg={3} sm={6} className="mb-2 mt-2 d-flex justify-content-center">
            <Card className="special-card" style={{background:"#f8f8f8"}}>
              <Card.Body className="text-left">
                <Card.Title className="title-maincard">Special</Card.Title>
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
                  Discover the week special's offers
                </Card.Subtitle>
                <Card.Img src={img1}  />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} sm={6} className="mb-2 mt-2 d-flex justify-content-center">
            <Card className="special-card" style={{background:"#f8f8f8"}}>
              <Card.Body className="text-left">
                <Card.Title className="title-maincard">Special</Card.Title>
                <Card.Subtitle className="mb-2 text-muted subtitle-maincard">
                  Discover the week special's offers
                </Card.Subtitle>
                <Card.Img src={img1}  />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} sm={6} className="mb-2 mt-2 d-flex justify-content-center">
            <Card className="special-card" style={{background:"#f8f8f8"}} >
              <Card.Body className="text-left">
                <Card.Title className="title-maincard">Special</Card.Title>
                <Card.Subtitle className="mb-2 text-muted subtitle-maincard">
                  Discover the week special's offers
                </Card.Subtitle>
                <Card.Img src={img1}  />
              </Card.Body>
            </Card>
          </Col>
        
         
        
        </Row>
      </Container>
    </Box>
  );
};

export default MainBox;
