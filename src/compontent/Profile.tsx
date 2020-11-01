import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';

import firebase from 'firebase/app';
// eslint-disable-next-line import/no-unassigned-import
import 'firebase/auth';

function _Profile(props: { user: any; }) {
    if (!props.user) {
        return ( <Redirect to="/login" /> )
    }

    return (
        <Container>
            <Row>
                <Col className="text-center" style={{ marginBottom: 50}}>
                    <h1>Your Profile</h1>
                    <Button onClick={Logout} style={{ backgroundColor: "#6c63ff" }}>Logout</Button>
                </Col>
            </Row>
            <Row>
                <Col className="my-auto">
                    <Image src={props.user.photoURL} className="img img-thumbnail" style={{ width: '100%', height: 500 }}/>
                </Col>
                <Col className="my-auto">
                    <h1>{props.user.displayName}</h1>
                    <h1>{props.user.email}</h1>
                    {props.user.phoneNumber ? <h1>Phone Number: ✅</h1> : <h1>Phone number: ❌</h1>}
                    {props.user.emailVerified ? <h1>Email Verified: ✅</h1> : <VerifyEmail/> }
                </Col>
            </Row>
            <Row style={{ marginTop: 50}}>
                <Col>
                    <div className="text-center">
                        <h1>Your latest uploads and information here.</h1>
                    </div>
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
            return ( <Redirect to="/" />)
        })
        .catch(e => {
            console.log(e)
        })
}

export default _Profile;