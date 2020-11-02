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
        // <Container>
        //     <Row>
        //         <Col className="text-center">
        //             <div className="d-none d-lg-block">
        //                 <Image src={props.user.photoURL} roundedCircle />
        //                 <h4>{props.user.displayName}</h4>
        //             </div>
        //                 {/* <h6>{props.user.email}</h6>  */}
        //                 <Link to="/search"><Button style={{width: "100%", marginBottom: 10, backgroundColor: "#6c63ff"}}>Write Summary Now ✍️</Button></Link>
        //         </Col>
        //     </Row>
        //     <Row className="scroll-col text-center" style={{ maxHeight: "60vh", maxWidth: "60vw"}}>
        //         <Col>
        //             { summaries && summaries.map((summary: {id: string}) => <Summary key={summary.id} message={summary}></Summary>) }
        //         </Col>
        //     </Row>
        // </Container> 
        <Container>
            <Row>
                <Col className="col-md-4 text-center d-none d-md-block d-lg-block">
                    <Image src={props.user.photoURL} roundedCircle />
                    <h4>{props.user.displayName}</h4>
                    <h6>{props.user.email}</h6> 
                    <Link to="/search"><Button style={{width: "100%", marginBottom: 10, backgroundColor: "#6c63ff"}}>Write Summary Now ✍️</Button></Link>
                </Col>
                <Col className="scroll-col col-md-8" style={{ maxHeight: "85vh"}}>
                    <div className="d-xs-block d-sm-block d-md-none ">
                        <Link to="/search"><Button style={{width: "100%", marginBottom: 10, backgroundColor: "#6c63ff"}}>Write Summary Now ✍️</Button></Link>
                    </div>
                    { summaries && summaries.map((summary: {id: string}) => <Summary key={summary.id} message={summary}></Summary>) }
                </Col>
            </Row>
        </Container>
    );
}

function Summary(props: { key: any, message: any}) {
    const { content, uid, bookID, bookTitle, displayName, photoURL, createdAt } = props.message;
    // FIXME: Created at crashing application.

    return (
        // <h1>{content}</h1>
        <Row>
            <Col>
                <h2>{bookTitle}</h2>
                <h6>By: {displayName}</h6>
                <p>
                    {content}
                </p>
                <Row>
                    <Col className="col col-sm-1 my-auto">
                        <a href={uid}><Image src={photoURL} style={{ height: 60 }} className="mr-sm-5" roundedCircle/></a>
                    </Col>
                    <Col className="col col-sm-11 my-auto">
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