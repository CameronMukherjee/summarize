import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

function _Feed(props: { user: any; }) {
    if (!props.user) {
        return (<Redirect to="/login" />)
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <div className="text-center">
                                <Image src={props.user.photoURL} className="img img-thumbnail" style={{ height: "100%", width: "100%" }} />
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }}>
                        <Col>
                            <h4>{props.user.displayName}</h4>
                            <h6>{props.user.email}</h6>
                        </Col>
                    </Row>
                </Col>
                <Col className="col col-md-8">
                    <Summary />
                </Col>
            </Row>
        </Container>
    );
}

function Summary() {
    return (
        <Row>
            <Col>
                <div className="text-center">
                    <h2>Title</h2>
                </div>
                <p>
                    Main text, Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non placeat doloremque praesentium fuga voluptatum, porro maiores aliquam dolores, modi ea tempora delectus enim at saepe quasi dicta fugit ipsum illum.
                </p>
                <div className="text-center">
                    <Button>Like</Button>
                    <Button>Comment</Button>
                </div>
            </Col>
        </Row>
    )
}

export default _Feed;