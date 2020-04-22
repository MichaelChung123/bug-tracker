import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../styles/ProjectStyle.css';

function CreateProjectModal({ show, handleClose, handleRedirect }) {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleDesc = (e) => {
        setDesc(e.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let formatedTitle = title.replace("'", "''");
        let formatedDescription = desc.replace("'", "''");

        const data = {
            title: formatedTitle,
            description: formatedDescription
        }

        fetch(process.env.REACT_APP_BASEURL + '/admin/projects/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((data) => {
                console.log('Success:', data);
            })
            .then(redirectNewProject())
            .catch((error) => {
                console.error('Error POST:', error);
            });
    }

    const redirectNewProject = () => {
        fetch(process.env.REACT_APP_BASEURL + '/admin/projects/newest')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let id = data[0].project_id;
                handleRedirect(`/admin/projects/details/${id}`);
            })
    }

    // console.log('show: ', show);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label>
                            Title
                        </Form.Label>
                        <Form.Control type="text" name='title' placeholder="Enter Title" onChange={handleTitle} />

                        <br />

                        <Form.Label>
                            Description
                        </Form.Label>
                        <Form.Control as="textarea" rows="3" onChange={handleDesc} />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type='submit' variant="primary" onClick={handleClose}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default CreateProjectModal;