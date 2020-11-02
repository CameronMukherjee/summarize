import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col, Image, Form, Button, Alert } from 'react-bootstrap';

import firebase from 'firebase/app';
// eslint-disable-next-line import/no-unassigned-import
import 'firebase/auth';

function _Profile(props: { user: any; }) {
    const [displayName, setDisplayName] = useState("");
    const [success, setSuccess] = useState(false);
    const [notificationSend, setNotificationSent] = useState(false);
    if (!props.user) {
        return (<Redirect to="/login" />)
    }

    const handleUpdateProfile = (e: React.FormEvent) => {
        e.preventDefault()
        firebase.auth().currentUser?.updateProfile({
            displayName: displayName
        })
        .then(r => {
            console.log(r)
            setSuccess(true);
        })
        .catch(err => {
            console.log(err)
        })
    }

    const SendEmailVerification = () => {
    const auth = firebase.auth();
        if (auth.currentUser) {
            auth.currentUser.sendEmailVerification()
                .then(r => {
                    console.log(r)
                    setNotificationSent(true);
                })
                .catch(e => {
                    console.log(e)
                })
        } else {
            return (
                <Redirect to="/login" />
            )
        }
    }

    return (
        <Container>
            <Row>
                <Col className="text-center">
                    <h1>Your Profile</h1>
                    { notificationSend &&
                    <Alert variant="success">
                        <h2>Email verification sent! 🎉</h2>
                    </Alert>
                    }
                    { success && 
                    <Alert variant="success">
                        <h2>Profile Updated! 🎉</h2>
                    </Alert>
                    }
                    <Row style={{ marginTop: 40 }}>
                        <Col>
                            <div style={{ marginBottom: 20 }}>
                                <Image src={props.user.photoURL} roundedCircle />
                            </div>
                            <Form onSubmit={handleUpdateProfile}>
                                <Form.Group>
                                    <Form.Label>
                                        Display Name
                                    </Form.Label>
                                    <div style={{ marginLeft: 250, marginRight: 250}} className="text-center">
                                        <input
                                        className="form form-control text-center"
                                        type="text"
                                        id="displayName"
                                        name="displayName"
                                        placeholder={props.user.displayName}
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Email
                                    </Form.Label>
                                    <div style={{ marginLeft: 250, marginRight: 250}} className="text-center">
                                        <input
                                        className="form form-control text-center"
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={props.user.email}
                                        disabled/>
                                    </div>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Email Verified
                                    </Form.Label>
                                    <br/>
                                    {props.user.emailVerified ? <h4>Email Verified: ✅</h4> : <Button onClick={SendEmailVerification} style={{ backgroundColor: "#6c63ff", marginLeft: 250, marginRight: 250 }}>Send verification email</Button>}
                                </Form.Group>
                                <hr/>
                            {/* <h4>{props.user.displayName}</h4> */}
                            {/* <h4>{props.user.email}</h4> */}
                            <Button onClick={Logout} className="mr-sm-1" style={{ backgroundColor: "#6c63ff" }}>Logout</Button>
                            <Button type="submit" style={{ backgroundColor: "#6c63ff" }}>Update Profile</Button>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

function VerifyEmail() {
    const auth = firebase.auth();
    const sendEmail = () => {
        if (auth.currentUser) {
            auth.currentUser.sendEmailVerification()
                .then(r => {
                    console.log(r)
                })
                .catch(e => {
                    console.log(e)
                })
        } else {
            return (
                <Redirect to="/login" />
            )
        }
    }
    return (
        <Button onClick={sendEmail} className="mr-sm-3" style={{ backgroundColor: "#6c63ff" }}>Send verification email</Button>
    )
}

function Logout() {
    const auth = firebase.auth();
    auth.signOut()
        .then(r => {
            console.log(r)
            return (<Redirect to="/" />)
        })
        .catch(e => {
            console.log(e)
        })
}

export default _Profile;