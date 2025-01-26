import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import logo from "../../assets/imgs/logo.avif";
import "./Nav.css";
import { Button } from "react-bootstrap";

const Navtab = () => {
  const location = useLocation(); // Get current route path

  return (
    <Navbar expand="lg" className="bg-light shadow-sm">
      <Container>
        {/* Brand with Logo */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="App Logo"
            style={{
              height: "60px",
              width: "auto",
              marginRight: "10px",
              borderRadius: "20px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          />
          <span className="fw-bold text-primary">ChapTer2</span>
        </Navbar.Brand>

        {/* Toggle Button for Mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Collapsible Menu */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={` fs-40 text-dark fw-semibold mx-2 navlink ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/chat"
              className={` fs-40 text-dark fw-semibold mx-2 navlink ${
                location.pathname === "/chat" ? "active" : ""
              }`}
            >
              Chat
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/signup"
              className={`text-dark fw-semibold mx-2 navlink ${
                location.pathname === "/signup" ? "active" : ""
              }`}
            >
              <Button size="medium">Sign Up</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navtab;
