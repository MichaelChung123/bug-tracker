import React from 'react';
import { Row, Col, Modal, Button, Form, Card, } from 'react-bootstrap';
import '../../styles/ProjectDetailstyle.css';

function AssignTicketToProjectModal({ projects, setSelectedProject, sideActions, projectSelected, selectedProject, target, show, handleClose }) {

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const { description } = sideActions;

    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{description}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='select-project-modal-body'>
                        <Row>
                            <Col xs={4} sm={4} md={4} lg={4}>
                                {
                                    projects.map((project, key) => {
                                        return (
                                            <ProjectBlock
                                                project={project}
                                                setSelectedProject={setSelectedProject}
                                                handleClose={handleClose}
                                                key={key}
                                            />
                                        )
                                    })
                                }
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Done
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

function ProjectBlock({ project, setSelectedProject, handleClose }) {
    return (
        <>
            <Card
                bg='Primary'
                text='dark'
                style={{ width: '18rem' }}
                className='project-card-modal'
                onClick={() => {
                    setSelectedProject(project)
                    handleClose()
                }}
            >
                <Card.Header></Card.Header>
                <Card.Body>
                    <Card.Title> {project.title} </Card.Title>
                    <Card.Text>
                        {project.description.length > 200 ? project.description.slice(0, 200) + ' ...' : project.description}
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
        </>
    )
}

export default AssignTicketToProjectModal;