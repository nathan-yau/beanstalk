import ReactApexChart from "react-apexcharts"

export default function InstrumentLineChart({chartData, chartColor, animationEnabled}: {chartData: any, chartColor: Array<string>, animationEnabled: boolean}) {

    const chartOptions: object =  {
        chart: {
          animations: {
            enabled: animationEnabled,
          },
            sparkline: {
                enabled: true,
            },
          toolbar: {
            show: false
            }, 
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        tooltip: {
            enabled: false
          },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight',
          width: 2,
          colors: chartColor,
        },
        grid: {
            show: false
        },
        yaxis: {
            labels: {
                show: false
            }
        },
        xaxis: {
            show: false,
            labels: {
                show: false
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        }
      }
    
    return (
        <ReactApexChart options={chartOptions} series={chartData} type="line" height={'30px'} />
    )
}