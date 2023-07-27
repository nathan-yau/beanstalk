import { useState, useEffect } from "react";
import WatchlistFetching from "../../utils/WatchlistFetching";
import {motion} from 'framer-motion'
import InstrumentCards from "../MarketOverview/InstrumentCards";
import { CardDiv, CardLink, CardText, LoadingIcon, IconContainer } from "./Watchlist.styles";

export default function Watchlist({authorized, nextUpdate}:{authorized: boolean, nextUpdate: number}) {

    interface watchlistInfo {
        data: {
            stockInfo: [],
            empty: boolean
        };
      }

    const [watchlistInfo, setWatchlistInfo] = useState<watchlistInfo | null>(null);
    const [loadingWatchlistInfo, setLoadingWatchlistInfo] = useState(false);
    const [emptyWatchlist, setEmptyWatchlist] = useState(false);

    useEffect(() => {
        WatchlistFetching(setWatchlistInfo, setLoadingWatchlistInfo, setEmptyWatchlist)
    }, [nextUpdate])

    return (
        <>
        {/* <Pot>
            <img src="https://i.stack.imgur.com/qgNyF.png?s=328&g=1" width={"100px"}/>
        </Pot>   */}
        {authorized && watchlistInfo && !emptyWatchlist ? 
            <motion.div initial={{ x: 0, y: -30, opacity: 0.2 }} animate={{ x: 0, y: 0, opacity: 1.0 }} exit={{ x: 0, y: -30, opacity: 0.2 }} transition={{ duration: 0.5 }}>
            <InstrumentCards instrumentInfo={watchlistInfo} animationEnabled={false} mode="watchlist" loadingMarketInfo={loadingWatchlistInfo} authorized={authorized}></InstrumentCards>
            </motion.div>
        : authorized && watchlistInfo && emptyWatchlist === true ?
            <CardDiv>
                <CardText>
                    <CardLink href="/dashboard">Click here to create watchlist</CardLink>
                </CardText>
            </CardDiv>
        : !authorized ?
            <CardDiv>
                <CardText>
                    Already have an account?
                    <CardLink href="/signin">Sign in</CardLink>
                </CardText>
            </CardDiv>
        : 
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <IconContainer>
                <LoadingIcon src="icons/loading-validation.svg"/>
            </IconContainer>
        </div>
    }
        </>
    )
}

