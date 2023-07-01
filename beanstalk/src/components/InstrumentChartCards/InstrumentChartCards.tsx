import { InstrumentChartPlaceholder,  InstrumentChartPlaceholderText} from './InstrumentChartCards.styles'
import { useRef, useEffect, useState } from 'react';
import ChartComponent from '../../components/Charts/Chart';

function ChartPlaceholder({ isExpanded, chartData }: { isExpanded: boolean, chartData: any }) {
    const chartRef = useRef<HTMLDivElement>(null);
    
    const [showDiv, setShowDiv] = useState(false);

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
            {isExpanded && chartData? <ChartComponent chartData={chartData}></ChartComponent>: <InstrumentChartPlaceholderText isExpanded={isExpanded} style={{ opacity: showDiv ? 1 : 0 }}></InstrumentChartPlaceholderText>}
        </InstrumentChartPlaceholder>
        </>
    ); 
}
export default ChartPlaceholder;

export {ChartPlaceholder};