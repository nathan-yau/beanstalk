import { useState, useEffect } from "react";
import WatchlistFetching from "../../utils/WatchlistFetching";
import {motion} from 'framer-motion'
import InstrumentCards from "../MarketOverview/InstrumentCards";

export default function Watchlist({authorized}:{authorized: boolean}) {

    const [watchlistInfo, setWatchlistInfo] = useState(null);
    const [loadingWatchlistInfo, setLoadingWatchlistInfo] = useState(false);

    useEffect(() => {
        WatchlistFetching(setWatchlistInfo, setLoadingWatchlistInfo)
    }, [])

    console.log(watchlistInfo)

    return (
        <>
        {authorized && watchlistInfo? 
            <motion.div initial={{ x: 0, y: -30, opacity: 0.2 }} animate={{ x: 0, y: 0, opacity: 1.0 }} exit={{ x: 0, y: -30, opacity: 0.2 }} transition={{ duration: 0.5 }}>
            <InstrumentCards instrumentInfo={watchlistInfo} animationEnabled={false} loadingMarketInfo={loadingWatchlistInfo} authorized={authorized}></InstrumentCards>
            </motion.div>
        : null}
        </>
    )
}

