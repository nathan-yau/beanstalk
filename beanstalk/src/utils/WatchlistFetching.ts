
function WatchlistFetching( setInstrumentInfo: Function, setLoadingMarketInfo: Function, setEmptyWatchlist: Function) {
    setLoadingMarketInfo(true);
    fetch('/api/watchlists', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json()).then((data) => {
        setInstrumentInfo(data);
        setLoadingMarketInfo(false);
        setEmptyWatchlist(data.data.empty)
        console.log(data)
    });
}

export default WatchlistFetching;