import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Form, FormGroup, FormLabel } from 'react-bootstrap';

import firebase from 'firebase/app';
// eslint-disable-next-line import/no-unassigned-import
import 'firebase/firestore';
// eslint-disable-next-line import/no-unassigned-import
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function _Feed(props: { user: any; }) {
    if (!props.user) {
        return (<Redirect to="/login" />)
    }
    const [bookTitle, setBookTitle] = useState("");
    const [summaryBody, setSummaryBody] = useState("");

    const [ summaries ]: any[] = useCollectionData(firebase.firestore().collection('summary').orderBy('createdAt').limit(25), { idField: 'id' });

    return (
        <Container>
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <div className="text-center">
                                <Link to="/search"><Button style={{width: "100%", marginBottom: 10, backgroundColor: "#6c63ff"}}>Write Summary Now ✍️</Button></Link>
                                <Image src={props.user.photoURL} className="img img-fluid" style={{ height: "100%", width: "100%" }} />
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
                <Col className="col col-md-8 scroll-col" style={{ maxHeight: "80vh", width:"100%"}}>
                    { summaries && summaries.map((summary: {id: string}) => <Summary key={summary.id} message={summary}></Summary>) }
                </Col>
            </Row>
        </Container>
    );
}

function Summary(props: { key: any, message: any}) {
    const { content, uid, bookID, bookTitle, displayName, photoURL } = props.message;
    // FIXME: Created at crashing application.

    return (
        // <h1>{content}</h1>
        <Row>
            <Col>
                <h2>{bookTitle}</h2>
                <p>
                    {content}
                </p>
                <Row>
                    <Col className="col col-sm-1 my-auto">
                        <a href={uid}><Image src={photoURL} style={{ height: 60 }} className="mr-sm-5" roundedCircle/></a>
                    </Col>
                    <Col className="col col-sm-5 my-auto">
                        <div>
                            <h6>{displayName}</h6>
                        </div>
                    </Col>
                    <Col className="col col-sm-6">
                        <div className="text-right">
                            <Button style={{ backgroundColor: "#6c63ff" }} className="mr-sm-1">Like</Button>
                            <Button style={{ backgroundColor: "#6c63ff" }} >Comment</Button>
                        </div>
                    </Col>
                </Row>
                <hr/>
            </Col>
        </Row>
    )
}

export default _Feed;