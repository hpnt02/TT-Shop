import React from 'react';
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
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import classNames from 'classnames/bind';
import styles from './ChartLine.module.scss';
import moment from 'moment';
const cx = classNames.bind(styles);
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels, // Register the plugin
);

const DinhDangTien = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

const options = {
    responsive: true,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    plugins: {
        // Disable data labels
        datalabels: {
            display: false,
        },
        tooltip: {
            callbacks: {
                label: (tooltipItem) => {
                    return `${tooltipItem.label}: ${DinhDangTien(tooltipItem.raw)}đ`; // Hiển thị nhãn
                },
            },
        },
    },
    scales: {
        y: {
            type: 'linear',
            position: 'left',
        },
    },
};

function ChartLine({ dataChart }) {
    const data = {
        labels: dataChart.map((item) => moment(item.createAt).local().format('DD/MM/YYYY')),
        datasets: [
            {
                label: 'Số tiền đã chi(đ)',
                data: dataChart.map((item) => item.ThanhTien),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    return (
        <div className={cx('chart-DT')}>
            <span className={cx('chart-title')}>Mức chi tiêu của 30 đơn hàng gần nhất</span>
            <Line options={options} data={data} />
        </div>
    );
}

export default ChartLine;
