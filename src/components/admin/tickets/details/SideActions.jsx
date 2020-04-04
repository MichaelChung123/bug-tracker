import React, { Component, useState, useEffect } from 'react';
import { Row, Col, Container, Accordion, Card, Button, Table, Form, FormControl, Pagination } from 'react-bootstrap';

const SideActions = ({ action, priority, type }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {
        title,
        subOptions
    } = action;

    console.log('subOptions: ', subOptions);

    return (
        subOptions.map((option, key) => {
            console.log('priority: ', priority);
            console.log('option: ', option);
            if (option.title === priority) {
                console.log("MATCH");
                return (
                    < Row onClick={handleShow} className='ptu-box side-action-box' >
                        <Col xs='auto' sm='auto' md='auto' lg='auto' style={{ backgroundColor: 'green' }} className='ptu-icon'>
                            <i className='fas fa-check' />
                        </Col>
                        <Col xs='auto' sm='auto' md='auto' lg='auto' className='ptu-info'>
                            {option.title}
                        </Col>
                    </Row >
                )
            } else if (option.title === type) {
                console.log("MATCH");
                return (
                    < Row onClick={handleShow} className='ptu-box side-action-box' >
                        <Col xs='auto' sm='auto' md='auto' lg='auto' style={{ backgroundColor: 'green' }} className='ptu-icon'>
                            <i className='fas fa-check' />
                        </Col>
                        <Col xs='auto' sm='auto' md='auto' lg='auto' className='ptu-info'>
                            {option.title}
                        </Col>
                    </Row >
                )
            }
        })
    )
    // < Row onClick = { handleShow } className = 'ptu-box side-action-box' >
    //     <Col xs='auto' sm='auto' md='auto' lg='auto' style={{ backgroundColor: 'green' }} className='ptu-icon'>
    //         <i className='fas fa-check' />
    //     </Col>
    //     <Col xs='auto' sm='auto' md='auto' lg='auto' className='ptu-info'>
    //         {option.title}
    //     </Col>
    //          </Row >


}

export default SideActions;