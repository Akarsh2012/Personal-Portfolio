import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Particle from "../Particle";

function NotFound() {
  return (
    <Container fluid className="notfound-section">
      <Particle />
      <Container className="notfound-content">
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">
          Page Not <span className="purple">Found</span>
        </h2>
        <p className="notfound-text">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="notfound-btn">
          Back to Home
        </Link>
      </Container>
    </Container>
  );
}

export default NotFound;
