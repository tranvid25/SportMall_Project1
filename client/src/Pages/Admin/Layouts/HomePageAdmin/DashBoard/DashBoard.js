import classNames from 'classnames/bind';
import styles from './DashBoard.module.scss';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faChartSimple, faUser } from '@fortawesome/free-solid-svg-icons';

import request from '../../../../../config/Connect';

import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const cx = classNames.bind(styles);

function Dashboard() {
    const [dataUser, setDataUser] = useState({});
    const [chartData, setChartData] = useState({
        labels: [], // Dates
        datasets: [
            {
                label: 'Revenue (VND)',
                data: [], // Daily revenue data
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
            },
        ],
    });
    const [lengthUser, setLengthUser] = useState(0);
    const [sumPrice, setSumPrice] = useState(0);

    useEffect(() => {
        // Fetch user info
        request.get('/api/auth/me').then((res) => setDataUser(res.data.dataUser));

        // Fetch 7-day stats from API
        request.get('/api/test').then((res) => {
            const responseData = res.data.result; // Data returned from API
            const labels = responseData.map((item) => item.date); // Array of dates
            const data = responseData.map((item) => item.totalRevenue); // Array of revenue
            setLengthUser(res.data.lengthUser);
            const newSumPrice = data.reduce((total, item) => total + item, 0);
            setSumPrice(newSumPrice);
            // Update chartData
            setChartData((prev) => ({
                ...prev,
                labels: labels,
                datasets: [
                    {
                        ...prev.datasets[0],
                        data: data,
                    },
                ],
            }));
        });
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '7-Day Revenue Stats',
            },
        },
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('statistics')}>
                <div className={cx('chart-line')}>
                    <div className={cx('box-1')}>
                        <h4>Total Revenue in Last 7 Days</h4>
                        <FontAwesomeIcon icon={faChartSimple} />
                        <span>{sumPrice.toLocaleString()} VND</span>
                    </div>
                    <div className={cx('box-3')}>
                        <h4>Total Users</h4>
                        <FontAwesomeIcon icon={faUser} />
                        <span>{lengthUser} Users</span>
                    </div>
                </div>
                <div className={cx('user-info')} style={{ display: 'flex',marginLeft:"30px",gap:'20px' }}>
                    <img
                        src={`http://localhost:5000/avatars/${dataUser?.avatar}`}
                        alt="Avatar"
                        style={{ width: '100px' }}
                    />
                    <div
                        className={cx('info')}
                        style={{ width: '30%', color: 'white', display: 'flex', flexDirection: 'column' }}
                    >
                        <h2>{dataUser?.fullname}</h2>
                        <span>0{dataUser?.phone}</span>
                        <span>{dataUser?.email}</span>
                        <span>Role: {dataUser.isAdmin ? 'Admin' : 'Employee'}</span>
                    </div>
                </div>
            </div>

            <div className={cx('chart-line-2')}>
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
}

export default Dashboard;
