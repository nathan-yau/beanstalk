import DailyPerformance, {DailyPerformanceSkeleton, NoHoldingSkeleton} from "../../components/Dashboard/DailyPerformance"
import PerformanceChart, {PerformanceChartSkeleton, NoHoldingChart} from "../../components/Dashboard/PerformanceChart";
import PortfolioTable from "../../components/Dashboard/PortfolioTable";
import { useState, useEffect } from 'react';
import { HomeContainer } from '../Home/Home.styles';
import axios from 'axios';
import { motion } from 'framer-motion';

const Dashboard = ({authorized}: {authorized: boolean}) => {

    if (!authorized) {
        window.location.href = "/";
        return null;
    }

    const [capitalHistory, setCapitalHistory] = useState(null); 
    const [currentCapital, setCurrentCapital] = useState(null);
    const [capitalChange, setCapitalChange] = useState(null);
    const [holdingData, setholdingData] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(null);
    const [percentageChange, setPercentageChange] = useState(null);
    const [baseCurrency, setBaseCurrency] = useState('USD');
    const [emptyHolding, setEmptyHolding] = useState(false);

    const DashboardInfo = async () => {
        try {
          const response = await axios.get('/api/holdings');
          if (response.data.success === true && response.data.data.empty === false) {
            setCurrentCapital(response.data.data.currentCapital)
            setCapitalChange(response.data.data.capitalChange)
            setholdingData(response.data.data.holding);
            setLastUpdate(response.data.data.lastUpdate)
            setPercentageChange(response.data.data.percentageChange)
            setBaseCurrency(response.data.data.baseCurrency)
            setCapitalHistory(response.data.data.capitalHistory)
            setEmptyHolding(false);
          } else if (response.data.success === true && response.data.data.empty === true) {
            setEmptyHolding(true);
          }
        } catch (error) {
          // Handle error
        }
      };
      
      useEffect(() => {
        DashboardInfo();
      }, [])
      
      console.log(emptyHolding)
  return (
    
    <HomeContainer>
        {/* Daily Performance */}
        {currentCapital && capitalChange && percentageChange && lastUpdate?
        <DailyPerformance currentCapital={currentCapital} capitalChange={capitalChange} percentageChange={percentageChange} lastUpdate={lastUpdate} baseCurrency={baseCurrency} />
        : emptyHolding? <NoHoldingSkeleton baseCurrency={baseCurrency}></NoHoldingSkeleton>: <DailyPerformanceSkeleton></DailyPerformanceSkeleton>}

        {/* Performance Chart */}
        {capitalHistory? 
        <motion.div initial={{ x: 0, y: 100 }} animate={{ x: 0, y: 0 }} exit={{ x: 0, y: 100 }} transition={{ duration: 0.5 }}><PerformanceChart chartData={capitalHistory}></PerformanceChart></motion.div>
        : emptyHolding? <NoHoldingChart></NoHoldingChart>: <PerformanceChartSkeleton></PerformanceChartSkeleton>}

        {/* Position Table */}
        {holdingData?
        <>
        <motion.div initial={{ x: 0, y: 100 }} animate={{ x: 0, y: 0 }} exit={{ x: 0, y: 100 }} transition={{ duration: 0.5 }}>
        <PortfolioTable holdingData={holdingData}></PortfolioTable>
        </motion.div>
        </>:
        null}

    </HomeContainer>
  );
};

export default Dashboard;