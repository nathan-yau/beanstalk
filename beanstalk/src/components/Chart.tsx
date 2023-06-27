import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Container } from './Chart.styles';

interface ChartComponentProps {
    chartData: ChartData[];
    meta: MetaData;
  }

interface ChartData {
    x: Date;
    y: number[];
  }
  
  interface MetaData {
    symbol: string;
    instrumentType: string;
    exchangeName: string;
    currency: string;
    
  }


const ChartComponent: React.FC<ChartComponentProps> = ({chartData, meta}) => {
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
  
    return (
      <Container className='mt-5'>
        <ReactApexChart options={options} series={series} type="candlestick" height={350} />
      </Container>
    );
  };
  
  export default ChartComponent;