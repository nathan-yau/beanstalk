import { InstrumentChartPlaceholder,  InstrumentChartPlaceholderText} from './InstrumentChartCards.styles'
import { useRef, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import './InstrumentChartCards.css'

interface ChartData {
    x: Date;
    y: number[];
  }

function ChartPlaceholder({ isExpanded, chartData }: { isExpanded: boolean, chartData: ChartData[] }) {
    const chartRef = useRef<HTMLDivElement>(null);
    
    const [showDiv, setShowDiv] = useState(false);

    const options: ApexOptions = {
        chart: {
            toolbar: {
                show: false,
                tools: {
                    download: false}
            }
          },
          xaxis: {
            type: 'datetime',
            labels: {
                datetimeUTC: false,
                format: 'HH:mm',
            }
          }
    };
  
    const series = [{
        data: chartData
      }]

    useEffect(() => {
        setTimeout(() => {
          setShowDiv(true);
        }, 500);
      }, []);

    return (
        <>
        <InstrumentChartPlaceholder ref={chartRef} 
        style={{
          height: isExpanded && chartRef.current?.offsetWidth ? chartRef.current?.offsetWidth*.7 || '50%': '0px',
          padding: isExpanded ? '10px 10px 10px 10px': '10px 10px 15px 10px',
          borderRadius: isExpanded ? '0 0 10px 10px': '0 0 0 2em'
        }}>
            {isExpanded && chartData? <ReactApexChart options={options} series={series} type="candlestick" className="chart-homepage" style={{ opacity: showDiv ? 1 : 0 }}/>: <InstrumentChartPlaceholderText isExpanded={isExpanded} style={{ opacity: showDiv ? 1 : 0 }}></InstrumentChartPlaceholderText>}
        </InstrumentChartPlaceholder>
        </>
    ); 
}
export default ChartPlaceholder;