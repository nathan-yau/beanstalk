import {InstrumentOverviewContainer,  OverviewHeadingText, InstrumentOverviewPlaceholder, OverviewFooterStat, OverviewPrecentage, InstrumentOverviewPlaceholderText, InstrumentOverviewPlaceholderTitle, OverviewFooter, OverviewText, OverviewSubtext, OverviewHeading} from './InstrumentOverviewCards.styles'
import {RefreshButton} from '../InstrumentOverviewCards/InstrumentOverviewCards.styles'
import OverviewFetching from '../../utils/OverviewFetching';

interface Data {
    symbol: string;
    currency: string;
    exchangeName: string;
    instrumentType: string;
    previousClose: number;
    priceChange: number;
    priceChangePercent: number;
    currentPrice: number;
    currentHigh: number;
    currentLow: number;
    Volume: string;
    lastUpdate: string;
}


function OverviewHolder({ data, setData, setSearchLoading }: { data: Data, setData: Function, setSearchLoading: Function }) {
    var instrumentType = ""
    {data['instrumentType'] === "FUTURES" ? instrumentType = "FUTURES" : instrumentType = "STOCK"};

    const handleClick = (event: any) => {
        // Handle the image click logic here
        OverviewFetching(data['symbol'], instrumentType, setData, setSearchLoading);
        event.stopPropagation();
      };

    return (
        <>
        <InstrumentOverviewContainer changes={data['priceChange']}>
            <OverviewHeading>
                <OverviewHeadingText>
                    {data['symbol']} - {data['instrumentType']} {data['exchangeName']? `(${data['exchangeName']})`: null}
                </OverviewHeadingText>
                <RefreshButton onClick={handleClick}>
                    <img src="icons\refresh-card.svg" alt="refresh" width="15px"/>
                </RefreshButton>
            </OverviewHeading>
            <OverviewText changes={data['priceChange']} currency={data['currency']}>
                {data['currentPrice']} 
                <OverviewPrecentage changes={data['priceChange']}>{data['priceChange']} ( {data['priceChangePercent']}% )</OverviewPrecentage>
            </OverviewText>
            <OverviewFooter>
                <OverviewFooterStat>
                    <OverviewSubtext>High: {data['currentHigh']}</OverviewSubtext> 
                    <OverviewSubtext>Low: {data['currentLow']}</OverviewSubtext>
                </OverviewFooterStat>
                <OverviewSubtext>Last Updated: {data['lastUpdate']}</OverviewSubtext>
            </OverviewFooter>
        </InstrumentOverviewContainer>
        </>
    );
}

function OverviewPlaceholder() {
    return (
        <>
        <InstrumentOverviewPlaceholder>
            <InstrumentOverviewPlaceholderTitle></InstrumentOverviewPlaceholderTitle>
            <InstrumentOverviewPlaceholderText></InstrumentOverviewPlaceholderText>
        </InstrumentOverviewPlaceholder>
        </>
    ); 
}
export default OverviewPlaceholder;

export {OverviewHolder};