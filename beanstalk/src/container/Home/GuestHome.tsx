
import './home.css'
import { useState, useEffect } from 'react';
import HomeSearchBar from '../../components/HomeSearchBar/HomeSearchBar';
import OverviewPlaceholder, {OverviewHolder} from '../../components/InstrumentOverviewCards/InstrumentOverviewCards';
import { GuestCard, GuestCardText,  SignInLink,  Subheading } from './Home.styles'
import OverviewFetching from '../../utils/OverviewFetching';

function GuestHome() {

    // Store the fetched data in the state
    const [searchData, setData] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false);

    const [activeStock, setActiveStock] = useState(null);
    const [stockLoading, setStockLoading] = useState(true);

    useEffect(() => {
        OverviewFetching("TSLA", 'STOCK', setActiveStock, setStockLoading);
    }, [])


    const [activeFutures, setActiveFutures] = useState(null);
    const [futuresLoading, setFuturesLoading] = useState(true);
    useEffect(() => {
        OverviewFetching("ESU3", 'FUTURES', setActiveFutures, setFuturesLoading);
    }, [])

    const [activeCrypto, setActiveCrypto] = useState(null);
    const [cryptoLoading, setCryptoLoading] = useState(true);
    useEffect(() => {
        OverviewFetching("BTC-USD", 'CRYPTOCURRENCY', setActiveCrypto, setCryptoLoading)
    }, [])

    return (
        <>
        <HomeSearchBar setData={setData} setSearchLoading={setSearchLoading}></HomeSearchBar>
        
        {searchData || searchLoading ? <Subheading>Top Match</Subheading>: null}
        {searchLoading? <OverviewPlaceholder></OverviewPlaceholder>: null}
        {searchData && !searchLoading? <OverviewHolder data={searchData} setData={setData} setSearchLoading={setSearchLoading}></OverviewHolder>: null}

        <Subheading>Most Active Instruments</Subheading>
        {stockLoading? <OverviewPlaceholder></OverviewPlaceholder>: null}
        {activeStock && !stockLoading? <OverviewHolder data={activeStock} setData={setActiveStock} setSearchLoading={setStockLoading}></OverviewHolder>: null}

        {futuresLoading? <OverviewPlaceholder></OverviewPlaceholder>: null}
        {activeFutures && !futuresLoading? <OverviewHolder data={activeFutures} setData={setActiveFutures} setSearchLoading={setFuturesLoading}></OverviewHolder>: null}

        {cryptoLoading? <OverviewPlaceholder></OverviewPlaceholder>: null}
        {activeCrypto && !cryptoLoading? <OverviewHolder data={activeCrypto} setData={setActiveCrypto} setSearchLoading={setCryptoLoading}></OverviewHolder>: null}

        <Subheading>Saved Watchlist</Subheading>
        <GuestCard>
            <GuestCardText>Already have an account? <SignInLink href="/signin">Sign in</SignInLink></GuestCardText>
        </GuestCard>
        
        </>
    );
}

export default GuestHome;