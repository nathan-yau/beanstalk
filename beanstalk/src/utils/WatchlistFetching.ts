
function WatchlistFetching( setInstrumentInfo: Function, setLoadingMarketInfo: Function) {
    setLoadingMarketInfo(true);
    fetch('/api/watchlists', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json()).then((data) => {
        setInstrumentInfo(data);
        setLoadingMarketInfo(false);
    });
}

export default WatchlistFetching;