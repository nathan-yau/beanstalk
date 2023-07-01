
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
        // console.log(data)
        if ('symbol' in data) {
            setData(data);
            setLoading(false);
            // add margin bottom to the bottom of the page
            // const currentMarginBottom = parseInt(document.body.style.marginBottom, 10) || 0;
            // const updatedMarginBottom = currentMarginBottom + 100;
            // document.body.style.marginBottom = `${updatedMarginBottom}px`;
            // document.body.style.marginBottom = '100px';
        } else {
            setData(null);
            setLoading(false);
        }
    });
}

export default OverviewFetching;