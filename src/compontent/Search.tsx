import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Image, Button, Form, FormGroup, FormLabel, Modal, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import firebase from 'firebase/app';
import { ScriptSnapshot } from 'typescript';

const apiKey = "AIzaSyAXOm3FiT8ogS_9ybmX-GipTb8ODE0_LcU";

function _Search(props: { user: any; }) {
    const [formSent, setFormSent] = useState(false);
    const [title, setTitle] = useState("");
    const [result, setResult] = useState<any[]>([]);

    const [show, setShow] = useState(false);
    const [bookId, setBookId] = useState("");
    const [bookTitle, setBookTitle] = useState("");
    const [content, setContent] = useState("");
    const handleClose = () => setShow(false);

    const [viewSummaryModal, setViewSummaryModal] = useState(false);
    const [success, setSuccess] = useState(false);

    const [summaries]: any[] = useCollectionData(firebase.firestore().collection('summary').where('bookID', '==', bookId).orderBy('createdAt').limit(25), { idField: 'id' });

    // const getSummaries = () => {
    //     const [summaries]: any[] = useCollectionData(firebase.firestore().collection('summary').where('bookID', '==', bookId).orderBy('createdAt').limit(25), { idField: 'id' });   
    //     return summaries;
    // }

    const handleSearch = (e: React.FormEvent) => {
        // const url = `https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}+inpublisher:${publisher}+isbn:${isbn}&key=${apiKey}`
        const url = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${apiKey}&naxResults=20`
        e.preventDefault()
        axios.get(url)
            .then(data => {
                console.log(data.data.items)
                setTitle("")
                setResult(data.data.items)
                setFormSent(true);
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault()
        const firestore = firebase.firestore()
        firestore
            .collection('summary')
            .add({
                uid: props.user.uid,
                displayName: props.user.displayName,
                photoURL: props.user.photoURL,
                bookID: bookId,
                bookTitle: bookTitle,
                content: content,
                createdAt: new Date()
            })
            .then(() => {
                console.log('Uploaded')
                setContent('');
                handleClose()
                setSuccess(true);
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <Container>
            <Row>
                <Col style={{ marginBottom: 30 }}>
                    <div className="text-center">
                        <h1>Search for a Book</h1>
                        {formSent && <Button style={{ backgroundColor: "#6c63ff" }} className="mr-sm-2" onClick={() => setFormSent(false)}>Search again?</Button>}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="col">
                    {formSent ?
                        result.map(book => (
                            <Row style={{ marginBottom: 20 }}>
                                <Col className="my-auto">
                                    <h4>{book.volumeInfo.title}</h4>
                                    <p>{book.volumeInfo.description}</p>
                                    <div className="text-right">
                                        <a href={book.volumeInfo.previewLink} target="_blank">
                                            <Button style={{ backgroundColor: "#6c63ff" }} className="mr-sm-2">Preview</Button>
                                        </a>
                                        <Button style={{ backgroundColor: "#6c63ff" }} className="mr-sm-2" onClick={() => { setBookId(book.id); setViewSummaryModal(true); setBookTitle(book.volumeInfo.title); }}>View Summaries</Button>
                                        {props.user ?
                                            <Button style={{ backgroundColor: "#6c63ff" }} onClick={() => { setBookId(book.id); setShow(true); setBookTitle(book.volumeInfo.title) }}>Write Summary</Button>
                                            :
                                            <Link to="/login"><Button style={{ backgroundColor: "#6c63ff" }}>Login to write summary</Button></Link>
                                        }
                                    </div>
                                    <hr />
                                </Col>
                            </Row>
                        ))
                        :
                        <Form onSubmit={handleSearch} className="text-center">
                            <Form.Group>
                                <Form.Label>
                                    Title
                            </Form.Label>
                                <div>
                                    <input
                                        className="form form-control text-center"
                                        type="text"
                                        id="title"
                                        value={title}
                                        placeholder="To Kill a Mockingbird"
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div style={{ marginTop: 10 }}>
                                    <Button type="submit" style={{ backgroundColor: "#6c63ff" }}>Search</Button>
                                </div>
                            </Form.Group>
                        </Form>
                    }
                </Col>
            </Row>

            {/* View summaries modal */}
            <Modal show={viewSummaryModal} onHide={() => setViewSummaryModal(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-center"><h4>{bookTitle} Summaries:</h4></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* {summaries && summaries.map((summary: { id: string }) => <Summary key={summary.id} summary={summary}></Summary>)} */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setViewSummaryModal(false)}>Close</Button>
                    <Button style={{ backgroundColor: "#6c63ff" }} type="submit">Post Summary</Button>
                </Modal.Footer>
            </Modal>

            {/* Upload new book summary modal */}
            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-center"><h4>Your {bookTitle} Summary:</h4></Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleUpload}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>
                                Your summary:
                            </Form.Label>
                            <textarea
                                className="form form-control"
                                value={content}
                                maxLength={2500}
                                rows={20}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button style={{ backgroundColor: "#6c63ff" }} type="submit">Post Summary</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Successfully uploaded summary modal */}
            <Modal show={success} onHide={() => setSuccess(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-center"><h2>Success 💯</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert variant="success" className="text-center">
                        <h4>Successfully uploaded summary.</h4>
                    </Alert>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ backgroundColor: "#6c63ff" }} onClick={() => setSuccess(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default _Search;