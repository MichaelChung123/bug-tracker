import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


const EditCommentModal = ({ show, handleClose, text, handleEditComment, comment_id, handleEditCommentSubmit }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Comment</Modal.Title>
                </Modal.Header>
                <Form onSubmit={(e) => {
                    handleEditCommentSubmit(e, comment_id);
                }}>
                    <Modal.Body>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control as="textarea" defaultValue={text} onChange={handleEditComment} />
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type='submit' onClick={handleClose}>
                            Done
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default EditCommentModal;