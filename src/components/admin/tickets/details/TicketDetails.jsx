import React, { Component, useState, useEffect } from 'react';
import { Row, Col, Container, Accordion, Card, Button, Table, Form, FormControl, Pagination } from 'react-bootstrap';
// import '../../../styles/TicketDetailstyle.css';
import AssignUsersModal from '../../../modal/AssignUsersModal';
import SideActions from './SideActions';
import UploadModal from '../../../modal/UploadModal';
import DownloadModal from '../../../modal/DownloadModal';

/* 
    how to connect to database:
    1. psql -d bugtrackerdb -U me
*/

class TicketDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketTitle: '',
            priority: '',
            type: '',
            status: '',
            lastUpdated: '',
            description: '',
            selectedPriorityBox: <></>,
            selectedTypeBox: <></>,
            prioritySelected: false,
            typeSelected: false,
            selectedPriority: '',
            selectedType: '',
            attachment: '',
            sideActions: [
                {
                    title: 'Priority',
                    subOptions: [
                        {
                            title: 'Low',
                            color: '#ffc107',
                            iconClass: 'fas fa-angle-up'
                        },
                        {
                            title: 'Medium',
                            color: '#fd7e14',
                            iconClass: 'fas fa-angle-double-up'
                        },
                        {
                            title: 'High',
                            color: '#dc3545',
                            iconClass: 'fas fa-exclamation-triangle'
                        }
                    ]
                },
                {
                    title: 'Type',
                    subOptions: [
                        {
                            title: 'Feature',
                            color: '#28a745',
                            iconClass: 'fas fa-hand-paper'
                        },
                        {
                            title: 'UI',
                            color: '#ffc107',
                            iconClass: 'fas fa-mouse-pointer'
                        },
                        {
                            title: 'Server',
                            color: '#fd7e14',
                            iconClass: 'fas fa-server'
                        },
                        {
                            title: 'Bug',
                            color: '#dc3545',
                            iconClass: 'fas fa-bug'
                        }
                    ]
                }
            ]
        }
    }

    handleActionSelect = (title, actionValue, selectedAction) => {
        if (title === "Priority") {
            this.setState({
                selectedPriorityBox: selectedAction,
                selectedPriority: actionValue,
                prioritySelected: true
            })
        } else if (title === "Type") {
            this.setState({
                selectedTypeBox: selectedAction,
                selectedType: actionValue,
                typeSelected: true
            })
        }
    }
    handleUpload = (e) => {
        let file = e.target.files[0];
        console.log('file: ', file);

        this.setState({
            attachment: file
        })
    }

    handleAttachmentSubmit = (e) => {
        e.preventDefault();
        console.log('submitting attachment');

        let file = this.state.attachment;
        const formData = new FormData();
        formData.append('myFile', file);


        fetch('/upload/attachment', {
            method: 'POST',
            headers: {
                'Content-Type': file.type
            },
            body: file
        })
            .then((response) => {
                response.json();
            })
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    componentDidMount() {
        const id = this.props.appProps.match.params.id;

        // Gets all info about specific ticket from tickets table
        fetch(`/admin/tickets/details/${id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let { title,
                    priority,
                    type,
                    status,
                    lastupdated,
                    description } = data[0];

                this.setState({
                    ticketTitle: title,
                    priority,
                    type,
                    status,
                    lastUpdated: lastupdated,
                    description
                })
            })

    }

    render() {
        return (
            <Container className='all-tickets-container'>
                <Row className='tickets-title'>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <h1>{this.state.ticketTitle}</h1>
                    </Col>
                </Row>
                {/* SIDE ACTIONS */}
                <Row>
                    <Col style={{ backgroundColor: 'red' }} xs={3} sm={3} md={3} lg={3}>
                        {
                            this.state.sideActions.map((action, key) => {
                                return (
                                    <SideActions
                                        action={action}
                                        priority={this.state.priority}
                                        type={this.state.type}
                                        selectedPriorityBox={this.state.selectedPriorityBox}
                                        selectedTypeBox={this.state.selectedTypeBox}
                                        prioritySelected={this.state.prioritySelected}
                                        typeSelected={this.state.typeSelected}

                                        handleActionSelect={this.handleActionSelect}
                                        key={key}
                                    />
                                );
                            })
                        }

                        {/* <Form>
                            <Form.File
                                id="custom-file"
                                label="Custom file input"
                                custom
                            />
                        </Form> */}

                        <Form onSubmit={this.handleAttachmentSubmit}>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Attachments:</Form.Label>
                                <Form.Control type="file" placeholder="files" onChange={this.handleUpload} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                    {/* TICKET DETAILS */}
                    <Col style={{ backgroundColor: 'blue' }} xs={9} sm={9} md={9} lg={9}>

                    </Col>
                </Row>
            </Container>
        );
    }
}


export default TicketDetails;