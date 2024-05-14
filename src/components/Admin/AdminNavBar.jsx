import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { AccountCircle, Margin, ShoppingCart } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Col, Dropdown, Row } from "react-bootstrap";
import "./Header.css";
import { Link,NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AdminNavBar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <AccountCircle
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      sx={{ color: "#DE0724", fontSize: "40px" }}
    >
      {children}
      &#x25bc;
    </AccountCircle>
  ));

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }

    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }

    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);
  console.log(isLoggedIn);
  console.log(user);
  console.log(token);

  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      {["lg"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          variant="dark"
          className={isScrolled ? "navbar-fixed" : ""}
          style={{ padding: "8px", background: "#323232" }}
        >
          <Container fluid>
            <Row className=" w-100 align-items-center ">
              <Col xs={6} lg={1} className=" order-1  order-lg-1  ">
                <Navbar.Toggle
                  aria-controls={`offcanvasNavbar-expand-${expand}`}
                  onClick={handleShowOffcanvas}
                />
                <Link to={"/Admin"}>
                  <Navbar.Brand>
                    {" "}
                    <div
                      className="logo-container"
                      style={{ marginLeft: "4px" }}
                    >
                      <div className="logo">
                        AHS<span className="registered">&#174;</span>
                      </div>
                    </div>{" "}
                  </Navbar.Brand>
                </Link>
              </Col>

              <Col lg={2} className="order-lg-2 ">
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="top"
                  className=""
                  style={{ height: "100%" }}
                  show={showOffcanvas}
                  onHide={handleCloseOffcanvas}
                >
                  <Offcanvas.Header className="bg-dark text-white">
                    <CloseIcon
                      sx={{ cursor: "pointer" }}
                      onClick={handleCloseOffcanvas}
                    />
                    <Offcanvas.Title
                      id={`offcanvasNavbarLabel-expand-${expand}`}
                    >
                      <div
                        className="logo-container"
                        style={{ marginLeft: "2px" }}
                      >
                        <div className="logo">
                          AHS<span className="registered">&#174;</span>
                        </div>
                      </div>
                    </Offcanvas.Title>

                    <div className="d-flex align-items-center order-2 ml-auto"></div>
                  </Offcanvas.Header>
                  <Offcanvas.Body className="  ">
                    <Nav className="justify-content-start pe-3 ">
                      
                     
                      <NavDropdown
                        title={<span>Content Mangment</span>}
                        id="basic-nav-dropdown"
                        show={showDropdown}
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                      >
                       
                        <NavDropdown.Item as={NavLink} to={"/Admin/Users"}>
                         Users
                        </NavDropdown.Item>
                        
                        <NavDropdown.Item as={NavLink} to={"/Admin/Orders"}>
                          
                         
                         Orders
                         
                        </NavDropdown.Item>
                        
                        
                      </NavDropdown>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Col>

              <Col
                lg={9}
                xs={6}
                className="d-flex align-items-center justify-content-end
              order-2 order-lg-4 "
              >
                <Nav.Link
                  href="#account"
                  className="nav-link-xs-margin nav-item-xs"
                >
                  {isLoggedIn ? (
                    <Stack direction="row" alignItems="center">
                      <Dropdown style={{ border: "none" }}>
                        <Dropdown.Toggle
                          as={CustomToggle}
                          variant="none"
                        ></Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={handleLogout}>
                            Logout
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <Stack>
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: "8px",
                            fontFamily: "popins",
                          }}
                        >
                          {user.name}
                        </Typography>
                        <Typography sx={{ color: "#A0A38D", fontSize: "9px" }}>
                          LoggedIn
                        </Typography>
                      </Stack>
                    </Stack>
                  ) : (
                    <Stack direction="row" alignItems="center">
                      <Link to={"/LogIn"}>
                        <AccountCircle
                          sx={{ color: "#DE0724", fontSize: "40px" }}
                        />
                      </Link>
                      <Stack>
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: "12px",
                            fontFamily: "popins",
                          }}
                        >
                          HI Guest
                        </Typography>
                        <Typography sx={{ color: "#A0A38D", fontSize: "9px" }}>
                          Sign In or Register
                        </Typography>
                      </Stack>
                    </Stack>
                  )}
                </Nav.Link>
              </Col>
            </Row>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default AdminNavBar;
