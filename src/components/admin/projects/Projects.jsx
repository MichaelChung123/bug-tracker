import React, { Component } from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
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
            show: false,
            activeProjects: [],
        }
    }

    handleShow = () => {
        this.setState({
            show: true
        })
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }

    // Handles the redirect onClick
    handleRedirect = (path) => {
        this.props.history.push(path);
    }

    componentDidMount() {

        fetch('/projects/active/tickets')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    activeProjects: data
                })
            })
    }

    render() {
        return (
            <Container className='all-projects-container'>
                <Row className='projects-title'>
                    <Col xs={12} sm={12} md={7} lg={6}>
                        <h1>All Projects</h1>
                    </Col>
                    <Col xs={7} sm={12} md={5} lg={6} className='create-project'>
                        <button onClick={this.handleShow}>Create New <i className='fa fa-plus-circle nav-icon' /></button>
                        <CreateProjectModal
                            show={this.state.show}
                            handleClose={this.handleClose}
                            handleRedirect={this.handleRedirect}
                        />
                    </Col>
                </Row>
                <Row className='project-row'>
                    {
                        this.state.activeProjects.map((project, key) => {
                            return (
                                <ProjectList
                                    projects={this.state.projects}
                                    project_id={project.project_id}
                                    title={project.title}
                                    activeTickets={project.activetickets}
                                    description={project.description}
                                    key={key}
                                />
                            );
                        })
                    }
                </Row>
            </Container>
        );
    }
}

class ProjectList extends React.Component {
    render() {
        return (
            <Col xs={12} sm={6} md={6} lg={4} className='project-col'>
                <Card style={{ width: '18rem' }}>
                    <Card.Header>{this.props.title}</Card.Header>
                    <Card.Body className='projects-cards-content'>
                        <Card.Subtitle className="mb-2 text-muted item">{this.props.activeTickets} Active Tickets</Card.Subtitle>
                        <Card.Text>
                            <p>
                                {this.props.description.length > 200 ? this.props.description.slice(0, 200) + ' ...' : this.props.description}
                            </p>
                        </Card.Text>
                        <div className='more-info-container'>
                            <Card.Link href={`/admin/projects/details/${this.props.project_id}`} className='item'>More Info <i className="fas fa-arrow-circle-right"></i></Card.Link>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        );
    }
}

export default Projects;