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
  import {faker} from '@faker-js/faker';
import { useEffect, useState } from 'react';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  interface IProps{
    dateFrom:string,
    dateTo:string
  } 
  
  export const options = {
    responsive: true,
    scales: {
      x: {
          ticks: {
              font: {
                  size: 7,
              }
          }
      }
  },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Daily scripts',
      },
    },
  };
  
export const LineChart = ({dateFrom, dateTo}:IProps) => {
  const [dailyData, setDailyData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(()=>{
    getDailyData()
  }, [])

  const getDailyData = async () => {
    await fetch(`/api/chart/daily/${dateFrom}/${dateTo}`)
    .then(res => res.json())
    .then(data => {
      setDailyData(data.dailyScripts)
      setLabels(data.dates)
    })
  }

  const data = {
    labels,
    datasets: [
      {
        label: '# of scripts',
        data: dailyData,
        borderColor: 'rgb(36, 130, 50)',
        backgroundColor: 'rgb(36, 130, 50)',
      }
    ],
  }

  

  return(
    <>
      <Line options={options} data={data}/>
    </>
  )
}