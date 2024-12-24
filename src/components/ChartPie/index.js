import { Pie } from "react-chartjs-2";
import classNames from 'classnames/bind';
import styles from './ChartPie.module.scss';

const cx = classNames.bind(styles);
function ChartPie({dataChart, ...props}) {
    const data = {
        labels: dataChart.map((item) => item.name),
        datasets: [
            {
                // label: '# of Votes',
                data: dataChart.map((item) => item.Number),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 35, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 255, 31, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const total = tooltipItem.dataset.data.reduce((acc, val) => acc + val, 0);
                        const value = tooltipItem.raw;
                        const percentage = ((value / total) * 100).toFixed(2); // Tính phần trăm
                        return `${tooltipItem.label}: ${percentage}%`; // Hiển thị nhãn
                    },
                },
            },
            datalabels: {
                display: false,
            },
        },
    };

    const hasData = data.datasets[0].data.some((value) => value > 0);
    return ( 
        <div className={cx('chart-DT')}>
        {hasData ? <Pie data={data} options={options} /> : <span>Bạn chưa mua sản phẩm nào</span>}
        <span className={cx('chart-title')}>{props.title}</span>
    </div>
     );
}

export default ChartPie;