import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
    render() {
        return (
            <div>
                <form>
                    <input type='text' placeholder='Email' />
                    <input type='text' placeholder='Password' />
                    <input type='submit' />
                </form>

                <ul>
                    <Link to='/demo-user'>
                        <li>Sign in as demo user</li>
                    </Link>
                </ul>
            </div>
        );
    }
}

export default Login;
