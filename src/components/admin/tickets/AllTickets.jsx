import React, { Component } from 'react';
import SideBar from '../../sidebar/Sidebar';
import TopNav from '../../navbar/TopNav.jsx';
import { Row, Col, Container } from 'react-bootstrap';
import MainContent from '../MainContent';

class AllTickets extends Component {
    render() {
        return (
            <Container fluid='true'>
                <Row>
                    <Col style={{ paddingLeft: '0px', paddingRight: '0px' }} xs={3} sm={3} md={3} lg={3}>
                        <SideBar />
                    </Col>
                    <Col style={{ paddingLeft: '0px' }} xs={9} sm={9} md={9} lg={9}>
                        <Container className='main-content' fluid='true'>
                            <TopNav />
                            <MainContent />
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default AllTickets;