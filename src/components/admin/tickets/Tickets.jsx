import React, { Component } from 'react';
import { Row, Col, Container, Table, Form, FormControl, Button, Pagination } from 'react-bootstrap';
import '../../../styles/TicketStyle.css';
import Page from '../../Page';
/* 
    how to connect to database:
    1. psql -d bugtrackerdb -U me
*/

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
            tickets: [],
            currentTickets: []
        }
    }

    pageClick = (number) => {
        let selectedTickets = this.state.tickets[number - 1];

        this.setState({
            activePage: number,
            currentTickets: selectedTickets
        })
    }

    createPagination = () => {
        let pageCount = Math.ceil(this.state.tickets.length / 2);

        for (let number = 1; number <= pageCount + 1; number++) {
            this.setState(prevState => ({
                items: [...prevState.items, number]
            }))
        }

        this.setState({
            pageCount: pageCount
        })
    }

    componentDidMount() {
        fetch('/admin/tickets/all')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let count = 0;
                let ticketsPerPage = 7;
                let group = [];


                if (data.length < ticketsPerPage) {
                    this.setState({
                        currentTickets: data
                    })
                } else {
                    for (let i = 0; i <= data.length - 1; i++) {
                        // Formatting the date values to be more readable
                        data[i].lastupdated = data[i].lastupdated.slice(0, 10);
                        data[i].createddate = data[i].createddate.slice(0, 10);

                        group.push(data[i]);
                        count++;

                        if (count >= ticketsPerPage) {
                            count = 0;
                            // loading first page's tickets
                            if (this.state.tickets.length < 1) {
                                this.setState({
                                    currentTickets: [...group]
                                });
                            }
                            this.setState({
                                tickets: [...this.state.tickets, group]
                            });
                            group = [];
                        } else if (i === data.length - 1) {
                            this.setState({
                                tickets: [...this.state.tickets, group]
                            });
                        }

                    }
                }

                this.createPagination();
            });
    }

    render() {
        console.log('items: ', this.state.items);
        return (
            <Container className='all-tickets-container'>
                <Row className='tickets-title'>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <h1>Your Tickets</h1>
                    </Col>
                </Row>
                <Row className='ticket-list'>
                    <Row className='full-row'>
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
                                    this.state.titles.map((title, key) => {
                                        return (
                                            <th>{title}</th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.currentTickets.map((ticket, key) => {
                                    return (
                                        <TicketListRow
                                            title={ticket.title}
                                            creator={ticket.creator}
                                            priority={ticket.priority}
                                            type={ticket.type}
                                            status={ticket.status}
                                            updatedDate={ticket.lastupdated}
                                            createdDate={ticket.createddate}
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

export default Tickets;