import {HeaderCell, TableHeader} from './MarketOverview.styles';

function MarketSelector({selectedMarket, setSelectedMarket, setAnimationEnabled} : {selectedMarket: string, setSelectedMarket: any, setAnimationEnabled: any}) {
    const markets = ['US Stock', 'HK Stock', 'Crypto', 'Futures'];

    const handleMarketChange = (market: string) => {
        setSelectedMarket(market);
        setAnimationEnabled(true);
    }

    return (
        <>
        <TableHeader>
            {markets.map((item, _) => {
                return <HeaderCell width={"20%"} onClick={()=>{handleMarketChange(item)}} key={item} selected={selectedMarket===item}>{item}</HeaderCell>
            })}
        </TableHeader>
        </>
    );
}


export default MarketSelector;