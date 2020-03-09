import React, { Component } from 'react';
import SideBar from '../sidebar/Sidebar';
import TopNav from '../navbar/TopNav';
import { Row, Col, Container } from 'react-bootstrap';
import '../../styles/DashboardStyle.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoItems: [
                {
                    path: '/demo/admin/projects',
                    color: '#007bff',
                    name: 'Projects',
                    count: '5',
                    iconClass: 'fas fa-edit',
                    key: 1
                },
                {
                    path: '/demo/admin/tickets',
                    color: '#dc3545',
                    name: 'Tickets',
                    count: '5',
                    iconClass: 'fas fa-ticket-alt',
                    key: 2
                },
                {
                    path: '/demo/admin/users',
                    color: '#28a745',
                    name: 'Users',
                    count: '5',
                    iconClass: 'fas fa-male',
                    key: 3
                }
            ]
        }
    }

    render() {
        const { infoItems } = this.state;
        return (
            <Container className='main-content'>
                <Row className='main-content-title'>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <h1>Your Dashboard</h1>
                    </Col>
                </Row>
                <Row className='main-content-ptu-block'>
                    {
                        infoItems.map((item) => {
                            return (
                                <PtuBlock
                                    path={item.path}
                                    color={item.color}
                                    name={item.name}
                                    count={item.count}
                                    iconClass={item.iconClass}
                                    key={item.key}
                                />
                            );
                        })
                    }
                </Row>
            </Container>
        );
    }
}

class PtuBlock extends React.Component {
    render() {
        return (
            <Col xs={4} sm={4} md={4} lg={4}>
                <Row fluid='true' className='ptu-box'>
                    <Col xs={3} sm={3} md={3} lg={3} style={{ backgroundColor: this.props.color }} className='ptu-icon'>
                        <i className={this.props.iconClass} />
                    </Col>
                    <Col xs={9} sm={9} md={9} lg={9} className='ptu-info'>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12}>
                                <label>{this.props.name}</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12}>
                                <label>{this.props.count}</label>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        );
    }
}

export default Dashboard;