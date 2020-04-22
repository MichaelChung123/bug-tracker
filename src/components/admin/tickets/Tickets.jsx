import React, { Component } from 'react';
import { Row, Col, Container, Table, Form, FormControl, Button, Pagination } from 'react-bootstrap';
import '../../../styles/TicketStyle.css';
import Page from '../../Page';
import moment from 'moment';

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

    // Handles the redirect onClick for tickets
    handleRedirect = (path) => {
        this.props.history.push(path);
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_BASEURL + '/admin/tickets/all')
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
        return (
            <Container className='all-tickets-container'>
                <Row className='tickets-title'>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <h1>Your Tickets</h1>
                    </Col>
                </Row>
                <Row className='ticket-list'>
                    {/* <Row className='full-row'>
                        <Form inline className='ticket-search'>
                            <Col sm={7} md={7} lg={7}>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            </Col>
                            <Col sm={2} md={2} lg={2}>
                                <Button variant="outline-success">Search</Button>
                            </Col>
                        </Form>
                    </Row> */}
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
                                            updatedTime={ticket.lastupdatedtime}
                                            createdDate={ticket.createddate}
                                            createdTime={ticket.createdtime}
                                            ticket_id={ticket.ticket_id}
                                            handleRedirect={this.handleRedirect}
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
                                        active={this.state.activePage}
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
    filterDate = (date, time) => {
        let dbDate = date.slice(0, 10) + ' ' + time;
        let swappedDate = moment(dbDate).format('LLL').replace('AM', 'PM');
        return swappedDate;
    }

    render() {
        return (
            <tr onClick={() => this.props.handleRedirect(`/admin/tickets/details/${this.props.ticket_id}`)} className='cursor-pointer'>
                <td>{this.props.title}</td>
                <td>{this.props.creator}</td>
                <td>{this.props.priority}</td>
                <td>{this.props.type}</td>
                <td>{this.props.status}</td>
                <td>{this.filterDate(this.props.updatedDate, this.props.updatedTime)}</td>
                <td>{this.filterDate(this.props.createdDate, this.props.createdTime)}</td>
            </tr>
        );
    }
}

export default Tickets;