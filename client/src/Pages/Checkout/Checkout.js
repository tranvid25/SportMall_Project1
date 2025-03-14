import classNames from 'classnames/bind';
import styles from './Checkout.module.scss';

import Header from '../../Layouts/Header/Header';
import Footer from '../../Layouts/Footer/Footer';
import Banner from '../Layouts/Banner/Banner';
import request from '../../config/Connect';

import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../Layouts/Loading/Loading';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Checkout() {
    const [dataCart, setDataCart] = useState({});
    const [checkBox, setCheckBox] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [firstName, setFirsName] = useState('');
    const [lastName, setLastName] = useState('');

    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [addressLine1, setAddressLine1] = useState('');

    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');

    const navigate = useNavigate();

    const token = document.cookie;

    const dataAddress = { firstName, lastName, phoneNumber, email, country, addressLine1, city };

    useEffect(() => {
        if (token) {
            request.get('/api/getcart').then((res) => res.data.map((item) => setDataCart(item)));
        }
    }, [token]);

    const handlePaymentMomo = async () => {
        var pattern = /@/;
        const checkEmail = pattern.test(email);

        const phoneRegex = /^[0-9]{10}$/;
        const checkPhone = phoneRegex.test(phoneNumber);
        if (
            checkBox === false ||
            firstName === '' ||
            lastName === '' ||
            phoneNumber === '' ||
            email === '' ||
            country === '' ||
            addressLine1 === '' ||
            city === '' ||
            zip === ''
        ) {
            toast.error('Please accept our terms and conditions, otherwise you are missing information.');
        } else if (!checkEmail || !checkPhone) {
            // Check email
            toast.error('Email or Phone Number is not in the correct format!!!');
        } else if (!dataCart) {
            toast.error('Please go back to the shopping page!!!');
        } else {
            try {
                setIsLoading(true);
                const res = await request.post('/api/paymentmomo', {
                    dataAddress,
                });
                if (res) {
                    setIsLoading(false);
                    toast.success(res.data.message);

                    window.open(res.data);
                    navigate('/thanks');
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    };

    const handlePayment = async () => {
        var pattern = /@/;
        const checkEmail = pattern.test(email);

        const phoneRegex = /^[0-9]{10}$/;
        const checkPhone = phoneRegex.test(phoneNumber);
        if (
            checkBox === false ||
            firstName === '' ||
            lastName === '' ||
            phoneNumber === '' ||
            email === '' ||
            country === '' ||
            addressLine1 === '' ||
            city === '' ||
            zip === ''
        ) {
            toast.error('Please accept our terms and conditions, otherwise you are missing information.');
        } else if (!checkEmail || !checkPhone) {
            // Check email
            toast.error('Email or Phone Number is not in the correct format!!!');
        } else if (!dataCart) {
            toast.error('Please go back to the shopping page!!!');
        } else {
            request.post('/api/payment').then((res) => console.log(res.data));
            navigate('/thanks');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <header>
                <Header />
            </header>

            <Loading isLoading={isLoading} />

            <div>
                <Banner />
            </div>

            <main className={cx('inner')}>
                <div className={cx('inner-checkout')}>
                    <div className={cx('column-billing')}>
                        <h1 id={cx('title-billing')}>Payment Information</h1>
                        <div className={cx('input-name')}>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your first name"
                                    onChange={(e) => setFirsName(e.target.value)}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your last name"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={cx('input-name')}>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Phone number"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Your email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Province/City"
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        <div></div>
                        <div className="mt-5">
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Shipping address"
                                    onChange={(e) => setAddressLine1(e.target.value)}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="District/County"
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>

                            <div className="input-group mb-3 mt-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ward/Commune/Town"
                                    onChange={(e) => setZip(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={cx('form-order')}>
                        <div className={cx('inner-order')}>
                            <h1 id={cx('title-order')}>Payment Products</h1>

                            <div>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataCart?.products?.map((item) => (
                                            <tr key={item?._id}>
                                                <td>{item?.nameProduct}</td>
                                                <td>x {item?.quantity}</td>
                                                <td>$ {item.price?.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>

                                    <tbody>
                                        <tr>
                                            <td>Provisional Total</td>
                                            <td></td>
                                            <td>$ {dataCart?.sumPrice?.toLocaleString()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={cx('form-pay')}>
                                <div className={cx('checkbox-terms')}>
                                    <input onChange={(e) => setCheckBox(e.target.checked)} type="checkbox" />
                                    <label>Please accept our terms and conditions</label>
                                </div>

                                { <div className={cx('payment-momo')}>
                                    <button onClick={handlePaymentMomo}>
                                        <img
                                            src={
                                                'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png'
                                            }
                                            alt=""
                                        />
                                        <span>Buy product livestream</span>
                                    </button>
                                </div> }

                                <div className={cx('continue')}>
                                    <button onClick={handlePayment}>
                                        <Link style={{ textDecoration: 'none', color: 'white' }}>
                                            <span>Cash on Delivery</span>
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Checkout;
