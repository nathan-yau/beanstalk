
import './home.css'
import { useState, useEffect } from 'react';
import HomeSearchBar from '../../components/HomeSearchBar/HomeSearchBar';
import MarketSelector from '../../components/MarketOverview/MarketSelector';
import InstrumentCards from '../../components/MarketOverview/InstrumentCards';
import { GuestCard, GuestCardText,  SignInLink,  Subheading } from './Home.styles'
import DefaultFetching from '../../utils/DefaultFetching';
import { motion } from 'framer-motion';
const GuestHome = ({authorized}: {authorized: boolean}) => {

    // Store the fetched data in the state
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchData, setSearchData] = useState(null);
    const [selectedMarket, setSelectedMarket] = useState('US Stock');
    const [instrumentInfo, setInstrumentInfo] = useState(null);
    const [animationEnabled, setAnimationEnabled] = useState(false);

    useEffect(() => {
        DefaultFetching(selectedMarket, setInstrumentInfo)
    }, [selectedMarket])

    // const toggleExpansion = (isExpanded: boolean, setExpanded: Function) => {

    //     if (isExpanded) {
    //         setExpanded(false);
    //     } else {
    //         setExpanded(true);
    //     }

    //     const currentMarginBottom = parseInt(document.body.style.marginBottom, 10) || 0;
    //     if (isExpanded) {
    //         const updatedMarginBottom = currentMarginBottom - 35;
    //         document.body.style.marginBottom = `${updatedMarginBottom}vh`;
    //     } else {
    //         const updatedMarginBottom = currentMarginBottom + 35;
    //         document.body.style.marginBottom = `${updatedMarginBottom}vh`;
    //     }
    // };
    

                                                               
    return (
        <>
            <HomeSearchBar setSearchData={setSearchData} setSearchLoading={setSearchLoading} searchLoading={searchLoading}></HomeSearchBar>
            {searchData && <InstrumentCards instrumentInfo={[searchData]} animationEnabled={true} searchMode={true}></InstrumentCards>}

            <MarketSelector selectedMarket={selectedMarket} setSelectedMarket={setSelectedMarket} setAnimationEnabled={setAnimationEnabled}></MarketSelector>
            {instrumentInfo? 
            <motion.div initial={{ x: 0, y: -30, opacity: 0.2 }} animate={{ x: 0, y: 0, opacity: 1.0 }} exit={{ x: 0, y: -30, opacity: 0.2 }} transition={{ duration: 0.5 }}>
            <InstrumentCards instrumentInfo={instrumentInfo} animationEnabled={animationEnabled}></InstrumentCards>
            </motion.div>
            : null}

            <Subheading>Watchlist</Subheading>
            <GuestCard>
                {authorized?
                <GuestCardText><SignInLink href="/dashboard">Click here to create watchlist</SignInLink></GuestCardText>
                :<GuestCardText>Already have an account? <SignInLink href="/signin">Sign in</SignInLink></GuestCardText>}
            </GuestCard>
        </>
    );
}

export default GuestHome;