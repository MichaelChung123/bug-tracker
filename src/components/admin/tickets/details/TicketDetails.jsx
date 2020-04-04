import React, { Component, useState, useEffect } from 'react';
import { Row, Col, Container, Accordion, Card, Button, Table, Form, FormControl, Pagination } from 'react-bootstrap';
// import '../../../styles/TicketDetailstyle.css';
import AssignUsersModal from '../../../modal/AssignUsersModal';
import SideActions from './SideActions';

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
        console.log('priority: ', this.state.priority);
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
                                        key={key}
                                    />
                                );
                            })
                        }
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