import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons';

function _Home(props: { user: any; }) {
    return (
        <Container className="fluid">
            <Row>
                <Col className="my-auto text-center">
                    <FontAwesomeIcon className="theme1" icon={ faQuoteRight } size={"3x"}></FontAwesomeIcon>
                    <h1 style={{ fontSize: 60 }}>
                        Summarize
                    </h1>
                    <h3 className="text-center">
                        your reading list in 2500 words
                    </h3>
                    <small>
                        Cameron Mukherjee
                    </small>
                </Col>
                <Col className="my-auto">
                    <Image src="./book-lover.svg" className="img img-fluid"></Image>
                </Col>
            </Row>
        </Container>
    );
}

export default _Home;