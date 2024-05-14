import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  return (
    <footer className=" text-center text-lg-start">
      <Container
        fluid
        className="p-4"
        style={{ backgroundColor: "#393939", color: "white" }}
      >
        <Row style={{ color: "white" }}>
          <Col lg={3} md={6} className="mb-4 mb-md-0 ">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a
                  href="#!"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  Link 1
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  Link 2
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  Link 3
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  Link 4
                </a>
              </li>
            </ul>
          </Col>
          <Col lg={3} md={6} className="mb-4 mb-md-0 ">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a
                  href="#!"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  Link 1
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  Link 2
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  Link 3
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  Link 4
                </a>
              </li>
            </ul>
          </Col>
          <Col lg={3} md={6} className="mb-4 mb-md-0 ">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a
                  href="#!"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  Link 1
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  Link 2
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  Link 3
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  Link 4
                </a>
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <div className="text-center">
              <div
                style={{
                  marginLeft: "43%",
                }}
              >
                <div className="logo-container" style={{ marginLeft: "4px" }}>
                  <div className="logo">
                    AHS<span className="registered">&#174;</span>
                  </div>
                </div>
              </div>

              <p>Where quality meets affordability</p>
              <div className="d-flex  justify-content-center gap-3">
                <FacebookIcon />
                <TwitterIcon />
                <InstagramIcon />
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "#323232", color: "white" }}
      >
        © 2024 Copyright:
        <a className="text-white" style={{ textDecoration: "none" }} href="#">
          Ali
        </a>
      </div>
    </footer>
  );
};

export default Footer;
