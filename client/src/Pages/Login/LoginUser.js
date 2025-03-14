import classNames from 'classnames/bind';
import styles from './LoginUser.module.scss';
import Header from '../../Layouts/Header/Header';

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import request from '../../config/Connect';
import { toast, ToastContainer } from 'react-toastify';

import { jwtDecode } from 'jwt-decode';

const cx = classNames.bind(styles);

function LoginUser() {
    const [email, setEmail] = useState(''); // Create state to store email
    const [password, setPassword] = useState(''); // Create state to store password
    const navigate = useNavigate(); // Create state to navigate
    const handleLoginUser = async () => {
        // Function to handle login
        var pattern = /[A-Z]/; // Check if the string contains uppercase letters
        const test = pattern.test(email);
        if (email === '' || password === '' || test === true) {
            // Check email and password validity
            toast.error('Please check the information!!!'); // Display error toast
        } else {
            try {
                // Execute login
                const res = await request.post('/api/login', {
                    // Send login request to the server
                    email, // Send email and password for login
                    password,
                });
                // navigate('/'); // Redirect to home page
                const token = document.cookie;

                const decoded = jwtDecode(token);
                if (decoded.admin === true) {
                    navigate('/admin');
                } else if (decoded.employee === true) {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            } catch (error) {
                // If login fails
                toast.error(error.response.data.message); // Display error message
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <header>
                <Header />
            </header>
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('header-form-login')}>
                        <span>Login</span>
                        <p>Enter login details to get access</p>
                    </div>
                    <div className={cx('input-box')}>
                        <div className={cx('form-input')}>
                            <label>Username or Email Address</label>
                            <input placeholder="Username / Email address" onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className={cx('form-input')}>
                            <label>Password</label>
                            <input
                                placeholder="Enter Password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className={cx('single-input-fields')}>
                            <div>
                                <input type="checkbox" />
                                <label>Keep me logged in</label>
                            </div>

                            <div>
                                <Link to="/forgot-password">Forgot Password?</Link>
                            </div>
                        </div>
                    </div>
                    <div className={cx('login-footer')}>
                        <p>
                            Don’t have an account?{' '}
                            <Link id={cx('link')} to="/register">
                                Sign Up
                            </Link>{' '}
                            here
                        </p>
                        <button onClick={handleLoginUser}>Login</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginUser;
