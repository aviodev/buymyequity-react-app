import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { default as logo } from "../../assets/svg/logo.svg";
function NavigationBar() {
  return (
    <>
      <Container fluid className="m-bg-white">
        <Container className="mx-auto">
          <Navbar bg="light" expand="lg" className="d-flex mx-4">
            <Navbar.Brand>
              <Link to="/home" className="">
                <img src={logo} alt="" className="logo" />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle
              className="custom-toggler"
              aria-controls="navbarScroll"
            />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="my-2 flex-center" navbarScroll>
                <Link className="nav-link" to="/home">
                  Home
                </Link>
                <Link className="nav-link" to="/investor">
                  Investor
                </Link>
                <Link className="nav-link" to="/startup">
                  Startup
                </Link>
                <Link className="nav-link" to="/blogs">
                  Blogs
                </Link>
                <Link className="nav-link" to="/gallery">
                  Gallery
                </Link>
                <Link className="nav-link" to="/contactus">
                  Contact Us
                </Link>
                <Link className="nav-link" to="/aboutus">
                  About Us
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </Container>
    </>
  );
}

export default NavigationBar;
