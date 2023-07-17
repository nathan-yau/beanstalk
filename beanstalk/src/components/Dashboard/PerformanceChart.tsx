import { ApexOptions } from "apexcharts";
import { Container, PeriodContain, PeriodButton } from "./PerformanceChart.styles";
import { useState, useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';

export default function PerformanceChart({chartData}: {chartData: any}) {
    
    const [currentChartData, setCurrentChartData] = useState<any | null>(null);
    const [currentChartLabel, setCurrentChartLabel] = useState<string | null>('Weekly');
    const unixReference = useRef<{ [key: string]: number }>({});
    const period = ['1W', "MTD", "6M", "YTD", "1Y"]
    const periodLabel: { [key: string]: string } = {'1W': 'Weekly', 'MTD': 'Month-To-Date', '6M': 'Six Months', 'YTD': 'Year-To-Date', '1Y': 'One Year'}
    const chartOptions: ApexOptions = {
        chart: {type: 'area', zoom: {enabled: false}},
        dataLabels: {enabled: false},
        stroke: {curve: 'smooth', width: 2},
        title: {text: `${currentChartLabel} Performance`, align: 'left',
          style: {fontSize: '14px'}},
        xaxis: {type: 'datetime',tickAmount: 4,
          axisBorder: {show: false},
          axisTicks: {show: false},
          labels: {
            formatter: function (value: any) {
              const date = new Date(value * 1000); 
              const month = date.toLocaleString("default", { month: "short" });
              const day = date.getDate();
              return `${month} ${day}`;
            }, 
            offsetX: 7}},
        yaxis: {tickAmount: 4,floating: true,
          labels: {
            formatter: function (value: number) {
              if (Math.abs(value) >= 1000) {
                const formattedValue = Math.abs(value) >= 1000000 ? (Math.abs(value) / 1000000).toFixed(1) + 'M' : (Math.abs(value) / 1000).toFixed(1) + 'k';
                return value < 0 ? '-' + formattedValue : formattedValue;
              }
              return value.toString();
            },
            style: {colors: '#8e8da4'},
            offsetY: -7, offsetX: 35},
          axisBorder: {show: false,},
          axisTicks: {show: false}},
        fill: {opacity: 0.5},
        tooltip: {
          x: {format: "yyyy-MM-dd"},
          fixed: {enabled: false,position: 'topRight'}
        },
        grid: {show: false}
      }

    
    useEffect(() => {
        for (let i = 0; i < period.length; i++) {
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            if (period[i] === '1W') {
                today.setDate(today.getDate() - 7);
            } else if (period[i] === "MTD") {
                today.setDate(1);
            } else if (period[i] === "6M") {
                today.setMonth(today.getMonth() - 6);
            }
            else if (period[i] === "YTD") {
                today.setMonth(0);
                today.setDate(1);
            }
            else if (period[i] === "1Y") {
                today.setFullYear(today.getFullYear() - 1);
            }
            unixReference.current[period[i]] = Math.floor(today.getTime() / 1000);
        }
        var displayedChart = chartData.filter((item: any) => {
            return item.x >= unixReference.current['1W'];
        })
        setCurrentChartLabel('Weekly')
        setCurrentChartData(displayedChart)
    }, []) 

    const updateChart = (selectedperiod: string) => {
          var displayedChart = chartData.filter((item: any) => {
            return item.x >= unixReference.current[selectedperiod];
        })
        setCurrentChartLabel(periodLabel[selectedperiod])
        setCurrentChartData(displayedChart)
    }
  
    return (
        <Container>
            {currentChartData &&
            <ReactApexChart options={chartOptions} series={[{name: 'Balance',data: currentChartData}]} type="area" height={300}/>}
            <PeriodContain>
                {period.map((item: string) => {
                    return <PeriodButton key={item} onClick={()=>updateChart(item)} selected={currentChartLabel===periodLabel[item]}>{item}</PeriodButton>
                })}
            </PeriodContain>
        </Container>
    );
}

export const PerformanceChartSkeleton = () => {
    return (
        <Container style={{height: "300px", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <img src="/icons/loading-validation.svg" alt="" width={100} height={100}></img>
        </Container>
    );
}
