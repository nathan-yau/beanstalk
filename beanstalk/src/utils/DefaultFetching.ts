
function DefaultFetching(inputValue: string, setInstrumentInfo: Function) {
    fetch('/api/market', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ market: inputValue })
    }).then((res) => res.json()).then((data) => {
        setInstrumentInfo(data.data.stockInfo);
    });
}

export default DefaultFetching;