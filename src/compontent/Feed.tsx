import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Form, FormGroup, FormLabel } from 'react-bootstrap';

function _Feed(props: { user: any; }) {
    const [bookTitle, setBookTitle] = useState("");
    const [summaryBody, setSummaryBody] = useState("");

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
                    {/* <h3>Create a new summary:</h3>
                    <Form>
                        <Form.Group>
                            <Form.Label>
                                Book Name
                            </Form.Label>
                            <input
                                className="form form-control"
                                type="text"
                                id="bookTitle"
                                value={bookTitle}
                                // onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Label>
                                Your Summary
                            </Form.Label>
                            <textarea 
                            className="form form-control"
                            id="summary"
                            value={summaryBody}
                            maxLength={2500} />
                            <div className="text-right" style={{ marginTop: 10 }}>
                                <Button type="submit" style={{ backgroundColor: "#6c63ff" }}>Upload Summary</Button>
                            </div>
                            <hr/>
                        </Form.Group>
                    </Form> */}
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
                <h2>1984 - George Orwell</h2>
                <p>
                    Main text, Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non placeat doloremque praesentium fuga voluptatum, porro maiores aliquam dolores, modi ea tempora delectus enim at saepe quasi dicta fugit ipsum illum.
                </p>
                <div className="text-right">
                    <small> PROFILE PIC - Author Name</small>
                </div>
                <div className="text-right">
                    <Button style={{ backgroundColor: "#6c63ff" }} className="mr-sm-1">Like</Button>
                    <Button style={{ backgroundColor: "#6c63ff" }} >Comment</Button>
                </div>
            </Col>
        </Row>
    )
}

export default _Feed;