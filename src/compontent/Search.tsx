import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Image, Button, Form, FormGroup, FormLabel } from 'react-bootstrap';

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
                    </div>
                </Col>
            </Row>
            <Row>
                {formSent &&
                    <Col className="col col-md-4">
                        {/* Filters */}
                        <div className="text-center">
                            <Button>FILTER LIST</Button>
                        </div>
                    </Col>
                }
                <Col className="col">
                    {formSent ?
                        null
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
                    {result.map(book => (
                        // {console.log(book.volumeInfo.title)}
                        <Row>
                            <Col className="col col-md-3 my-auto" style={{ paddingRight: 10}}>
                                <Image src={book.volumeInfo.imageLinks.thumbnail}></Image>
                            </Col>
                            <Col className="my-auto">
                                <h4>{book.volumeInfo.title}</h4>
                                <p>{book.volumeInfo.description}</p>
                            </Col>
                        </Row>
                    ))}
                </Col>
            </Row>
        </Container>
    );
}

export default _Search;