import React, { Component } from 'react';
import { Row, Col, Container, Table, Form, FormControl, Button, Pagination } from 'react-bootstrap';
import '../../../styles/TicketStyle.css';

class Tickets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [
                {
                    title:'Demo Ticket 1',
                    creator: 'Michael Chung',
                    priority: 'High',
                    type: 'Feature Request',
                    status: 'Open',
                    updatedDate: '03/09/2020',
                    createdDate: '03/08/2020'
                },
                {
                    title:'Demo Ticket 2',
                    creator: 'Michael Chung',
                    priority: 'Med',
                    type: 'Frontend',
                    status: 'Assigned',
                    updatedDate: '03/09/2020',
                    createdDate: '03/08/2020'
                },
                {
                    title:'Demo Ticket 3',
                    creator: 'Michael Chung',
                    priority: 'Low',
                    type: 'Backend',
                    status: 'Resolved',
                    updatedDate: '03/09/2020',
                    createdDate: '03/08/2020'
                },
                {
                    title:'Demo Ticket 4',
                    creator: 'Michael Chung',
                    priority: 'Med',
                    type: 'Feature Request',
                    status: 'Open',
                    updatedDate: '03/09/2020',
                    createdDate: '03/08/2020'
                },
                {
                    title:'Demo Ticket 5',
                    creator: 'Michael Chung',
                    priority: 'Med',
                    type: 'Backend',
                    status: 'Open',
                    updatedDate: '03/09/2020',
                    createdDate: '03/08/2020'
                }
            ]
        }
    }

    render() {
        return (
            <Container className='all-tickets-container'>
                <Row className='tickets-title'>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <h1>Your Tickets</h1>
                    </Col>
                </Row>
                <Row className='ticket-list'>
                    <Row>
                        <Form inline className='ticket-search'>
                            <Col sm={7} md={7} lg={7}>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            </Col>
                            <Col sm={2} md={2} lg={2}>
                                <Button variant="outline-success">Search</Button>
                            </Col>
                        </Form>
                    </Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Created By</th>
                                <th>Priority</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Last Updated</th>
                                <th>Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Demo Ticket 1</td>
                                <td>Michael Chung</td>
                                <td>High</td>
                                <td>Feature Request</td>
                                <td>Open</td>
                                <td>03/09/2020</td>
                                <td>03/08/2020</td>
                            </tr>
                            <tr>
                                <td>Demo Ticket 2</td>
                                <td>Michael Chung</td>
                                <td>Med</td>
                                <td>Frontend</td>
                                <td>Resolved</td>
                                <td>03/09/2020</td>
                                <td>03/08/2020</td>
                            </tr>
                            <tr>
                                <td>Demo Ticket 3</td>
                                <td>Michael Chung</td>
                                <td>Low</td>
                                <td>Backend</td>
                                <td>Assigned</td>
                                <td>03/09/2020</td>
                                <td>03/08/2020</td>
                            </tr>
                        </tbody>
                    </Table>

                    <Pagination>
                        {items}
                    </Pagination>
                </Row>
            </Container>
        );
    }
}

let active = 1;
let items = [];

const pageClick = () => {
    console.log('page click');
}

for (let number = 1; number <= 5; number++) {
    items.push(
        <Pagination.Item key={number} onClick={pageClick} active={number === active}>
            {number}
        </Pagination.Item>,
    );
}

// class TicketPages extends React.Component {
//     pageClick = () => {

//     }

//     render() {
//         return (

//         );
//     }
// }

export default Tickets;