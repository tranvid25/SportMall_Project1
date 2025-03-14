import classNames from 'classnames/bind';
import styles from './Slidebar.module.scss';

const cx = classNames.bind(styles);

function SlideBar({ setValueType, setCheckPrice, valueType, setCheckType2, setCheckType3 }) {
    const handleOnchange = (e) => {
        setValueType(e);
        if (e === 'shirt' || e === 'pant' || e === 'shoes' || e === 'sportsAccessories') {
            setCheckType2('');
            setCheckType3('');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('select-option')}>
                <div>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => handleOnchange(e.target.value)}
                    >
                        <>
                            <option value="" selected>
                                Filter product
                            </option>
                            <option value="shirt">Shirt</option>
                            <option value="pant">Pant</option>
                            <option value="sportsAccessories">Sports Accessories</option>
                            <option value="activewearMen">Men's Activewear</option>
                            <option value="activewearWomen">Women's Activewear</option>
                        </>
                    </select>
                </div>
            </div>
            {valueType === 'activewearMen' ? (
                <div className={cx('select-option')}>
                    <div>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            onChange={(e) => setCheckType2(e.target.value)}
                        >
                            <>
                                <option value="" selected>
                                    Classification
                                </option>
                                <option value="trousers">Men's Shirt</option>
                                <option value="shirt">Men's Pants</option>
                                <option value="shoes">Men's Shoes</option>
                            </>
                        </select>
                    </div>
                </div>
            ) : (
                <></>
            )}

            {valueType === 'activewearWomen' ? (
                <div className={cx('select-option')}>
                    <div>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            onChange={(e) => setCheckType3(e.target.value)}
                        >
                            <>
                                <option value="" selected>
                                    Classification
                                </option>
                                <option value="trousers">Women's Shirt</option>
                                <option value="shirt">Women's Pants</option>
                                <option value="shoes">Women's Shoes</option>
                            </>
                        </select>
                    </div>
                </div>
            ) : (
                <></>
            )}

            <div className={cx('select-option')}>
                <div>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => setCheckPrice(e.target.value)}
                    >
                        <>
                            <option value="" selected>
                                Filter cost
                            </option>
                            <option value="1">Price from high to low</option>
                            <option value="2">Price from low to high</option>
                        </>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default SlideBar;
