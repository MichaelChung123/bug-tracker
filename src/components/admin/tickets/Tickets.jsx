import React, { Component } from 'react';
import { Row, Col, Container, Table, Form, FormControl, Button, Pagination } from 'react-bootstrap';
import '../../../styles/TicketStyle.css';

class Tickets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            pageCount: 0,
            items: [],
            titles: [
                'Title',
                'Created By',
                'Priority',
                'Type',
                'Status',
                'Last Updated',
                'Created'
            ],
            tickets: [
                {
                    title: 'Demo Ticket 1',
                    creator: 'Michael Chung',
                    priority: 'High',
                    type: 'Feature Request',
                    status: 'Open',
                    updatedDate: '03/09/2020',
                    createdDate: '03/08/2020'
                },
                {
                    title: 'Demo Ticket 2',
                    creator: 'Michael Chung',
                    priority: 'Med',
                    type: 'Frontend',
                    status: 'Assigned',
                    updatedDate: '03/09/2020',
                    createdDate: '03/08/2020'
                },
                {
                    title: 'Demo Ticket 3',
                    creator: 'Michael Chung',
                    priority: 'Low',
                    type: 'Backend',
                    status: 'Resolved',
                    updatedDate: '03/09/2020',
                    createdDate: '03/08/2020'
                },
                {
                    title: 'Demo Ticket 4',
                    creator: 'Michael Chung',
                    priority: 'Med',
                    type: 'Feature Request',
                    status: 'Open',
                    updatedDate: '03/09/2020',
                    createdDate: '03/08/2020'
                },
                {
                    title: 'Demo Ticket 5',
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

    pageClick = (number) => {
        this.setState({
            activePage: number
        })
    }

    createPagination = () => {
        let pageCount = Math.ceil(this.state.tickets.length / 2);

        for (let number = 1; number <= pageCount; number++) {
            this.setState(prevState => ({
                items: [...prevState.items, number]
            }))
        }

        this.setState({
            pageCount: pageCount
        })
    }

    componentDidMount() {
        this.createPagination();
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
                                {
                                    this.state.titles.map((title) => {
                                        return (
                                            <th>{title}</th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.tickets.map((ticket, key) => {
                                    return (
                                        <TicketListRow
                                            title={ticket.title}
                                            creator={ticket.creator}
                                            priority={ticket.priority}
                                            type={ticket.type}
                                            status={ticket.status}
                                            updatedDate={ticket.updatedDate}
                                            createdDate={ticket.createdDate}
                                        />
                                    );
                                })
                            }
                        </tbody>
                    </Table>

                    <Pagination>
                        {
                            this.state.items.map((number) => {
                                return (
                                    <Page
                                        pageCount={this.state.pageCount}
                                        number={number}
                                        activePage={this.state.activePage}
                                        pageClick={this.pageClick}
                                    />
                                );
                            })
                        }
                    </Pagination>
                </Row>
            </Container>
        );
    }
}

class TicketListRow extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.title}</td>
                <td>{this.props.creator}</td>
                <td>{this.props.priority}</td>
                <td>{this.props.type}</td>
                <td>{this.props.status}</td>
                <td>{this.props.updatedDate}</td>
                <td>{this.props.createdDate}</td>
            </tr>
        );
    }
}

class Page extends React.Component {
    handleClick = () => {
        const { number, pageClick } = this.props;
        pageClick(number);
    }

    render() {
        return (
            <Pagination.Item key={this.props.number} onClick={this.handleClick} active={this.props.number === this.props.activePage}>
                {this.props.number}
            </Pagination.Item>
        );
    }
}

export default Tickets;