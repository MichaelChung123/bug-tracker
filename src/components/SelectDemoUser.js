import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SelectDemoUser extends Component {
    render() {
        return (
            <div className='select-user-container'>
                <Link to='/demo/admin/home/index'>
                    <button>Admin</button>
                </Link>
                <Link to='/demo/user/home/index'>
                    <button>User</button>
                </Link>
            </div>
        );
    }
}

export default SelectDemoUser;
