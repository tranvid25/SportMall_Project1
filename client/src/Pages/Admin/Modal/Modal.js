import classNames from 'classnames/bind';
import styles from './Modal.module.scss';

import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import request from '../../../config/Connect';
import { toast, ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

export function ModalAddProduct({ show, setShow }) {
    const handleClose = () => setShow(false);

    const [nameProduct, setNameProduct] = useState('');
    const [priceProduct, setPriceProduct] = useState(0);
    const [desProduct, setDesProduct] = useState('');
    const [fileImg, setFileImg] = useState('');
    const [selectedCheckbox, setSelectedCheckbox] = useState('');

    const [checkOption, setCheckOption] = useState('0');
    const [checkType, setCheckType] = useState('');
    const [quantityPro, setQuantityPro] = useState(0);

    const handleCheckboxChange = (checkboxName) => {
        if (selectedCheckbox === checkboxName) {
            setSelectedCheckbox('');
        } else {
            setSelectedCheckbox(checkboxName);
        }
    };

    const handleAddProduct = async () => {
        const formData = new FormData();
        formData.append('imgpro', fileImg);

        const checkProduct = selectedCheckbox || (checkOption === '1' ? 'activewearMen' : 'activewearWomen');

        try {
            if (!nameProduct || !priceProduct || !desProduct || quantityPro === 0 || !fileImg) {
                toast.error('Please fill in all the information!');
                return;
            }

            formData.append('nameProduct', nameProduct);
            formData.append('priceProduct', priceProduct);
            formData.append('desProduct', desProduct);
            formData.append('checkProduct', checkProduct);
            formData.append('checkType', checkType);
            formData.append('quantityPro', quantityPro);

            const res = await request.post('/api/addproduct', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success(res.data.message);
            await request.get('/api/products');
        } catch (error) {
            toast.error('An error occurred!');
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <ToastContainer />
                <Modal.Header closeButton>
                    <Modal.Title>Add product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Product name
                        </span>
                        <input type="text" className="form-control" onChange={(e) => setNameProduct(e.target.value)} />
                    </div>

                    <div>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">
                                Choose product image
                            </label>
                            <input
                                className="form-control"
                                type="file"
                                id="formFile"
                                onChange={(e) => setFileImg(e.target.files[0])}
                            />
                        </div>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Product cost
                        </span>
                        <input
                            type="number"
                            className="form-control"
                            onChange={(e) => setPriceProduct(parseFloat(e.target.value))}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <div className="form-floating">
                            <textarea
                                className="form-control"
                                placeholder="Leave a comment here"
                                id="floatingTextarea2"
                                style={{ height: '150px' }}
                                onChange={(e) => setDesProduct(e.target.value)}
                            ></textarea>
                            <label htmlFor="floatingTextarea2">Product description</label>
                        </div>
                    </div>

                    <div className={cx('option')}>
                        <div className={cx('form-checkbox')}>
                            <label>shirt</label>
                            <input
                                type="checkbox"
                                checked={selectedCheckbox === 'shirt'}
                                onChange={() => handleCheckboxChange('shirt')}
                            />
                        </div>

                        <div className={cx('form-checkbox')}>
                            <label>pant</label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('pant')}
                                checked={selectedCheckbox === 'pant'}
                            />
                        </div>

                        <div className={cx('form-checkbox')}>
                            <label>shoes</label>
                            <input
                                type="checkbox"
                                checked={selectedCheckbox === 'shoes'}
                                onChange={() => handleCheckboxChange('shoes')}
                            />
                        </div>
                    </div>

                    {selectedCheckbox === '' && (
                        <div>
                            <select
                                onChange={(e) => setCheckOption(e.target.value)}
                                className="form-select mt-3"
                                aria-label="Default select example"
                            >
                                <option value="0">Thời Trang</option>
                                <option value="1">Thời Trang Nam</option>
                                <option value="2">Thời Trang Nữ</option>
                            </select>
                        </div>
                    )}

                    {checkOption === '1' && (
                        <div>
                            <select
                                onChange={(e) => setCheckType(e.target.value)}
                                className="form-select mt-3"
                                aria-label="Default select example"
                            >
                                <option value="">Loại</option>
                                <option value="trousers">Áo</option>
                                <option value="shirt">Quần</option>
                                <option value="giay">Giày Nam</option>
                            </select>
                        </div>
                    )}

                    {checkOption === '2' && (
                        <div>
                            <select
                                onChange={(e) => setCheckType(e.target.value)}
                                className="form-select mt-3"
                                aria-label="Default select example"
                            >
                                <option value="">Loại</option>
                                <option value="trousers">Áo</option>
                                <option value="shirt">Quần</option>
                                <option value="dress">Váy</option>
                                <option value="giay">Giày Nữ</option>
                            </select>
                        </div>
                    )}

                    <div>
                        <div className="form-floating mt-3">
                            <input
                                onChange={(e) => setQuantityPro(parseInt(e.target.value))}
                                type="number"
                                className="form-control"
                                id="floatingInput"
                            />
                            <label htmlFor="floatingInput">Product amount</label>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddProduct}>
                        Add product
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export function ModalDeleteProduct({ showModalDelete, setShowModalDelete, idProduct }) {
    const handleClose = () => setShowModalDelete(false);

    const handleDeleteProduct = async () => {
        try {
            const res = await request.post('/api/deleteproduct', { id: idProduct });
            toast.success(res.data.message);
        } catch (error) {}
    };

    return (
        <div>
            <Modal show={showModalDelete} onHide={handleClose}>
                <ToastContainer />
                <Modal.Header closeButton>
                    <Modal.Title>Delete product</Modal.Title>
                </Modal.Header>
                <Modal.Body>You want to delete product that have ID : {idProduct}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDeleteProduct}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export function ModalEditProduct({ setShowModalEdit, showModalEdit, idProduct }) {
    const handleClose = () => setShowModalEdit(false);
    const [nameProduct, setNameProduct] = useState('');
    const [imgProduct, setImgProduct] = useState(null);
    const [priceProduct, setPriceProduct] = useState(0);
    const [desProduct, setDesProduct] = useState('');
    const [valueProduct, setValueProduct] = useState('');
    const [selectedCheckbox, setSelectedCheckbox] = useState('');
    const [checkOption, setCheckOption] = useState('0');
    const [checkType, setCheckType] = useState('');
    const [quantityPro, setQuantityPro] = useState(0);

    useEffect(() => {
        if (showModalEdit) {
            const fetchData = async () => {
                try {
                    const res = await request.get(`/api/getproduct`, { params: { id: idProduct } });
                    const data = res.data;
                    setNameProduct(data.nameProducts);
                    setPriceProduct(data.priceNew);
                    setDesProduct(data.des);
                    setValueProduct(data.quantityPro);
                    setSelectedCheckbox(data.checkProducts);
                    setCheckOption(data.checkOption);
                    setCheckType(data.checkType);
                    setQuantityPro(data.quantityPro);
                } catch (error) {
                    toast.error('Error');
                }
            };
            fetchData();
        }
    }, [showModalEdit, idProduct]);

    const handleCheckboxChange = (checkboxName) => {
        if (selectedCheckbox === checkboxName) {
            setSelectedCheckbox('');
        } else {
            setSelectedCheckbox(checkboxName);
        }
    };

    const handleEditProduct = async () => {
        const checkProduct = selectedCheckbox || (checkOption === '1' ? 'activewearMen' : 'activewearWomen');
        const formData = new FormData();
        formData.append('nameProduct', nameProduct);
        formData.append('imgpro', imgProduct);
        formData.append('priceProduct', priceProduct);
        formData.append('desProduct', desProduct);
        formData.append('valueProduct', valueProduct);
        formData.append('id', idProduct);
        formData.append('checkProduct', checkProduct);
        formData.append('checkType', checkType);
        formData.append('quantityPro', quantityPro);

        try {
            const res = await request.post('/api/editproduct', formData);
            toast.success(res.data.message);
        } catch (error) {
            toast.error('Error');
        }
    };

    return (
        <div>
            <Modal show={showModalEdit} onHide={handleClose}>
                <ToastContainer />
                <Modal.Header closeButton>
                    <Modal.Title>Edit product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label className="mb-3">Enter info that need edit</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Product name
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            value={nameProduct}
                            onChange={(e) => setNameProduct(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Choose product image</label>
                        <input
                            className="form-control"
                            type="file"
                            onChange={(e) => setImgProduct(e.target.files[0])}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Product cost
                        </span>
                        <input
                            type="number"
                            className="form-control"
                            value={priceProduct}
                            onChange={(e) => setPriceProduct(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <div className="form-floating">
                            <textarea
                                className="form-control"
                                placeholder="Leave a comment here"
                                style={{ height: '150px' }}
                                value={desProduct}
                                onChange={(e) => setDesProduct(e.target.value)}
                            ></textarea>
                            <label>Product description</label>
                        </div>
                    </div>
                    <div className={cx('option')}>
                        <div className={cx('form-checkbox')}>
                            <label>shirt</label>
                            <input
                                type="checkbox"
                                checked={selectedCheckbox === 'shirt'}
                                onChange={() => handleCheckboxChange('shirt')}
                            />
                        </div>
                        <div className={cx('form-checkbox')}>
                            <label>pant</label>
                            <input
                                type="checkbox"
                                checked={selectedCheckbox === 'pant'}
                                onChange={() => handleCheckboxChange('pant')}
                            />
                        </div>
                        <div className={cx('form-checkbox')}>
                            <label>shoes</label>
                            <input
                                type="checkbox"
                                checked={selectedCheckbox === 'shoes'}
                                onChange={() => handleCheckboxChange('shoes')}
                            />
                        </div>
                    </div>
                    <div>
                        <select
                            value={checkOption}
                            onChange={(e) => setCheckOption(e.target.value)}
                            className="form-select mt-3"
                            aria-label="Default select example"
                        >
                            <option value="0">Thời Trang</option>
                            <option value="1">Thời Trang Nam</option>
                            <option value="2">Thời Trang Nữ</option>
                        </select>
                    </div>
                    {checkOption === '1' && (
                        <div>
                            <select
                                value={checkType}
                                onChange={(e) => setCheckType(e.target.value)}
                                className="form-select mt-3"
                                aria-label="Default select example"
                            >
                                <option value="">Loại</option>
                                <option value="trousers">Áo</option>
                                <option value="shirt">Quần</option>
                                <option value="giay">Giày Nam</option>
                            </select>
                        </div>
                    )}
                    {checkOption === '2' && (
                        <div>
                            <select
                                value={checkType}
                                onChange={(e) => setCheckType(e.target.value)}
                                className="form-select mt-3"
                                aria-label="Default select example"
                            >
                                <option value="">Loại</option>
                                <option value="trousers">Áo</option>
                                <option value="shirt">Quần</option>
                                <option value="dress">Váy</option>
                                <option value="giay">Giày Nữ</option>
                            </select>
                        </div>
                    )}
                    <div className="form-floating mt-3">
                        <input
                            type="number"
                            className="form-control"
                            value={quantityPro}
                            onChange={(e) => setQuantityPro(e.target.value)}
                        />
                        <label>Product amount</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditProduct}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export function ModalAddBlog({ show, setShow }) {
    const handleClose = () => setShow(false);

    const [img, setImg] = useState('');
    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');

    const formData = new FormData();
    formData.append('img', img);
    formData.append('title', title);
    formData.append('des', des);

    const handleAddBlog = async () => {
        try {
            const res = await request.post('/api/addblog', formData);
            toast.success(res.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <ToastContainer />
                <Modal.Header closeButton>
                    <Modal.Title>Add blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div class="mb-3">
                            <label for="formFile" class="form-label">
                                Choose blog image
                            </label>
                            <input
                                class="form-control"
                                type="file"
                                id="formFile"
                                onChange={(e) => setImg(e.target.files[0])}
                            />
                        </div>
                    </div>

                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name Blog"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Description"
                            onChange={(e) => setDes(e.target.value)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddBlog}>
                        Add blog
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export function CheckProduct({ show, setShow, idProduct }) {
    const handleClose = () => setShow(false);

    const handleCheckProduct = async () => {
        try {
            const res = await request.post('/api/checkproduct', { idProduct });
            toast.success(res.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <ToastContainer />
                <Modal.Header closeButton>
                    <Modal.Title>Order approval </Modal.Title>
                </Modal.Header>
                <Modal.Body>Order approval to : {idProduct}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCheckProduct}>
                        Accept
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export function ModalEditOrder({ show, setShow, id }) {
    const handleClose = () => setShow(false);

    const [valueTest, setValueTest] = useState('0');
    const [valueTest1, setValueTest1] = useState('0');

    const handleEditOrder = () => {
        request.post('/api/editorder', { valueTest, id, valueTest1 }).then((res) => {
            toast.success(res.data.message);
        });
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit the order </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <select
                        onChange={(e) => setValueTest(e.target.value)}
                        className="form-select mb-3"
                        aria-label="Default select example"
                    >
                        <option selected>Order status</option>
                        <option value="1">Delivering</option>
                        <option value="2">Delivered</option>
                    </select>

                    <select
                        onChange={(e) => setValueTest1(e.target.value)}
                        className="form-select"
                        aria-label="Default select example"
                    >
                        <option selected>Payment status</option>
                        <option value="1">Unpaid</option>
                        <option value="2">Paidn</option>
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditOrder}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export function ModalEditUser({ show, setShow, email }) {
    const [valueSelect, setValueSelect] = useState('0');

    const handleEditUser = async () => {
        try {
            const res = await request.post('/api/edituser', { valueSelect, email });
            toast.success(res.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose}>
            <ToastContainer />
            <Modal.Header closeButton>
                <Modal.Title>Edit permission </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <select
                    onChange={(e) => setValueSelect(e.target.value)}
                    className="form-select"
                    aria-label="Default select example"
                >
                    <option selected>Choose permission</option>
                    <option value="1">User</option>
                    <option value="2">Employee</option>
                    <option value="3">Admin</option>
                </select>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleEditUser}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export function EditBlog({ show, setShow, id }) {
    const handleClose = () => setShow(false);

    const [imgBlog, setImgBlog] = useState('');
    const [titleBlog, setTitleBlog] = useState('');
    const [desBlog, setDesBlog] = useState('');

    const formData = new FormData();
    formData.append('imgBlog', imgBlog);
    formData.append('titleBlog', titleBlog);
    formData.append('desBlog', desBlog);
    formData.append('id', id);

    const handleEditBlog = () => {
        request.post('/api/editblog', formData, id).then((res) => {
            toast.success(res.data.message);
        });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <ToastContainer />
            <Modal.Header closeButton>
                <Modal.Title>Edit blog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div class="mb-3">
                        <label for="formFile" class="form-label">
                            Choose blog image
                        </label>
                        <input
                            class="form-control"
                            type="file"
                            id="formFile"
                            onChange={(e) => setImgBlog(e.target.files[0])}
                        />
                    </div>
                </div>
                <div class="form-floating mb-3">
                    <input
                        type="text"
                        class="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        onChange={(e) => setTitleBlog(e.target.value)}
                    />
                    <label for="floatingPassword">Blog name</label>
                </div>
                <div class="form-floating">
                    <input
                        type="text"
                        class="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        onChange={(e) => setDesBlog(e.target.value)}
                    />
                    <label for="floatingPassword">Blog description</label>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleEditBlog}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
