import React, { Component } from 'react';
import { Row, Col, Pagination, Container, Accordion, Card, Button, Table, Form, FormControl, Image } from 'react-bootstrap';
import '../styles/LoginStyle.css';
import logo from './de_bug-logo.png';

class Login extends Component {


    componentDidMount() {
        fetch('/db')
        .then((data) => {
            console.log('data: ', data)
        })

    }

    render() {
        return (
            <Container fluid='true' className='login-container'>
                <Row>
                    <Col className='landing-logo'>
                        <Image src={logo} />
                    </Col>
                </Row>

                <Row className='login-card-row'>
                    <Col lg={6} className='login-card'>
                        <Card>
                            <Form>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                        Email
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="email" placeholder="Email" />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        Password
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="password" placeholder="Password" />
                                    </Col>
                                </Form.Group>
                                <div className='login-submit'>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col className='extra-login'>
                        <Button href='/admin/dashboard' className='demo-login'>Login as Demo User</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Login;
