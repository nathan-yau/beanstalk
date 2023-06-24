import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

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
          title: {
            text: `${meta['symbol']} - ${meta['instrumentType']} (${meta['exchangeName']})`,
            align: 'left'
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
      <div>
        <ReactApexChart options={options} series={series} type="candlestick" height={350} />
      </div>
    );
  };
  
  export default ChartComponent;