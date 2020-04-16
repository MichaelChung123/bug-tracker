import React, { Component } from 'react';
import { Row, Col, Pagination, Container, Accordion, Card, Button, Table, Form, FormControl } from 'react-bootstrap';
import Page from '../Page';
import Search from '../Search';

import '../../styles/DashboardStyle.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeUserPage: 1,
            userItems: [],
            users: [],
            currentUsers: [],
            allGroupedUsers: [],
            newPages: false,

            activeTicketPage: 1,
            tickets: [],
            currentTickets: [],
            ticketItems: [],
            userSearch: '',
            ticketSearch: '',
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

    // Handles the redirect onClick for tickets
    handleRedirect = (path) => {
        this.props.history.push(path);
    }

    searchOnChange = (e) => {
        console.log('====================================================');
        let searchedEntries = [];

        this.setState({
            userSearch: e.target.value
        }, () => {
            console.log('arg1: ', this.state.allGroupedUsers);
            console.log('arg2: ', this.state.userSearch);

            searchedEntries = this.filterGroupArrays(this.state.allGroupedUsers, this.state.userSearch);
            console.log('searchedEntries: ', searchedEntries);

            let count = 0;
            let usersPerPage = 10;
            let group = [];


            // if search value is empty just load all users as default
            if (!this.state.userSearch) {
                this.getAllUsers();
            } else {
                // empty the old users array and then load the users again with the new search entries
                this.setState({
                    users: [],
                    currentUsers: []
                }, () => {
                    // Check if the amount of tickets reaches the amount per page
                    if (searchedEntries.length < usersPerPage) {
                        this.setState({
                            currentUsers: searchedEntries
                        })
                    } else {
                        // Grouping entries from the search function based off of how many entries 
                        // per page you want. You then put those arrays into a state array
                        for (let i = 0; i <= searchedEntries.length - 1; i++) {
                            group.push(searchedEntries[i]);
                            count++;

                            if (count >= usersPerPage) {
                                count = 0;
                                // loading first page's users
                                if (this.state.users.length < 1) {
                                    this.setState({
                                        currentUsers: [...group]
                                    });
                                }

                                console.log('group: ', group);
                                this.setState(prevState => ({
                                    users: [...prevState.users, group]
                                }), () => {
                                    console.log('1: ', group);
                                })


                                group = [];
                            } else if (i === searchedEntries.length - 1) {
                                console.log('else group: ', group);

                                this.setState(prevState => ({
                                    users: [...prevState.users, group]
                                }), () => {
                                    console.log('2: ', this.state.users);
                                })
                            }
                        }
                    }
                    console.log('users: ', this.state.users);
                    this.createPagination(this.state.users, 'userItems');
                })
            }

        })

    }

    // Function that filters all the data that it's given as groupped arrays that hold the data and 
    // parses it based off of what the value is from the search bar.
    // Takes 2 arguments:
    // 1. Array of Arrays that hold objects. (Groupped arrays for tables).
    // 2. Value of the search bar text.
    filterGroupArrays = (groupArrays, searchValue) => {
        let matchedEntries = [];
        let tempArray = [];

        // Loop through the first array layer of groupArrays
        for (let groups of groupArrays) {

            // Loop through the second layer of array groups
            for (let jsonObj of groups) {

                // Loop through all the objects in each array
                for (let tableRow in jsonObj) {
                    let objValue = jsonObj[tableRow].toString().toLowerCase();
                    if (objValue.includes(searchValue.toLowerCase())) {
                        tempArray.push(jsonObj);
                    }
                }
            }

            // Assign the temp array of objs to the matchedEntries var
            matchedEntries = tempArray;
        }
        return matchedEntries;
    }

    getAllUsers = () => {
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
                    this.setState({
                        currentUsers: data
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

        // Fetches all users if the users value has already been assigned. Useful check for when you 
        // search and users has a value already
        if (this.state.users) {
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
                        this.setState({
                            currentUsers: data
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
                .then(() => {
                    this.setState({
                        allGroupedUsers: this.state.users
                    })
                })

        }

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
                    this.setState({
                        currentTickets: data
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
                    userSearch={this.state.userSearch}

                    pageClick={this.pageClick}
                    searchOnChange={this.searchOnChange}
                    filterGroupArrays={this.filterGroupArrays}
                />

                <br />

                <TicketAccordion
                    tickets={this.state.tickets}
                    ticketItems={this.state.ticketItems}
                    currentTickets={this.state.currentTickets}
                    activeTicketPage={this.state.activeTicketPage}

                    handleRedirect={this.handleRedirect}
                    pageClick={this.pageClick}
                />
            </Container>
        );
    }
}

class PtuBlock extends React.Component {
    render() {
        return (
            <Col xs={3} sm={3} md={3} lg={3} onClick={this.props.name === 'Users' ? null : () => this.props.handleRedirect(this.props.path)} className={this.props.name === 'Users' ? '' : 'cursor-pointer'}>
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

const UserAccordion = (props) => {
    return (
        <Accordion defaultActiveKey="0">
            <Card className='user-card'>
                <Card.Header>
                    <Accordion.Toggle as={Card.Title} variant="link" eventKey="0">
                        All Users
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        {/* <Search
                            users={props.users}
                            groupArrays={props.users}
                            searchOnChange={props.searchOnChange}
                            value={props.userSearch}
                            filterGroupArrays={props.filterGroupArrays}
                        /> */}
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

const TicketAccordion = (props) => {
    return (
        <Accordion defaultActiveKey="0">
            <Card className='user-card'>
                <Card.Header>
                    <Accordion.Toggle as={Card.Title} variant="link" eventKey="0">
                        All Tickets
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        {/* <Form inline className='user-search'>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form> */}
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
                                            <tr key={key} onClick={() => props.handleRedirect(`/admin/tickets/details/${ticket.ticket_id}`)} className='cursor-pointer'>
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
export default Dashboard;