import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import CreateProjectModal from '../../modal/CreateProjectModal';
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
                    desc: 'this is the project 1s description',
                    count: 1
                },
                {
                    title: 'second project',
                    activeTickets: 10,
                    desc: 'this is the project 2s description',
                    count: 2
                },
                {
                    title: 'third project',
                    activeTickets: 10,
                    desc: 'this is the project 3s description',
                    count: 3
                },
                {
                    title: 'fourth project',
                    activeTickets: 10,
                    desc: 'this is the project 4s description',
                    count: 4
                },
                {
                    title: 'fifth project',
                    activeTickets: 10,
                    desc: 'this is the project 5s description',
                    count: 5
                }
            ]
        }
    }

    render() {
        return (
            <Container className='all-projects-container'>
                <Row className='projects-title'>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <h1>All Projects</h1>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} className='create-project'>
                        <CreateProjectModal />
                    </Col>
                </Row>
                <Container fluid='true'>
                    <Row className='project-row'>
                        {
                            this.state.projects.map((project, key) => {
                                return (
                                    <ProjectList
                                        projects={this.state.projects}
                                        title={project.title}
                                        activeTickets={project.activeTickets}
                                        desc={project.desc}
                                        count={project.count}
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
            <Col xs={12} sm={6} md={6} lg={3} className='project-block'>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <h3>{this.props.title}</h3>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <p><b>{this.props.activeTickets}</b> Active Tickets</p>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <p>{this.props.desc}</p>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} className='more-info'>
                    <a href="/Projects/Details/1" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                </Col>
            </Col>
        );
    }
}

export default Projects;