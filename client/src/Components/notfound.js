import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1 className="text-center mb-4">404 Error: Page Not Found</h1>
          <p className="lead">
            The page you requested could not be found. Please check the URL and try again.
          </p>
          <div className="d-flex justify-content-center mt-4">
            <Button as={Link} to="/login" variant="primary">
              Go Home
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;