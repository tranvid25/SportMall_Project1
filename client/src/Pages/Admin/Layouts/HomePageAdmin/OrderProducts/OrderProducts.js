import { useEffect, useState } from 'react';

import request from '../../../../../config/Connect';
import { CheckProduct, ModalEditOrder } from '../../../Modal/Modal';
import classNames from 'classnames/bind';
import styles from './OderProducts.module.scss';

const cx = classNames.bind(styles);

function OrderProducts() {
    const [dataOrder, setDataOrder] = useState([]);
    const [show, setShow] = useState(false);
    const [idProduct, setIdProduct] = useState(false);
    const [id, setId] = useState('');

    useEffect(() => {
        request.get('/api/getorder').then((res) => setDataOrder(res.data));
    }, [show]);

    const handleShowModal = (id1) => {
        setShow(!show);
        setId(id1);
    };

    return (
        <div className={cx('wrapper')}>
            <h1>Orders</h1>
            {dataOrder.map((item) => (
                <table className="table table-bordered border-primary">
                    <thead>
                        <tr>
                            <th style={{ color: '#fff' }} scope="col">
                                Email User
                            </th>
                            <th style={{ color: '#fff' }} scope="col">
                                Product Name
                            </th>
                            <th style={{ color: '#fff' }} scope="col">
                                Status
                            </th>
                            <th style={{ color: '#fff' }} scope="col">
                                State
                            </th>
                            <th style={{ color: '#fff' }} scope="col">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ color: '#fff' }}>{item.email}</td>
                            <td style={{ display: 'flex', flexDirection: 'column', color: '#fff' }}>
                                {item?.products.map((item2) => (
                                    <td>{item2.nameProduct}</td>
                                ))}
                            </td>
                            <td style={{ color: '#fff' }}>{item.statusOrder ? 'Delivered' : 'Delivering'}</td>
                            <td style={{ color: '#fff' }}>{item.statusPayment ? 'Paid' : 'Unpaid'}</td>
                            <td style={{ color: '#fff' }}>
                                <button
                                    onClick={() => handleShowModal(item._id)}
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            ))}
            <CheckProduct show={show} setShow={setShow} idProduct={idProduct} />
            <ModalEditOrder show={show} setShow={setShow} id={id} />
        </div>
    );
}

export default OrderProducts;
