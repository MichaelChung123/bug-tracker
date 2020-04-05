import React, { Component, useState, useEffect } from 'react';
import { Row, Col, Modal, Container, Accordion, Card, Button, Table, Form, FormControl, Pagination } from 'react-bootstrap';

class EditTicketModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }



    render() {
        
        return (
            <>
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Form onSubmit={this.props.handleEditSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Ticket</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='select-project-modal-body'>
                            <Form.Group>
                                <Form.Label>
                                    Title
                                    </Form.Label>
                                <Form.Control type="text" name='title' value={this.props.editTitleVal} onChange={this.props.handleEditTitle} />

                                <br />

                                <Form.Label>
                                    Description
                                    </Form.Label>
                                <Form.Control as="textarea" rows="3" value={this.props.editDescVal} onChange={this.props.handleEditDesc} />
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