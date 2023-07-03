
import './home.css'
import { useState, useEffect } from 'react';
import HomeSearchBar from '../../components/HomeSearchBar/HomeSearchBar';
import OverviewPlaceholder, {OverviewHolder} from '../../components/InstrumentOverviewCards/InstrumentOverviewCards';
import ChartPlaceholder from '../../components/InstrumentChartCards/InstrumentChartCards';
import { GuestCard, GuestCardText,  SignInLink,  Subheading } from './Home.styles'
import OverviewFetching from '../../utils/OverviewFetching';

function GuestHome() {

    // Store the fetched data in the state
    const [searchData, setData] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchExpanded, setSearchExpanded] = useState(false);

    const [activeStock, setActiveStock] = useState(null);
    const [stockLoading, setStockLoading] = useState(true);
    const [stockExpanded, setStockExpanded] = useState(false);
    
    const [activeFutures, setActiveFutures] = useState(null);
    const [futuresLoading, setFuturesLoading] = useState(true);
    const [futuresExpanded, setFuturesExpanded] = useState(false);

    const [activeCrypto, setActiveCrypto] = useState(null);
    const [cryptoLoading, setCryptoLoading] = useState(true);
    const [cryptoExpanded, setCryptoExpanded] = useState(false);

    // const [isExpanded, setExpanded] = useState(false);


    useEffect(() => {
        OverviewFetching("TSLA", 'STOCK', setActiveStock, setStockLoading);
        OverviewFetching("ESU3", 'FUTURES', setActiveFutures, setFuturesLoading);
        OverviewFetching("BTC-USD", 'CRYPTOCURRENCY', setActiveCrypto, setCryptoLoading)
    }, [])



    const toggleExpansion = (isExpanded: boolean, setExpanded: Function) => {

        if (isExpanded) {
            setExpanded(false);
        } else {
            setExpanded(true);
        }

        const currentMarginBottom = parseInt(document.body.style.marginBottom, 10) || 0;
        if (isExpanded) {
            const updatedMarginBottom = currentMarginBottom - 35;
            document.body.style.marginBottom = `${updatedMarginBottom}vh`;
        } else {
            const updatedMarginBottom = currentMarginBottom + 35;
            document.body.style.marginBottom = `${updatedMarginBottom}vh`;
        }
    };
    

    const mostActiveInsyruments: [boolean, React.Dispatch<React.SetStateAction<boolean>>, null, React.Dispatch<React.SetStateAction<null>>, boolean, React.Dispatch<React.SetStateAction<boolean>>][] = 
                                 [[stockLoading, setStockLoading, activeStock, setActiveStock, stockExpanded, setStockExpanded], 
                                  [cryptoLoading, setCryptoLoading, activeCrypto, setActiveCrypto, cryptoExpanded, setCryptoExpanded],
                                  [futuresLoading, setFuturesLoading, activeFutures, setActiveFutures, futuresExpanded, setFuturesExpanded]] 
                                                               
    return (
        <>
        <HomeSearchBar setData={setData} setSearchLoading={setSearchLoading}></HomeSearchBar>
        {searchData || searchLoading ? <Subheading>Top Match</Subheading>: null}
        {searchLoading? <OverviewPlaceholder></OverviewPlaceholder>: null}
        {searchData && !searchLoading? <a onClick={() => toggleExpansion(searchExpanded, setSearchExpanded)}><OverviewHolder data={searchData} setData={setData} setSearchLoading={setSearchLoading}></OverviewHolder></a>: null}
        {searchData && !searchLoading? <ChartPlaceholder isExpanded={searchExpanded} chartData={searchData['chartData']}></ChartPlaceholder>: null}

        <Subheading>Most Active Instruments</Subheading>
        {mostActiveInsyruments.map((instrument, _) => {
            return (
                <>
                {instrument[0]? <OverviewPlaceholder></OverviewPlaceholder>: null}
                {instrument[2] && !instrument[0]? <a onClick={() => toggleExpansion(instrument[4], instrument[5])}><OverviewHolder data={instrument[2]} setData={instrument[3]} setSearchLoading={instrument[1]}></OverviewHolder></a>: null}
                {instrument[2]? <ChartPlaceholder isExpanded={instrument[4]} chartData={instrument[2]['chartData']} ></ChartPlaceholder>: null }
                </>
            )
        })}

        <Subheading>Saved Watchlist</Subheading>
        <GuestCard>
            <GuestCardText>Already have an account? <SignInLink href="/signin">Sign in</SignInLink></GuestCardText>
        </GuestCard>
        </>
    );
}

export default GuestHome;