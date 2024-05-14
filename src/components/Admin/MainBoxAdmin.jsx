import { Box } from "@mui/material";
import React,{useState,useEffect} from "react";
import { Col, Container, Row, Card, Stack } from "react-bootstrap";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import axios from 'axios';


const MainBoxAdmin = () => {
  const [customersCount, setCustomersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [profitAmount, setProfitAmount] = useState(0);

  useEffect(() => {
  
    axios.get('https://localhost:7211/api/Order/GetNumberOfOrders')
      .then(response => {
        setOrdersCount(response.data);
        console.log(response.data)
      })
      
      .catch(error => {
        console.error('Error fetching orders count:', error);
      });

    // Axios call to fetch profit amount
    axios.get('https://localhost:7211/api/Order/GetTotalAmountOfOrders')
      .then(response => {
        setProfitAmount(response.data);
      })
      .catch(error => {
        console.error('Error fetching profit amount:', error);
      });

    axios.get('https://localhost:7211/api/auth/customersCount')
      .then(response => {
        setCustomersCount(response.data);
      })
      .catch(error => {
        console.error('Error fetching profit amount:', error);
      });
  }, []);


  return (
    <Box  sx={{ marginTop: "20px" }}>
      <Container fluid>
        <Row className="align-items-center ">
          <Col lg={4} sm={6} className="mb-2 mt-2 d-flex justify-content-center">
            <Card className="card shadow border-0" style={{width:"300px",height:"200px"}}>
              <Card.Body >
                <Stack direction="horizontal" className="d-flex justify-content-center " style={{marginTop:"40px"}}>
                <div>
                    <Card.Title style={{fontSize:"40px",fontWeight:"bold"}}>{customersCount}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted subtitle-maincard">
                 Customers
                </Card.Subtitle>
                </div>
                 <GroupsIcon sx={{fontSize:"80px", marginLeft:"70px"}}/>
                </Stack>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} sm={6} className="mb-2 mt-2 d-flex justify-content-center">
            <Card className="card shadow border-0" style={{width:"300px",height:"200px"}}>
              <Card.Body >
                <Stack direction="horizontal" className="d-flex justify-content-center " style={{marginTop:"40px"}}>
                <div>
                    <Card.Title style={{fontSize:"40px",fontWeight:"bold"}}>{ordersCount}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted subtitle-maincard">
                 Orders
                </Card.Subtitle>
                </div>
                 <LocalMallOutlinedIcon sx={{fontSize:"80px", marginLeft:"70px"}}/>
                </Stack>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} sm={6} className="mb-2 mt-2 d-flex justify-content-center">
            <Card className="card shadow border-0" style={{width:"300px",height:"200px"}}>
              <Card.Body >
                <Stack direction="horizontal" className="d-flex justify-content-center " style={{marginTop:"40px"}}>
                <div>
                    <Card.Title style={{fontSize:"35px",fontWeight:"bold"}}>{profitAmount}$</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted subtitle-maincard">
              Profit
                </Card.Subtitle>
                </div>
                 <PaidOutlinedIcon sx={{fontSize:"80px", marginLeft:"10px"}}/>
                </Stack>
              </Card.Body>
            </Card>
          </Col>
         
        </Row>
      </Container>
    </Box>
  );
};

export default MainBoxAdmin;
