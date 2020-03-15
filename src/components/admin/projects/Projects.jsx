import React, { Component } from 'react';
import { Row, Col, Container, Table, Form, FormControl, Button, Pagination } from 'react-bootstrap';
import '../../../styles/ProjectStyle.css';

/* 
    how to connect to database:
    1. psql -d bugtrackerdb -U me
*/

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [
                {
                    title: 'first project',
                    activeTickets: 10,
                    desc: 'this is the project 1s description'
                },
                {
                    title: 'second project',
                    activeTickets: 10,
                    desc: 'this is the project 2s description'
                },
                {
                    title: 'third project',
                    activeTickets: 10,
                    desc: 'this is the project 3s description'
                },
                {
                    title: 'fourth project',
                    activeTickets: 10,
                    desc: 'this is the project 4s description'
                },
                {
                    title: 'fifth project',
                    activeTickets: 10,
                    desc: 'this is the project 5s description'
                }
            ]
        }
    }


    componentDidMount() {
        // fetch('/admin/Projects/all')
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then((data) => {

        //     }
    }

    render() {
        return (
            <Container className='all-projects-container'>
                <Row className='projects-title'>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <h1>All Projects</h1>
                    </Col>
                </Row>
                <Container fluid='true'>
                    <Row className='project-row'>
                        {
                            this.state.projects.map((project, key) => {
                                return (
                                    <ProjectList
                                        title={project.title}
                                        activeTickets={project.activeTickets}
                                        desc={project.desc}
                                    />
                                );
                            })
                        }
                    </Row>
                </Container>
            </Container>
        );
    }
}

class ProjectList extends React.Component {
    render() {
        return (
            <Col xs={3} sm={3} md={3} lg={3} className='project-block'>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <h3>{this.props.title}</h3>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <p>{this.props.activeTickets}</p>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <p>{this.props.desc}</p>
                </Col>
            </Col>
        );
    }
}

export default Projects;