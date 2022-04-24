import {useEffect,useState} from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS,CategoryScale, LineElement, PointElement, LinearScale, Title } from 'chart.js';

const options = {
  responsive: true,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      color:'blue',
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
};

export default function CardLineChart() {
  ChartJS.register(LineElement, PointElement, LinearScale,CategoryScale, Title);

  const [data,setData] = useState({
    labels:['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
          {
            label: 'Dataset 1',
            data:[0, 20, 20, 60, 60, 120, NaN, 180, 120, 125, 105, 110, 170],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(25, 90, 13, 0.5)',
            tension: 0.4
          },
          {
            label: 'Dataset 2',
            data:[0, 10, 10, 30, 10, 160, NaN, 180, 200, 100, 125,150,175],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
  });
  
  return( 
  <div style={{width:'80%', height:'50%'}}>
    <Line data={data} options={options}/>
  </div>
  )
}
