import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";

const Register = () => {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  sessionStorage.setItem("loggedIn", false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    if (userName.trim() !== "" && password.trim() !== "") {
      try {
        const resp = await axios.post("/createUser", {
          userName,
          password,
        });
        if (resp.status == 200) {
          setErrorMessage("");
          setSuccessMessage("Signed up Successfully. Log in to continue");
        } else {
          setSuccessMessage("");
          setErrorMessage("An error occured");
        }
      } catch (e) {
        setSuccessMessage("");
        setErrorMessage(e.response.data.message);
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Header as="h5">Register</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Register
                </Button>
                <br />
                <br />
                {errorMessage !== "" ? (
                  <div className="alert alert-danger">
                    <p>{errorMessage}</p>
                  </div>
                ) : (
                  <div></div>
                )}
                {successMessage !== "" ? (
                  <div className="alert alert-success">
                    <p>{successMessage}</p>
                  </div>
                ) : (
                  <div></div>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;