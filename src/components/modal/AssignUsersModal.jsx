import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Modal, Button, Form, Accordion, Card, FormControl, Table } from 'react-bootstrap';
import '../../styles/ProjectDetailstyle.css';

function AssignUsersModal(props) {
    const [show, setShow] = useState(false);
    const [userTypes, setUserTypes] = useState([
        {
            type: 'Developer',
            color: 'blue'
        },
        {
            type: 'Manager',
            color: 'green'
        },
        {
            type: 'Submitter',
            color: 'yellow'
        }
    ])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const project_id = props.parentProps.appProps.match.params.id;

    return (
        <>
            <Col xs={3} sm={3} md={3} lg={3}>
                <Row onClick={handleShow} className='ptu-box'>
                    <Col xs='auto' sm='auto' md='auto' lg='auto' style={{ backgroundColor: '#007bff' }} className='ptu-icon'>
                        <i className='fas fa-user-plus' />
                    </Col>
                    <Col xs='auto' sm='auto' md='auto' lg='auto' className='ptu-info'>
                        Manage Users
                    </Col>
                </Row>
            </Col>

            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Assign Users</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            userTypes.map((userType, key) => {
                                let output = key < userTypes.length - 1 ?
                                    <div key={key}>
                                        <UserAccordions
                                            type={userType.type}
                                            color={userType.color}
                                            project_id={project_id}
                                            parentProps={props.parentProps}
                                        />
                                        <br />
                                    </div>
                                    :
                                    <UserAccordions
                                        type={userType.type}
                                        color={userType.color}
                                        project_id={project_id}
                                        parentProps={props.parentProps}
                                        key={key}
                                    />

                                return output;
                            })
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                    </Button>
                        <Button type='submit' variant="primary" onClick={handleClose}>
                            Save
                    </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

const UserAccordions = (props) => {
    const [users, setUsers] = useState([]);
    const [assignedUsers, setAssignedUsers] = useState([]);

    // Checks the the user_project table to see which users are assigned to the current project
    // and sets the assigned users in state
    const checkAssignedUsers = () => {
        console.log('CHECKING FOR ASSIGNED USERS...');
        const id = props.parentProps.appProps.match.params.id;

        fetch(`/admin/projects/details/users/${id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setAssignedUsers(data);
            })
    }

    const handleUserClicked = (user_id, project_id) => {
        let data = {
            user_id: user_id,
            project_id: parseInt(project_id)
        }

        // Sending what user has been assigned to the current project to the Database
        fetch(`/admin/projects/details/select/user/${user_id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                checkAssignedUsers();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        fetch(`/admin/users`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setUsers(data);
            })
    }, [assignedUsers]); // set assignedUsers as a dependency

    useEffect(() => {
        console.log('INITIAL RENDER');
        checkAssignedUsers();
    }, []); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour


    console.log('Assigned Users: ', assignedUsers);

    return (
        <Accordion defaultActiveKey={props.type === "Developer" ? "0" : "none"}>
            <Card className='user-card'>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        {props.type}s
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Role</th>
                                    <th>Number of Projects</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, key) => {
                                        let count = 0;
                                        let currentID = user.project_id;

                                        for (let user of users) {
                                            if (user.project_id === currentID) {
                                                count++;
                                            }
                                        }

                                        if (user.role === props.type) {
                                            return (
                                                <tr style={assignedUsers.some(item => item.user_id === user.user_id) ? { backgroundColor: 'red' } : { opacity: '0.5', backgroundColor: 'green' }} onClick={() => handleUserClicked(user.user_id, props.project_id)} key={key}>
                                                    <td>{user.firstname}</td>
                                                    <td>{user.lastname}</td>
                                                    <td>{user.role}</td>
                                                    <td>{count}</td>
                                                </tr>
                                            );
                                        }
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

export default AssignUsersModal;