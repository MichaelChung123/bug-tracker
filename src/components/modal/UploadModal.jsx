import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class UploadModal extends Component {
    render() {
        return (
            <>
                <Modal show={this.props.showUpload} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload File</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.props.handleAttachmentSubmit}>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Label>Attachments:</Form.Label>
                                <Form.Control type="file" placeholder="files" multiple onChange={this.props.handleUpload} />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type='submit' variant="primary" onClick={this.props.handleClose}>
                                Upload
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }
}


export default UploadModal;