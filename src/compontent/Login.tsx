import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col, Image, Form, Button, Alert } from 'react-bootstrap';

import firebase from 'firebase/app';
// eslint-disable-next-line import/no-unassigned-import
import 'firebase/auth';

function _Login(props: { user: any; }) {
    if (props.user) {
        return (
            <Redirect to="/profile" />
        )
    } else {
        return (
            <LoginView />
        )
    }
}

function LoginView() {
    const [formType, setForm] = useState("Login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    let printError = false;

    const handleForm = (e: React.FormEvent) => {
        if (formType === "Login") {
            e.preventDefault();

            const auth = firebase.auth();
            auth.signInWithEmailAndPassword(email, password)
                .then(r => {
                    console.log(r)
                    return (<Redirect to="./feed" />)
                })
                .catch(err => {
                    setError(err.message);
                    console.log(err)
                })
        } else if (formType === "Register") {
            e.preventDefault();

            const auth = firebase.auth();
            auth.createUserWithEmailAndPassword(email, password)
                .then(r => {
                    console.log(r)
                    return (<Redirect to="./login" />)
                })
                .catch(err => {
                    setError(err.message);
                    console.log(err);
                })
        } else {
            setError("An unknown error has occured.")
        }
    }

    if (error !== "") {
        printError = true;
    }

    return (
        <Container className="fluid">
            <Row>
                <Col className="my-auto">
                    <div className="text-center">
                        <h1>{formType}</h1>
                        {
                            printError &&
                                <Alert variant="danger">
                                    {error}
                                </Alert>
                        }
                        <div className="text-center">
                            {formType === "Login" &&
                                <Button style={{ backgroundColor: "#6c63ff" }} onClick={() => setForm("Register")}>Dont have an account? Register Now</Button>
                            }
                            {formType === "Register" &&
                                <Button style={{ backgroundColor: "#6c63ff" }} onClick={() => setForm("Login")}>Already have an account? Login Instead</Button>
                            }
                        </div>
                    </div>
                    <Form onSubmit={handleForm}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            {/* <Form.Control type="email" placeholder="Enter email" name="email" /> */}
                            <input
                                className="form form-control"
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            {/* <Form.Control type="password" placeholder="Password" name="password" /> */}
                            <input
                                className="form form-control"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <div className="text-right">
                            <SignInWithGoogle />
                            <SignInWithTwitter />
                            <Button variant="primary" type="submit" style={{ backgroundColor: "#6c63ff" }}>
                                {formType}
                            </Button>
                        </div>
                    </Form>
                    {/* <div className="text-center">
                        <h4>or</h4>
                    </div> */}
                    <div className="text-center" style={{ marginTop: 50 }}>
                        {/* <SignInWithGoogle /> */}
                        {/* <Button className="mr-sm-2" style={{ backgroundColor: "#6c63ff" }}>Login with Twitter</Button> */}
                        {/* <br /><br /> */}
                        {/* <Button className="mr-sm-2" style={{ backgroundColor: "#6c63ff" }}>Login with Facebook</Button> */}
                    </div>
                </Col>
                <Col className="my-auto d-none d-lg-block">
                    <Image src='./bookshelves.svg' className="img img-fluid"></Image>
                </Col>
            </Row>
        </Container>
    )
}

function SignInWithTwitter() {
    const auth = firebase.auth()
    const signInWithTwitter = () => {
        const provider = new firebase.auth.TwitterAuthProvider();
        auth.signInWithPopup(provider)
        .then(r => {
            console.log(r)
            return (<Redirect to="./feed" />)
        })
        .catch(e => console.log(e))
    }

    return (
        <Button onClick={signInWithTwitter} className="mr-sm-2" style={{ backgroundColor: "#6c63ff" }}>Login with Twitter</Button>
    )
}

function SignInWithGoogle() {
    const auth = firebase.auth();
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then(r => {
                console.log(r)
                return (<Redirect to="./feed" />)
            })
            .catch(e => console.log(e))
    }

    return (
        <Button onClick={signInWithGoogle} className="mr-sm-2" style={{ backgroundColor: "#6c63ff" }}>Login with Google</Button>
    )
}

export default _Login;