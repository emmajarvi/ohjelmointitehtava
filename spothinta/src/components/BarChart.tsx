import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, 
         CategoryScale,
          LinearScale, 
          BarElement, 
          Title, 
          Tooltip, 
          Legend } 
          from 'chart.js';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend);

// BarChartin propsien tyyppien määritys
interface BarChartProps {
    data: number[]; 
    labels: string[]; 
}

const BarChart = ({ data, labels } : BarChartProps) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Hinnat snt/kWh',
        data: data,
        backgroundColor: 'rgba(251, 136, 36, 0.58)',
        borderColor: 'rgb(255, 149, 0)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Akamon - Spothinnat ohjelmointitehtävä',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
