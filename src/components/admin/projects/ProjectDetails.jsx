import React, { Component, useState, useEffect } from 'react';
import { Row, Col, Container, Accordion, Card, Button, Table, Form, FormControl } from 'react-bootstrap';
import '../../../styles/ProjectDetailstyle.css';
import AssignUsersModal from '../../modal/AssignUsersModal';
import EditProjectModal from '../../modal/EditProjectModal';
import {withRouter} from 'react-router-dom';

/* 
    how to connect to database:
    1. psql -d bugtrackerdb -U me
*/

class ProjectDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assignedUsers: [],
            title: '',
            description: '',
            showEditProject: false,
            editTitle: '',
            editDesc: '',
            projItems: [
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
                }
            ],
            ticketDesc: 0,
            managerDesc: '',
            developersDesc: ''
        }
    }

    // Checks the the user_project table to see which users are assigned to the current project
    // and sets the assigned users in state
    checkAssignedUsers = () => {
        const id = this.props.appProps.match.params.id;

        fetch(process.env.REACT_APP_BASEURL + `/admin/projects/details/users/${id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let devCount = 0;

                for (let user of data) {
                    if (user.role === 'Manager') {
                        this.setState({
                            managerDesc: user.firstname + ' ' + user.lastname
                        })
                    } else if (user.role === 'Developer') {
                        devCount++;
                    }
                }

                this.setState({
                    assignedUsers: data,
                    developersDesc: devCount
                })
            })
    }

    setTicketDesc = (count) => {
        this.setState({
            ticketDesc: count
        })
    }

    handleEditProject = () => {
        this.setState({
            showEditProject: true
        })
    }

    handleClose = () => {
        this.setState({
            showEditProject: false
        })
    }

    handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;

        if (name === 'title') {
            this.setState({
                editTitle: value
            })
        } else if (name === 'description') {
            this.setState({
                editDesc: value
            })
        }
    }


    handleEditProjectSubmit = (e) => {
        e.preventDefault();

        const id = this.props.appProps.match.params.id;

        let editDesc = this.state.editDesc.replace("'", "''");
        let editTitle = this.state.editTitle.replace("'", "''");

        this.setState({
            title: this.state.editTitle,
            description: this.state.editDesc,
        })

        let data = {
            title: editTitle,
            description: editDesc
        }

        // Edit title and description values in db
        fetch(process.env.REACT_APP_BASEURL + `/admin/projects/edit/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }

    // Handles the redirect onClick for the PTU Blocks
    handleRedirect = (path) => {
        this.props.history.push(path);
    }

    componentDidMount() {
        const id = this.props.appProps.match.params.id;

        fetch(process.env.REACT_APP_BASEURL + `/admin/projects/details/${id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let { title, description } = data[0];

                this.setState({
                    title,
                    description,
                    editTitle: title,
                    editDesc: description
                })
            })
    }

    render() {
        return (
            <Container fluid='true'>
                <Row className='project-title'>
                    <Col xs='auto' sm='auto' md='auto' lg='auto'>
                        <h1><a><i className='fas fa-edit' onClick={this.handleEditProject} /></a>{this.state.title}</h1>
                        <EditProjectModal
                            showEditProject={this.state.showEditProject}
                            title={this.state.title}
                            description={this.state.description}
                            editTitle={this.state.editTitle}
                            editDesc={this.state.editDesc}

                            handleEditProject={this.handleEditProject}
                            handleClose={this.handleClose}
                            handleChange={this.handleChange}
                            handleEditProjectSubmit={this.handleEditProjectSubmit}
                        />
                    </Col>
                </Row>

                <Card>
                    <Card.Body>
                        <Card.Title>Description</Card.Title>
                        <Card.Text>
                            {this.state.description}
                        </Card.Text>
                    </Card.Body>
                </Card>

                <br />

                <Row className='block-row'>

                    <AssignUsersModal
                        parentProps={this.props}
                        assignedUsers={this.state.assignedUsers}
                        checkAssignedUsers={this.checkAssignedUsers}
                    />

                    {
                        this.state.projItems.map((projItem, key) => {
                            return (
                                <ProjectBlocks
                                    color={projItem.color}
                                    name={projItem.name}
                                    icon={projItem.icon}
                                    ticketDesc={this.state.ticketDesc}
                                    managerDesc={this.state.managerDesc}
                                    developersDesc={this.state.developersDesc}
                                    key={key}
                                />
                            );
                        })
                    }
                </Row>

                <UserAccordion
                    parentProps={this.props}
                    assignedUsers={this.state.assignedUsers}
                    checkAssignedUsers={this.checkAssignedUsers}
                />

                <div className='divider'></div>

                <TicketAccordion
                    parentProps={this.props}
                    assignedUsers={this.state.assignedUsers}
                    checkAssignedUsers={this.checkAssignedUsers}
                    setTicketDesc={this.setTicketDesc}
                    handleRedirect={this.handleRedirect}
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
                <Col xs={3} sm={3} md={3} lg={3} style={{ backgroundColor: color }} className='ptu-icon'>
                    <i className={icon} />
                </Col>
                <Col xs={9} sm={9} md={9} lg={9} className='ptu-info'>
                    {name}
                    <br />
                    {name === 'Tickets' ? props.ticketDesc : ''}
                    {name === 'Manager' ? props.managerDesc : ''}
                    {name === 'Developers' ? props.developersDesc : ''}
                </Col>
            </Row>
        </Col>
    );
}

const UserAccordion = (props) => {
    useEffect(() => {
        props.checkAssignedUsers();
    }, []); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour

    return (

        <Accordion defaultActiveKey="0">
            <Card className='user-card'>
                <Card.Header>
                    <Accordion.Toggle as={Card.Title} variant="link" eventKey="0">
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
                                    props.assignedUsers.map((user, key) => {
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
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>

            </Card>
        </Accordion>
    );
}

const TicketAccordion = (props) => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const id = props.parentProps.appProps.match.params.id;

        fetch(process.env.REACT_APP_BASEURL + `/admin/projects/details/tickets/${id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setTickets(data);
                props.setTicketDesc(data.length);
            })
    }, []); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour

    return (
        <Accordion defaultActiveKey="0">
            <Card className='ticket-card'>
                <Card.Header>
                    <Accordion.Toggle as={Card.Title} variant="link" eventKey="0">
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
                                            <tr key={key} onClick={() => props.handleRedirect(`/admin/tickets/details/${ticket.ticket_id}`)} className='cursor-pointer'>
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


export default withRouter(ProjectDetails);