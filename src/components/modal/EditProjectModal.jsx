import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class EditProjectModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Modal show={this.props.showEditProject} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Project</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.props.handleEditProjectSubmit}>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Label>
                                    Title
                                </Form.Label>
                                <Form.Control type="text" name='title' defaultValue={this.props.editTitle} onChange={this.props.handleChange} />
                                <br />
                                <Form.Label>
                                    Description
                                </Form.Label>
                                <Form.Control as="textarea" rows="3" name='description' defaultValue={this.props.editDesc} onChange={this.props.handleChange} />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type='submit' variant="primary" onClick={this.props.handleClose}>
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }
}


export default EditProjectModal;