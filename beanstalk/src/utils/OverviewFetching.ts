
function OverviewFetching(inputValue: string, InstrumentType : string, setData: Function, setLoading: Function) {
    // Need to check if what InstrumentType is before sending it to the backend
    InstrumentType? InstrumentType = InstrumentType : InstrumentType = 'STOCK';
    fetch('/api/overview', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ symbol: inputValue, instrumentType: InstrumentType })
    }).then((res) => res.json()).then((data) => {
        if ('symbol' in data) {
            setData(data);
            setLoading(false);
        } else {
            setData(null);
            setLoading(false);
        }
    });
}

export default OverviewFetching;