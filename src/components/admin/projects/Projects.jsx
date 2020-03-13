import React, { Component } from 'react';
import { Row, Col, Container, Table, Form, FormControl, Button, Pagination } from 'react-bootstrap';
import '../../../styles/ProjectStyle.css';

/* 
    how to connect to database:
    1. psql -d bugtrackerdb -U me
*/

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    componentDidMount() {
        // fetch('/admin/Projects/all')
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then((data) => {

        //     }
    }

    render() {
        return (
            <h1>Projects</h1>
        )
    }
}

class ProjectList extends React.Component {
    render() {
        return
    }
}

export default Projects;

// import React from 'react';
// import SideBar from '../../sidebar/Sidebar';
// import { Col, Container } from 'react-bootstrap';
// import '../../../styles/style.css';

// const Projects = () => {
//     return (
//         <div>
//             <Container fluid='true'>
//                 <Col style={{paddingLeft: '0px'}} lg={3}>
//                     <SideBar />
//                 </Col>
//                 <Col lg={9}>
//                     <h1>Projects</h1>
//                 </Col>
//             </Container>
//         </div>
//     );
// }

// export default Projects;