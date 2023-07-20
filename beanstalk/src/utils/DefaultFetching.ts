
function DefaultFetching(inputValue: string, setInstrumentInfo: Function, setLoadingMarketInfo: Function) {
    setLoadingMarketInfo(true);
    fetch('/api/market', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ market: inputValue })
    }).then((res) => res.json()).then((data) => {
        setInstrumentInfo(data);
        setLoadingMarketInfo(false);
    });
}

export default DefaultFetching;