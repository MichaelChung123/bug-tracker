import React, { Component } from 'react';
import SideBar from '../sidebar/Sidebar';
import { Row, Col, Container } from 'react-bootstrap';
import '../../styles/style.css';

class Index extends Component {
    render() {
        return (
            <Container fluid='true'>
                <Row>
                    <Col style={{ paddingLeft: '0px' }} lg={3}>
                        <SideBar />
                    </Col>
                    <Col lg={9}>
                        <h1>Admin</h1>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Index;