import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Image, Button, Form, FormGroup, FormLabel } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

const apiKey = "AIzaSyAXOm3FiT8ogS_9ybmX-GipTb8ODE0_LcU";

function _Search(props: { user: any; }) {
    const [formSent, setFormSent] = useState(false);
    const [title, setTitle] = useState("");
    const [result, setResult] = useState<any[]>([]);

    const handleForm = (e: React.FormEvent) => {
        // const url = `https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}+inpublisher:${publisher}+isbn:${isbn}&key=${apiKey}`
        const url = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${apiKey}&naxResults=20`
        e.preventDefault()
        axios.get(url)
            .then(data => {
                console.log(data.data.items)
                setResult(data.data.items)
                setFormSent(true);
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
                        <h1>Search for a book</h1>
                        { formSent &&  <Button style={{ backgroundColor: "#6c63ff" }} className="mr-sm-2" onClick={() => setFormSent(false)}>Search again?</Button> }
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
                                    {/* <h4>Publisher: {book.volumeInfo.publisher} - ({book.volumeInfo.publishedDate})</h4>
                                    <h5>Average Rating: {book.volumeInfo.averageRating}</h5> */}
                                    <p>{book.volumeInfo.description}</p>
                                    <div className="text-right">
                                        <a href={book.volumeInfo.previewLink} target="_blank">
                                            <Button style={{ backgroundColor: "#6c63ff" }} className="mr-sm-2">Preview</Button>
                                        </a>
                                        <Button style={{ backgroundColor: "#6c63ff" }} className="mr-sm-2">View Summaries</Button>
                                        <Button style={{ backgroundColor: "#6c63ff" }}>Write Summary</Button>
                                    </div>
                                </Col>
                            </Row>
                        ))
                        :
                        <Form onSubmit={handleForm}>
                            <Form.Group>
                                <Form.Label>
                                    Title
                            </Form.Label>
                                <input
                                    className="form form-control"
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <div className="text-right" style={{ marginTop: 10 }}>
                                    <Button type="submit" style={{ backgroundColor: "#6c63ff" }}>Search</Button>
                                </div>
                            </Form.Group>
                        </Form>
                    }
                </Col>
            </Row>
        </Container>
    );
}

export default _Search;