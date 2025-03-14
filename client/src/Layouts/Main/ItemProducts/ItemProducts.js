import classNames from 'classnames/bind';
import styles from './ItemProducts.module.scss';

import img1 from './img/items1.jpg';
import img2 from './img/items2.jpg';
import img3 from './img/items3.jpg';
import img4 from './img/items4.jpg';
const cx = classNames.bind(styles);

function ItemProducts() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('row-product')}>
                <img id={cx('img-item')} src={img1} alt="" />
                <span>Sports Shoes</span>
            </div>

            <div className={cx('row-product')}>
                <img id={cx('img-item')} src={img2} alt="" />
                <span>Training Outfit</span>
            </div>

            <div className={cx('row-product')}>
                <img id={cx('img-item')} src={img3} alt="" />
                <span>Sports pant</span>
            </div>
            <div className={cx('row-product')}>
                <img id={cx('img-item')} src={img4} alt="" />
                <span>Sports shirt</span>
            </div>
        </div>
    );
}

export default ItemProducts;
