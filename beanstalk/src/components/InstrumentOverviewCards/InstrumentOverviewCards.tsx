import {InstrumentOverviewPlaceholder, InstrumentOverviewPlaceholderText, InstrumentOverviewPlaceholderTitle, Overviewheading, OverviewFooter, OverviewText, OverviewSubtext} from './InstrumentOverviewCards.styles'


interface Data {
    symbol: string;
    currency: string;
    exchangeName: string;
    instrumentType: string;
    previousClose: number;
    currentPrice: number;
    currentHigh: number;
    currentLow: number;
    Volume: string;
    lastUpdate: string;
}

function OverviewHolder({data}: {data: Data}) {
    return (
        <>
        <InstrumentOverviewPlaceholder>
            <Overviewheading>
                {data['symbol']} - {data['instrumentType']} ({data['exchangeName']})
            </Overviewheading>
            <OverviewText>{data['currentPrice']}</OverviewText>
            <OverviewFooter>
                <OverviewSubtext>High: {data['currentHigh']}</OverviewSubtext> <OverviewSubtext>Low: {data['currentLow']}</OverviewSubtext>
            </OverviewFooter>
        </InstrumentOverviewPlaceholder>
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