import React, { Component, useState, useEffect } from 'react';
import { Row, Col, Container, Accordion, Card, Button, Table, Form, FormControl, Pagination } from 'react-bootstrap';
import '../../../styles/ProjectDetailstyle.css';
import AssignUsersModal from '../../modal/AssignUsersModal';

/* 
    how to connect to database:
    1. psql -d bugtrackerdb -U me
*/

class ProjectDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            projItems: [
                // {
                //     color: '#007bff',
                //     name: 'Manage Users',
                //     icon: 'fas fa-user-plus'
                // },
                {
                    color: '#dc3545',
                    name: 'Tickets',
                    icon: 'fas fa-ticket-alt'
                },
                {
                    color: '#28a745',
                    name: 'Manager',
                    icon: 'fas fa-male'
                },
                {
                    color: '#17a2b8',
                    name: 'Developers',
                    icon: 'fas fa-laptop'
                },
                // {
                //     color: '#ffc107',
                //     name: 'Submitters',
                //     icon: 'fas fa-check'
                // }
            ]
        }
    }


    componentDidMount() {
        const id = this.props.appProps.match.params.id;

        fetch(`/admin/projects/details/${id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let { id, title, description } = data[0];

                this.setState({
                    title,
                    description
                })

            })
    }

    render() {
        return (
            <Container fluid='true'>
                <Row className='project-title'>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <h1><a><i className='fas fa-edit' /></a> {this.state.title}</h1>
                    </Col>
                </Row>
                <Row className='block-row'>
                    {/* <Col xs={3} sm={3} md={3} lg={3}>
                        <Row className='ptu-box'>
                            <Col xs='auto' sm='auto' md='auto' lg='auto' style={{ backgroundColor: '#007bff' }} className='ptu-icon'>
                                <i className='fas fa-user-plus' />
                            </Col>
                            <Col xs='auto' sm='auto' md='auto' lg='auto' className='ptu-info'>
                                Manage Users
                            </Col>
                        </Row>
                    </Col> */}
                    <AssignUsersModal
                        parentProps={this.props}
                    />
                    {
                        this.state.projItems.map((projItem, key) => {
                            return (
                                <ProjectBlocks
                                    color={projItem.color}
                                    name={projItem.name}
                                    icon={projItem.icon}
                                    key={key}
                                />
                            );
                        })
                    }
                </Row>

                <UserAccordion
                    parentProps={this.props}
                />
                <div className='divider'></div>
                <TicketAccordion
                    parentProps={this.props}
                />

            </Container>
        );
    }
}

const ProjectBlocks = (props) => {
    let { color, name, icon } = props;

    return (
        <Col xs={3} sm={3} md={3} lg={3}>
            <Row className='ptu-box'>
                <Col xs='auto' sm='auto' md='auto' lg='auto' style={{ backgroundColor: color }} className='ptu-icon'>
                    <i className={icon} />
                </Col>
                <Col xs='auto' sm='auto' md='auto' lg='auto' className='ptu-info'>
                    {name}
                </Col>
            </Row>
        </Col>
    );
}

const UserAccordion = (props) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const id = props.parentProps.appProps.match.params.id;

        fetch(`/admin/projects/details/users/${id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setUsers(data);
            })
    }, []); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour

    return (
        <Accordion defaultActiveKey="0">
            <Card className='user-card'>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Users
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
                                    users.map((user, key) => {
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
                        {/*
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
                         */}

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>

            </Card>
        </Accordion>
    );
}

const TicketAccordion = (props) => {
    const [activePage, setActivePage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const id = props.parentProps.appProps.match.params.id;

        fetch(`/admin/projects/details/tickets/${id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setTickets(data);
            })
    }, []); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour

    // const createPagination = () => {
    //     let pageCount = Math.ceil(this.state.tickets.length / 2);

    //     for (let number = 1; number <= pageCount + 1; number++) {
    //         this.setState(prevState => ({
    //             items: [...prevState.items, number]
    //         }))
    //     }

    //     this.setState({
    //         pageCount: pageCount
    //     })
    // }

    return (
        <Accordion defaultActiveKey="0">
            <Card className='ticket-card'>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Tickets
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
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
                                {
                                    tickets.map((ticket, key) => {
                                        let trimedLastUpdated = ticket.lastupdated.slice(0, 10);
                                        let trimedCreatedDate = ticket.createddate.slice(0, 10);

                                        return (
                                            <tr key={key}>
                                                <td>{ticket.title}</td>
                                                <td>{ticket.creator}</td>
                                                <td>{ticket.priority}</td>
                                                <td>{ticket.type}</td>
                                                <td>{ticket.status}</td>
                                                <td>{trimedLastUpdated}</td>
                                                <td>{trimedCreatedDate}</td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </Table>

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>

            </Card>
        </Accordion>
    );
}


export default ProjectDetails;