import React from 'react';
import { Pagination } from 'react-bootstrap';

class Page extends React.Component {
    handleClick = () => {
        const { number, pageClick, type } = this.props;
        pageClick(number, type);
    }

    render() {
        return (
            <Pagination.Item key={this.props.number} onClick={this.handleClick} active={this.props.number === this.props.active}>
                {this.props.number}
            </Pagination.Item>
        );
    }
}

export default Page;