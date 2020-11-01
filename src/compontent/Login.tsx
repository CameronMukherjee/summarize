import React from 'react';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';

function _Login() {
    return (
        <Container className="fluid">
            <Row>
                <Col>
                    <div className="text-center">
                        <h1>Login</h1>
                    </div>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <div className="text-right">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Col>
                <Col>
                    <Image src='./bookshelves.svg' className="img img-fluid"></Image>
                </Col>
            </Row>
        </Container>
    );
}

export default _Login;