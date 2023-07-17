import DailyPerformance, {DailyPerformanceSkeleton} from "../../components/Dashboard/DailyPerformance"
import PerformanceChart, {PerformanceChartSkeleton} from "../../components/Dashboard/PerformanceChart";
import PortfolioTable from "../../components/Dashboard/PortfolioTable";
import { useState, useEffect } from 'react';
import { Subheading } from "./Dashboard.styles";
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
    const [topGainer, setTopGainer] = useState(null);
    const [topLoser, setTopLoser] = useState(null);
    const [holdingData, setholdingData] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(null);
    const [percentageChange, setPercentageChange] = useState(null);
    const [displayDetails, setDisplayDetails] = useState({});
    const [baseCurrency, setBaseCurrency] = useState('USD');
    const [priceDelta, setPriceDelta] = useState(null);

    const DashboardInfo = async () => {
        try {
          const response = await axios.get('/api/dashboard');
          if (response.data.success === true) {
            setCurrentCapital(response.data.data.currentCapital)
            setCapitalChange(response.data.data.capitalChange)
            setholdingData(response.data.data.holding);
            setTopGainer(response.data.data.topGainer);
            setTopLoser(response.data.data.topLoser);
            setLastUpdate(response.data.data.lastUpdate)
            setPercentageChange(response.data.data.percentageChange)
            setBaseCurrency(response.data.data.baseCurrency)
            setCapitalHistory(response.data.data.capitalHistory)
          }
        } catch (error) {
          // Handle error
        }
      };
      
      useEffect(() => {
        DashboardInfo();
      }, [])
      
  return (
    
    <HomeContainer>
        {/* Daily Performance */}
        {currentCapital && capitalChange && percentageChange && lastUpdate?
        <DailyPerformance currentCapital={currentCapital} capitalChange={capitalChange} percentageChange={percentageChange} lastUpdate={lastUpdate} baseCurrency={baseCurrency} />
        : <DailyPerformanceSkeleton></DailyPerformanceSkeleton>}

        {/* Performance Chart */}
        {capitalHistory? 
        <motion.div initial={{ x: 0, y: 100 }} animate={{ x: 0, y: 0 }} exit={{ x: 0, y: 100 }} transition={{ duration: 0.5 }}><PerformanceChart chartData={capitalHistory}></PerformanceChart></motion.div>
        : <PerformanceChartSkeleton></PerformanceChartSkeleton>}


        
        {holdingData?
        <>
        <Subheading>Position</Subheading>
        <PortfolioTable holdingData={holdingData}></PortfolioTable>
        </>:
        null}

    </HomeContainer>
  );
};

export default Dashboard;