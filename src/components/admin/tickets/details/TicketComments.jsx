import React, { Component, useState, useEffect } from 'react';
import { Row, Col, Container, Modal, Image, Accordion, Card, Button, Table, Form, FormControl, ListGroup } from 'react-bootstrap';
import '../../../../styles/TicketDetailsStyle.css';
import avatar from '../../../../styles/assets/imgs/default-user.jpg'
import EditCommentModal from '../../../modal/EditCommentModal'

// const TicketComments = ({ showAlert, checkFields, handleTitleChange, handleDescriptionChange, ticketTitle, ticketDescription, handleSubmit }) => {
const TicketComments = (props) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newEditComment, setNewEditComment] = useState('');

    const { description, id } = props;

    useEffect(() => {
        loadTicketComments();
    }, []);

    const loadTicketComments = () => {
        // get all comments for this ticket id
        fetch(`/ticket/details/comments/${id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log('Success: ', data);
                setComments(data);
            })
            .catch((error) => {
                console.error('Error: ', error);
            })
    }

    const handleNewComment = (e) => {
        let comment = e.target.value;
        setNewComment(comment);
    }

    const handleCommentSubmit = (e) => {
        console.log('Submitting!');
        e.preventDefault();

        let comment = newComment;

        let data = {
            creator: 'Michael Chung',
            text: comment
        }

        setNewComment('');

        fetch(`/ticket/details/comment/add/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success POST:', data);
                loadTicketComments();
            })
            .catch((error) => {
                console.error('Error POST:', error);
            });
    }

    const handleEditComment = (e) => {
        let editComment = e.target.value;
        setNewEditComment(editComment);
    }

    const handleEditCommentSubmit = (e, comment_id) => {
        e.preventDefault();

        let data = {
            text: newEditComment
        }

        fetch(`/ticket/details/comment/edit/${comment_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success POST:', data);
                loadTicketComments();
            })
            .catch((error) => {
                console.error('Error POST:', error);
            });
    }

    const handleDeleteComment = (e, id) => {
        console.log('id', id);

        fetch(`/ticket/details/comments/delete/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success POST:', data);
                loadTicketComments();
            })
            .catch((error) => {
                console.error('Error POST:', error);
            });
    }

    return (
        <Accordion defaultActiveKey="0">
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Username
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body className='ticket-details-acc1'>

                        <Description description={description} />
                        <Comments
                            comments={comments}
                            newComment={newComment}
                            handleCommentSubmit={handleCommentSubmit}
                            handleNewComment={handleNewComment}
                            handleEditComment={handleEditComment}
                            handleEditCommentSubmit={handleEditCommentSubmit}
                            handleDeleteComment={handleDeleteComment}
                        />

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

const Description = ({ description }) => {
    return (
        <div className='ticket-details-description'>
            <Card>
                <Card.Header>Description</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p>
                            {' '}{description}{' '}
                        </p>
                        <footer className="blockquote-footer">
                            Username
                    </footer>
                    </blockquote>
                </Card.Body>
            </Card>
            <Card />
        </div>
    );
}

const Comments = ({ comments, newComment, handleCommentSubmit, handleNewComment, handleEditComment, handleEditCommentSubmit, handleDeleteComment }) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className='comment-count'>
                <p>{comments.length} Comment{comments.length > 1 ? 's' : ''}</p>
            </div>
            <ListGroup className='comments-list' variant="flush">
                {/* <ListGroup.Item action variant="secondary"> */}
                    <Container>
                        {
                            comments.map((comment, key) => {
                                if (comment.user_id === 1) {
                                    return (
                                        <Row key={key} className='comment-row'>
                                            <Col xs={6} md='auto' className='avatar-container'>
                                                <Image className='comment-avatar' src={avatar} roundedCircle />
                                            </Col>

                                            <Col xs={6} md='auto' className='name-posted-date'>
                                                <Col xs={6} md='auto' className='your-comment-header'>

                                                    <strong><p>{comment.creator}</p></strong>

                                                    <Col md='auto'>
                                                        <i className='fas fa-edit' onClick={handleShow} />
                                                        <EditCommentModal show={show}
                                                            show={show}
                                                            text={comment.text}
                                                            comment_id={comment.comment_id}
                                                            handleClose={handleClose}
                                                            handleEditComment={handleEditComment}
                                                            handleEditCommentSubmit={handleEditCommentSubmit}
                                                        />
                                                    </Col>
                                                    <Col md='auto'>
                                                        <i className="fas fa-trash-alt" onClick={(e) => {
                                                            handleDeleteComment(e, comment.comment_id);
                                                        }} />
                                                    </Col>
                                                </Col>
                                                <Col xs={6} md='auto'>
                                                    <p className='posted-date-comment'>{comment.createddate + ' ' + comment.createdtime}</p>
                                                </Col>
                                            </Col>

                                            <Col xs={6} md={12}>
                                                <p>{comment.text}</p>
                                            </Col>
                                        </Row>
                                    );
                                } else {
                                    return (
                                        <Row key={key} className='comment-row'>
                                            <Col xs={6} md='auto' className='avatar-container'>
                                                <Image className='comment-avatar' src={avatar} roundedCircle />
                                            </Col>

                                            <Col xs={6} md='auto' className='name-posted-date'>
                                                <Col xs={6} md='auto'>
                                                    <strong><p>{comment.creator}</p></strong>
                                                </Col>
                                                <Col xs={6} md='auto'>
                                                    <p className='posted-date-comment'>{comment.createddate + ' ' + comment.createdtime}</p>
                                                </Col>
                                            </Col>

                                            <Col xs={6} md={12}>
                                                <p>{comment.text}</p>
                                            </Col>
                                        </Row>
                                    );
                                }

                            })
                        }
                        <Row className='comment-submission-row'>
                            <Col xs={6} md={1} className='avatar-container'>
                                <Image className='comment-avatar' src={avatar} roundedCircle />
                            </Col>
                            <Col xs={6} md={11}>
                                <Form onSubmit={handleCommentSubmit}>
                                    <Form.Group className='comment-submission-textbox'>
                                        <Form.Control type="text" placeholder="Press Enter to post comment" value={newComment} onChange={handleNewComment} />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>

                    </Container>
                {/* </ListGroup.Item> */}
            </ListGroup>
        </>
    )
}

export default TicketComments;