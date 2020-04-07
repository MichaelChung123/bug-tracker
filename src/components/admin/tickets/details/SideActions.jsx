import React from 'react';
import { Row, Col, Accordion, Card } from 'react-bootstrap';

// Component used displaying the side actions and then allowing their subactions to show as an accordion
const SideActions = ({ action, priority, type, handleActionSelect, selectedPriorityBox, selectedTypeBox, prioritySelected, typeSelected }) => {
    const {
        title,
        subOptions
    } = action;

    return (
        subOptions.map((option, key) => {
            // CHECK PRIORITY
            if (option.title === priority) {
                return (
                    <Accordion key={key}>
                        {
                            !prioritySelected ?
                                <Accordion.Toggle as={Row} eventKey="0" className='ptu-box side-action-box'>
                                    <Col xs='auto' sm='auto' md='auto' lg='auto' style={{ backgroundColor: option.color }} className='ptu-icon'>
                                        <i className={option.iconClass} />
                                    </Col>
                                    <Col xs='auto' sm='auto' md='auto' lg='auto' className='ptu-info'>
                                        Priority
                                        <br />
                                        {option.title}
                                    </Col>
                                </Accordion.Toggle>
                                :
                                selectedPriorityBox
                        }

                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                {
                                    subOptions.map((subOption, key) => {
                                        let newPriorityBox = <></>;
                                        let actionValue = subOption.title;

                                        let selectedSubAction =
                                            <Accordion.Toggle onClick={() => handleActionSelect(title, actionValue, newPriorityBox)} key={key} as={Row} eventKey="0" className='ptu-box side-action-box'>
                                                <Col xs='auto' sm='auto' md='auto' lg='auto' style={{ backgroundColor: subOption.color }} className='ptu-icon'>
                                                    <i className={subOption.iconClass} />
                                                </Col>
                                                <Col xs='auto' sm='auto' md='auto' lg='auto' className='ptu-info'>
                                                    Priority
                                                    <br />
                                                    {subOption.title}
                                                </Col>
                                            </Accordion.Toggle>

                                        newPriorityBox = selectedSubAction;

                                        return (
                                            <Accordion.Toggle onClick={() => handleActionSelect(title, actionValue, newPriorityBox)} key={key} as={Row} eventKey="0" className='ptu-box side-action-box'>
                                                <Col xs='auto' sm='auto' md='auto' lg='auto' style={{ backgroundColor: subOption.color }} className='ptu-icon'>
                                                    <i className={subOption.iconClass} />
                                                </Col>
                                                <Col xs='auto' sm='auto' md='auto' lg='auto' className='ptu-info'>
                                                    {subOption.title}
                                                </Col>
                                            </Accordion.Toggle>
                                        );
                                    })
                                }
                            </Card.Body>
                        </Accordion.Collapse>
                    </Accordion>

                )
                // CHECK TYPE
            } else if (option.title === type) {
                return (

                    <Accordion key={key}>
                        {
                            !typeSelected ?
                                <Accordion.Toggle as={Row} eventKey="0" className='ptu-box side-action-box'>
                                    <Col xs='auto' sm='auto' md='auto' lg='auto' style={{ backgroundColor: option.color }} className='ptu-icon'>
                                        <i className={option.iconClass} />
                                    </Col>
                                    <Col xs='auto' sm='auto' md='auto' lg='auto' className='ptu-info'>
                                        Type
                                        <br />
                                        {option.title}
                                    </Col>
                                </Accordion.Toggle>
                                :
                                selectedTypeBox
                        }

                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                {
                                    subOptions.map((subOption, key) => {
                                        let newTypeBox = <></>;
                                        let actionValue = subOption.title;

                                        let selectedSubAction =
                                            <Accordion.Toggle onClick={() => handleActionSelect(title, actionValue, newTypeBox)} key={key} as={Row} eventKey="0" className='ptu-box side-action-box'>
                                                <Col xs='auto' sm='auto' md='auto' lg='auto' style={{ backgroundColor: subOption.color }} className='ptu-icon'>
                                                    <i className={subOption.iconClass} />
                                                </Col>
                                                <Col xs='auto' sm='auto' md='auto' lg='auto' className='ptu-info'>
                                                    Type
                                                    <br />
                                                    {subOption.title}
                                                </Col>
                                            </Accordion.Toggle>

                                        newTypeBox = selectedSubAction;

                                        return (
                                            <Accordion.Toggle onClick={() => handleActionSelect(title, actionValue, newTypeBox)} key={key} as={Row} eventKey="0" className='ptu-box side-action-box'>
                                                <Col xs='auto' sm='auto' md='auto' lg='auto' style={{ backgroundColor: subOption.color }} className='ptu-icon'>
                                                    <i className={subOption.iconClass} />
                                                </Col>
                                                <Col xs='auto' sm='auto' md='auto' lg='auto' className='ptu-info'>
                                                    {subOption.title}
                                                </Col>
                                            </Accordion.Toggle>
                                        );
                                    })
                                }
                            </Card.Body>
                        </Accordion.Collapse>
                    </Accordion>
                )
            }
        })
    )
}

export default SideActions;