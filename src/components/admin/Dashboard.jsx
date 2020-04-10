import React, { Component, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Row, Col, Pagination, Container, Accordion, Card, Button, Table, Form, FormControl } from 'react-bootstrap';
import Page from '../Page';

import '../../styles/DashboardStyle.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeUserPage: 1,
            userItems: [],
            users: [],
            currentUsers: [],

            activeTicketPage: 1,
            tickets: [],
            currentTickets: [],
            ticketItems: [],
            infoItems: [
                {
                    path: '/admin/projects/all',
                    color: '#007bff',
                    name: 'Projects',
                    count: 0,
                    iconClass: 'fas fa-edit',
                    key: 1
                },
                {
                    path: '/admin/tickets/all',
                    color: '#dc3545',
                    name: 'Tickets',
                    count: 0,
                    iconClass: 'fas fa-ticket-alt',
                    key: 2
                },
                {
                    path: '/admin/users/all',
                    color: '#28a745',
                    name: 'Users',
                    count: 0,
                    iconClass: 'fas fa-male',
                    key: 3
                }
            ]
        }
    }

    // Function to set the active page and deliver a list of current 
    // users on the selected page to the component rendering the users
    pageClick = (number, type) => {
        if (type === 'users') {
            let selectedUsers = this.state.users[number - 1];

            this.setState({
                activeUserPage: number,
                currentUsers: selectedUsers
            })
        } else if (type === 'tickets') {
            let selectedTickets = this.state.tickets[number - 1];

            this.setState({
                activeTicketPage: number,
                currentTickets: selectedTickets
            })
        }

    }

    // Determines how many pages there is going to be based off how many 
    // arrays of users there are
    createPagination = (groupedArrays, itemsName) => {
        let pageCount = Math.ceil(groupedArrays.length / 2);

        for (let number = 1; number <= pageCount + 1; number++) {
            if (itemsName === 'userItems') {
                this.setState(prevState => ({
                    userItems: [...prevState.userItems, number]
                }))
            } else if (itemsName === 'ticketItems') {
                this.setState(prevState => ({
                    ticketItems: [...prevState.ticketItems, number]
                }))
            }
        }
    }

    componentDidMount() {
        fetch('/admin/dashboard')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let position = 1;
                for (let count of data) {
                    this.setState(prevState => ({
                        infoItems: prevState.infoItems.map(obj => obj.key === position ? Object.assign(obj, { count: count.count_ptu }) : obj)
                    }));
                    position++;
                }
            })

        fetch('/admin/users/all')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let count = 0;
                let usersPerPage = 10;
                let group = [];

                // Check if the amount of tickets reaches the amount per page
                if (data.length < usersPerPage) {
                    for (let user of data) {
                        group.push(user);
                    }

                    this.setState({
                        currentUsers: group
                    })
                } else {
                    // Grouping entries from the database based off of how many entries 
                    // per page you want. You then put those arrays into a state array
                    for (let i = 0; i <= data.length - 1; i++) {
                        group.push(data[i]);
                        count++;

                        if (count >= usersPerPage) {
                            count = 0;
                            // loading first page's users
                            if (this.state.users.length < 1) {
                                this.setState({
                                    currentUsers: [...group]
                                });
                            }
                            this.setState({
                                users: [...this.state.users, group]
                            });
                            group = [];
                        } else if (i === data.length - 1) {
                            this.setState({
                                users: [...this.state.users, group]
                            });
                        }
                    }
                }

                this.createPagination(this.state.users, 'userItems');
            })

        fetch('/admin/tickets/all')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let count = 0;
                let ticketsPerPage = 10;
                let group = [];

                // Check if the amount of tickets reaches the amount per page
                if (data.length < ticketsPerPage) {
                    for (let ticket of data) {
                        console.log('loop: ', ticket);
                        group.push(ticket);
                    }

                    this.setState({
                        currentTickets: group
                    })
                } else {
                    // // Grouping entries from the database based off of how many entries 
                    // // per page you want. You then put those arrays into a state array
                    for (let i = 0; i <= data.length - 1; i++) {
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
                                tickets: [...this.state.tickets, group],
                            });

                            group = [];

                        } else if (i === data.length - 1) {
                            this.setState({
                                tickets: [...this.state.tickets, group]
                            });
                        }
                    }

                }

                this.createPagination(this.state.tickets, 'ticketItems');
            })
    }

    // Handles the redirect onClick for the PTU Blocks
    handleRedirect = (path) => {
        this.props.history.push(path);
    }

    render() {
        const { infoItems } = this.state;
        return (
            <Container className='main-content'>
                <Row className='main-content-title'>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <h1>Your Dashboard</h1>
                    </Col>
                </Row>
                <Row className='main-content-ptu-block'>
                    {
                        infoItems.map((item, key) => {
                            return (
                                <PtuBlock
                                    path={item.path}
                                    color={item.color}
                                    name={item.name}
                                    count={item.count}
                                    iconClass={item.iconClass}
                                    handleRedirect={this.handleRedirect}
                                    key={key}
                                />
                            );
                        })
                    }
                </Row>
                <UserAccordion
                    users={this.state.users}
                    userItems={this.state.userItems}
                    currentUsers={this.state.currentUsers}
                    activeUserPage={this.state.activeUserPage}

                    pageClick={this.pageClick}
                />

                <br />

                <TicketAccordion
                    tickets={this.state.tickets}
                    ticketItems={this.state.ticketItems}
                    currentTickets={this.state.currentTickets}
                    activeTicketPage={this.state.activeTicketPage}

                    pageClick={this.pageClick}
                />
            </Container>
        );
    }
}

class PtuBlock extends React.Component {
    render() {
        return (
            <Col xs={3} sm={3} md={3} lg={3} onClick={() => this.props.handleRedirect(this.props.path)}>
                <Row className='ptu-box'>
                    <Col xs='auto' sm='auto' md='auto' lg='auto' style={{ backgroundColor: this.props.color }} className='ptu-icon'>
                        <i className={this.props.iconClass} />
                    </Col>
                    <Col xs='auto' sm='auto' md='auto' lg='auto' className='ptu-info'>
                        {this.props.name}
                        <br />
                        {this.props.count}
                    </Col>
                </Row>
            </Col>
        );
    }
}
const TicketAccordion = (props) => {


    return (
        <Accordion defaultActiveKey="0">
            <Card className='user-card'>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        All Tickets
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Form inline className='user-search'>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Creator</th>
                                    <th>Priority</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Last Updated</th>
                                    <th>Created Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.currentTickets.map((ticket, key) => {

                                        return (
                                            <tr key={key}>
                                                <td>
                                                    {ticket.title}
                                                </td>
                                                <td>
                                                    {ticket.creator}
                                                </td>
                                                <td>
                                                    {ticket.priority}
                                                </td>
                                                <td>
                                                    {ticket.type}
                                                </td>
                                                <td>
                                                    {ticket.status}
                                                </td>
                                                <td>
                                                    {ticket.lastupdated}
                                                </td>
                                                <td>
                                                    {ticket.createddate}
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </Table>

                        <Pagination>
                            {
                                props.ticketItems.map((number, key) => {
                                    return (
                                        <Page
                                            number={number}
                                            active={props.activeTicketPage}
                                            pageClick={props.pageClick}
                                            type={'tickets'}
                                            key={key}
                                        />
                                    );
                                })
                            }
                        </Pagination>

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>

            </Card>
        </Accordion>
    );
}

const UserAccordion = (props) => {
    return (
        <Accordion defaultActiveKey="0">
            <Card className='user-card'>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        All Users
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Form inline className='user-search'>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.currentUsers.map((user, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>
                                                    {user.firstname}
                                                </td>
                                                <td>
                                                    {user.lastname}
                                                </td>
                                                <td>
                                                    {user.role}
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </Table>

                        <Pagination>
                            {
                                props.userItems.map((number, key) => {
                                    return (
                                        <Page
                                            number={number}
                                            active={props.activeUserPage}
                                            pageClick={props.pageClick}
                                            type={'users'}
                                            key={key}
                                        />
                                    );
                                })
                            }
                        </Pagination>


                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>

            </Card>
        </Accordion>
    );
}

export default Dashboard;