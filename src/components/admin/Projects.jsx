import React, { Component } from 'react';
import SideBar from '../sidebar/Sidebar';
import { Row, Col, Container } from 'react-bootstrap';
import '../../styles/style.css';

const Projects = () => {
    return (
        <div>
            <Container fluid='true'>
                <Col style={{paddingLeft: '0px'}} lg={3}>
                    <SideBar />
                </Col>
                <Col lg={9}>
                    <h1>Projects</h1>
                </Col>
            </Container>
        </div>
    );
}

export default Projects;