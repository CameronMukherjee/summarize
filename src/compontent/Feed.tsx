import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Image, Button, Form, FormGroup, FormLabel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

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

    const [summaries]: any[] = useCollectionData(firebase.firestore().collection('summary').orderBy('createdAt').limit(25), { idField: 'id' });


    return (
        <Container>
            <Row>
                <Col className="col-md-4 text-center d-none d-md-block d-lg-block">
                    <Image src={props.user.photoURL} roundedCircle />
                    <h4>{props.user.displayName}</h4>
                    <h6>{props.user.email}</h6>
                    <Link to="/search"><Button style={{ width: "100%", marginBottom: 10, backgroundColor: "#6c63ff" }}>Write Summary Now ✍️</Button></Link>
                    <small>(Pskk, you can scroll on the text) ➡️</small>
                </Col>
                <Col className="scroll-col col-md-8" style={{ maxHeight: "85vh", msOverflowStyle: "none", scrollbarWidth: "none" }}>
                    <div className="d-xs-block d-sm-block d-md-none ">
                        <Link to="/search"><Button style={{ width: "100%", marginBottom: 10, backgroundColor: "#6c63ff" }}>Write Summary Now ✍️</Button></Link>
                    </div>
                    {summaries && summaries.map((summary: { id: string }) => <Summary key={summary.id} message={summary} user={props.user}></Summary>)}
                </Col>
            </Row>
        </Container>
    );
}

function Summary(props: { key: any, message: any, user: any }) {
    const { content, uid, bookID, bookTitle, displayName, photoURL, createdAt, id } = props.message;
    // FIXME: Created at crashing application.

    const likeSummary = () => {
        const url = "https://us-central1-summarize-1325c.cloudfunctions.net/summary/likes";
        axios.post(url, {
                id: id,
                uid: props.user.uid
            })
            .then(r => {
                console.log(r)
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <Row>
            <Col>
                <h2>{bookTitle}</h2>
                <h6>By: {displayName}</h6>
                <p>
                    {content}
                </p>
                <Row>
                    <Col className="col my-auto">
                        <a href={uid}><Image src={photoURL} style={{ height: 60 }} className="mr-sm-5" roundedCircle /></a>
                    </Col>
                    <Col className="col my-auto">
                        <div className="text-right">
                            <a onClick={likeSummary}><FontAwesomeIcon icon={faHeart} size="2x" style={{ color: "#6c63ff" }} className="mr-sm-1"></FontAwesomeIcon></a>
                            <FontAwesomeIcon icon={faComment} size="2x" style={{ color: "#6c63ff" }} className="mr-sm-1"></FontAwesomeIcon>
                            {/* <Button style={{ backgroundColor: "#6c63ff" }} >Comment</Button> */}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="text-right">
                            <small>13 likes - 4 comments</small>
                        </div>
                    </Col>
                </Row>
                <hr />
            </Col>
        </Row>
    )
}

export default _Feed;