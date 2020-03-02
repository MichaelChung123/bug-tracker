import React, { Component } from 'react';
import SideBar from '../sidebar/Sidebar';
import { Row, Col, Container } from 'react-bootstrap';

class Index extends Component {
    render() {
        return (
            <div>
                <Container fluid='true'>
                    <Col style={{paddingLeft: '0px'}} lg={3}>
                        <SideBar />
                    </Col>
                    <Col lg={9}>
                        <h1>Admin</h1>
                    </Col>
                </Container>
            </div>
        );
    }
}

export default Index;