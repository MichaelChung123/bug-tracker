import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SelectDemoUser extends Component {
    render() {
        return (
            <div className='select-user-container'>
                <Link to='/admin/dashboard'>
                    <button>Admin</button>
                </Link>
                <Link to='/user/dashboard'>
                    <button>User</button>
                </Link>
            </div>
        );
    }
}

export default SelectDemoUser;
