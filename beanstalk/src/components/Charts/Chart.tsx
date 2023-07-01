import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import './Chart.css';

interface ChartComponentProps {
    chartData: ChartData[];
  }

interface ChartData {
    x: Date;
    y: number[];
  }


const ChartComponent: React.FC<ChartComponentProps> = ({chartData}) => {
    const [showDiv, setShowDiv] = React.useState(false);
    const options: ApexOptions = {
        chart: {
            toolbar: {
                show: true,
                tools: {
                    download: false}
            }
          },
          xaxis: {
            type: 'datetime',
            labels: {
                datetimeUTC: false,
                format: 'HH:mm:ss',
            }
          }
    };
  
    const series = [{
        data: chartData
      }]


  
    React.useEffect(() => {
      setTimeout(() => {
        setShowDiv(true);
      }, 500);
    }, []);

    return (
        <ReactApexChart options={options} series={series} type="candlestick" className="chart-homepage" style={{ opacity: showDiv ? 1 : 0 }}/>
    );
  };
  
  export default ChartComponent;