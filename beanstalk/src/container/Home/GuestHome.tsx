
import './home.css'
import { useState, useEffect } from 'react';
import HomeSearchBar from '../../components/HomeSearchBar/HomeSearchBar';
import MarketSelector from '../../components/MarketOverview/MarketSelector';
import InstrumentCards from '../../components/MarketOverview/InstrumentCards';
import { Subheading } from './Home.styles'
import DefaultFetching from '../../utils/DefaultFetching';
import { motion } from 'framer-motion';
import Watchlist from '../../components/Watchlist/Watchlist';
const GuestHome = ({authorized}: {authorized: boolean}) => {

    const [selectedMarket, setSelectedMarket] = useState('US Stock');
    const [instrumentInfo, setInstrumentInfo] = useState(null);
    const [animationEnabled, setAnimationEnabled] = useState(false);
    const [loadingMarketInfo, setLoadingMarketInfo] = useState(false);

    useEffect(() => {
        DefaultFetching(selectedMarket, setInstrumentInfo, setLoadingMarketInfo)
    }, [selectedMarket])   
    

                                                               
    return (
        <>
            <HomeSearchBar authorized={authorized}></HomeSearchBar>

            <Subheading>Watchlist</Subheading>    
            <Watchlist authorized={authorized}></Watchlist>
            <Subheading>Popular Markets</Subheading>
            <MarketSelector selectedMarket={selectedMarket} setSelectedMarket={setSelectedMarket} setAnimationEnabled={setAnimationEnabled}></MarketSelector>
            {instrumentInfo? 
            <motion.div initial={{ x: 0, y: -30, opacity: 0.2 }} animate={{ x: 0, y: 0, opacity: 1.0 }} exit={{ x: 0, y: -30, opacity: 0.2 }} transition={{ duration: 0.5 }}>
            <InstrumentCards instrumentInfo={instrumentInfo} animationEnabled={animationEnabled} mode="market" loadingMarketInfo={loadingMarketInfo} authorized={authorized}></InstrumentCards>
            </motion.div>
            : 
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <img src="/icons/loading-validation.svg" width="50px" height="50px" style={{marginRight: "10px"}}></img>
            </div>
            }

        </>
    );
}

export default GuestHome;