import React, { Component, useState, useEffect, useRef } from 'react';
import { Row, Col, Container, Accordion, Card, Button, Form, Overlay, Image } from 'react-bootstrap';
import '../styles/AboutStyle.css';
import logo from './de_bug-grey-logo.png';

const About = () => {
    return (
        <Container fluid='true' className='about-container'>
            <Row>
                <Col className='about-logo'>
                    <Image src={logo} />
                </Col>
            </Row>
            <Row>
                <Col className='about-logo'>
                    <h1>By Michael Chung</h1>
                </Col>
            </Row>

            <Row className='about-card-row'>
                <Col lg={6} className='about-card'>
                    <Card>
                        <Row>
                            <Col className='about-tech-title'>
                                <h1>Built With</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} className='tech-entry'>JavaScript</Col>
                            <Col lg={6} className='tech-entry'>React</Col>
                            <Col lg={6} className='tech-entry'>Node</Col>
                            <Col lg={6} className='tech-entry'>Express</Col>
                            <Col lg={6} className='tech-entry'>PostgreSQL</Col>
                            <Col lg={6} className='tech-entry'>HTML/CSS</Col>
                            <Col lg={6} className='tech-entry'>Bootstrap</Col>
                            <Col lg={6} className='tech-entry'>Visual Studios</Col>
                        </Row>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col className='about-logo'>
                    <h1>3 Week Project</h1>
                </Col>
            </Row>
        </Container>
    );
}

export default About;