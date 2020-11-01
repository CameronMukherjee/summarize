import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

function _Home(props: { user: any; }) {
    return (
        <Container className="fluid">
            <Row>
                <Col className="my-auto">
                    <h1 style={{ fontSize: 100 }}>
                        Summarize
                    </h1>
                    <h3 className="text-center">
                        your favourite books in 2500 words
                    </h3>
                </Col>
                <Col className="my-auto">
                <Image src="./book-lover.svg" className="img img-fluid"></Image>
                </Col>
            </Row>
        </Container>  
    );
}

export default _Home;