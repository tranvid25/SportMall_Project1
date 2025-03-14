import classNames from 'classnames/bind';
import styles from './SlideBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog, faCartPlus, faChartLine, faFile, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';

const cx = classNames.bind(styles);

function SlideBar({ setActiveList }) {
    const [checkType, setCheckType] = useState(0);
    
    // Get the user data from the JWT token
    const token = document.cookie;
    const checkUser = jwtDecode(token);
    
    // Extract admin and employee status for easier access
    const isAdmin = checkUser.admin;
    const isEmployee = checkUser.employee;

    // Handle the active list state change
    const handleActiveList = (data, type) => {
        setCheckType(type);
        setActiveList(data);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('controller')}>
                <ul>
                    {/* Home page link */}
                    <li id={cx(checkType === 0 ? 'active' : '')} onClick={() => handleActiveList('dash', 0)}>
                        <FontAwesomeIcon id={cx('icons')} icon={faHome} />
                        <h5>Home</h5>
                    </li>

                    {/* Order page link visible to admin or employee */}
                    {(isAdmin || isEmployee) && (
                        <li id={cx(checkType === 1 ? 'active' : '')} onClick={() => handleActiveList('order', 1)}>
                            <FontAwesomeIcon id={cx('icons')} icon={faFile} />
                            <h5>Orders</h5>
                        </li>
                    )}

                    {/* Product and Customer links only visible to admin */}
                    {isAdmin && (
                        <>
                            <li id={cx(checkType === 2 ? 'active' : '')} onClick={() => handleActiveList('product', 2)}>
                                <FontAwesomeIcon id={cx('icons')} icon={faCartPlus} />
                                <h5>Products</h5>
                            </li>

                            <li id={cx(checkType === 3 ? 'active' : '')} onClick={() => handleActiveList('customer', 3)}>
                                <FontAwesomeIcon id={cx('icons')} icon={faUser} />
                                <h5>Users</h5>
                            </li>
                        </>
                    )}

                    {/* Blog page link visible to admin or employee */}
                    {(isAdmin || isEmployee) && (
                        <li id={cx(checkType === 5 ? 'active' : '')} onClick={() => handleActiveList('blog', 5)}>
                            <FontAwesomeIcon id={cx('icons')} icon={faBlog} />
                            <h5>Blog Posts</h5>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default SlideBar;
