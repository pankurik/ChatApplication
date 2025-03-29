import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";

// Login component
const Login = () => {
  const history = useHistory();
  sessionStorage.setItem("loggedIn", false);
  sessionStorage.setItem("token", null);
  sessionStorage.setItem("username", null);
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userName.trim() !== "" && password.trim() !== "") {
      try {
        const resp = await axios.post("/login", {
          userName,
          password,
        });
        if (resp.status == 200) {
          setErrorMessage("");
          sessionStorage.setItem("auth", resp.headers["auth"].toString());
          sessionStorage.setItem("loggedIn", true);
          sessionStorage.setItem("username", resp.data.replace(/\n/g, ""));
          history.push("/chat");
        }
      } catch (e) {
        setErrorMessage("Invalid credentials");
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Header as="h5">Login</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Login
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
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
