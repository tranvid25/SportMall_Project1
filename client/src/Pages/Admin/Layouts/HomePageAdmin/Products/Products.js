import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import { ModalAddProduct, ModalDeleteProduct, ModalEditProduct } from '../../../Modal/Modal';

const cx = classNames.bind(styles);

function Products({
    dataProducts,
    show,
    setShow,
    handleShowModalAddProduct,
    showModalDelete,
    setShowModalDelete,
    handleShowModalDeleteProduct,
    idProduct,
    handleShowModalEditProduct,
    showModalEdit,
    setShowModalEdit,
    setValueType,
    valueType,
}) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-product')}>
                <h1>Products</h1>
                <button onClick={handleShowModalAddProduct} type="button" className="btn btn-primary">
                    Add Product
                </button>
            </div>
            <div>
                <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setValueType(e.target.value)}
                >
                    <>
                        <option value="" selected>
                            Filter Products
                        </option>
                        <option value="shirt">Shirt</option>
                        <option value="pant">Pant</option>
                        <option value="shoes">Shoes</option>
                        <option value="sportsAccessories">Sports Accessories</option>
                        <option value="activewearMen">Men's Activewear</option>
                        <option value="activewearWomen">Women's Activewear</option>
                    </>
                </select>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ color: '#fff' }} scope="col">
                            ID
                        </th>
                        <th style={{ color: '#fff' }} scope="col">
                            Product Name
                        </th>
                        <th style={{ color: '#fff' }} scope="col">
                            Product Image
                        </th>
                        <th style={{ color: '#fff' }} scope="col">
                            Price
                        </th>
                        <th style={{ color: '#fff' }} scope="col">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {dataProducts
                        .filter((item) => valueType === '' || item.checkProducts === valueType)
                        .map((item) => (
                            <tr key={item._id}>
                                <th style={{ color: '#fff' }} scope="row">
                                    {item.id}
                                </th>
                                <td style={{ color: '#fff' }}>{item.nameProducts}</td>
                                <td style={{ color: '#fff' }}>
                                    <img
                                        style={{ width: '120px' }}
                                        src={`http://localhost:5000/${item.img}`}
                                        alt="."
                                    />
                                </td>
                                <td style={{ color: '#fff' }}>$ {item.priceNew.toLocaleString()}</td>
                                <td style={{ color: '#fff' }}>
                                    <button
                                        onClick={() => handleShowModalEditProduct(item.id)}
                                        type="button"
                                        className="btn btn-warning"
                                    >
                                        Edit Product
                                    </button>
                                    <button
                                        onClick={() => handleShowModalDeleteProduct(item.id)}
                                        type="button"
                                        className="btn btn-danger"
                                        style={{ marginLeft: '10px' }}
                                    >
                                        Delete Product
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <ModalAddProduct show={show} setShow={setShow} />
            <ModalDeleteProduct
                showModalDelete={showModalDelete}
                setShowModalDelete={setShowModalDelete}
                idProduct={idProduct}
            />
            <ModalEditProduct showModalEdit={showModalEdit} setShowModalEdit={setShowModalEdit} idProduct={idProduct} />
        </div>
    );
}

export default Products;
