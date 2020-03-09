import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import '../../../styles/TicketStyle.css';

class Tickets extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        // const { infoItems } = this.state;
        return (
            <Container className='all-tickets-container'>
                <Row className='tickets-title'>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <h1>Your Tickets</h1>
                    </Col>
                </Row>
                <Row className='ticket-list'>

                </Row>
            </Container>
        );
    }
}

export default Tickets;