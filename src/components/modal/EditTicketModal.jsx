import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class EditTicketModal extends Component {

    render() {
        return (
            <>
                <Modal show={this.props.showEdit} onHide={this.props.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Ticket</Modal.Title>
                        </Modal.Header>
                    <Form onSubmit={this.props.handleEditSubmit}>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Label>
                                    Title
                                </Form.Label>
                                <Form.Control type="text" name='title' defaultValue={this.props.ticketTitle} onChange={this.props.handleEditTitle} />

                                <br />

                                <Form.Label>
                                    Description
                                    </Form.Label>
                                <Form.Control as="textarea" rows="3" defaultValue={this.props.description} onChange={this.props.handleEditDesc} />
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


export default EditTicketModal;