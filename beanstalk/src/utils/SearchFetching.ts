
function SearchFetching(searchKey: any, setSearchData:any, setSearchLoading:any) {
    // setSearchLoading(true);
    fetch('/api/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ symbol: searchKey })
    }).then((res) => res.json()).then((data) => {
        setSearchLoading(false)
        setSearchData(data)
    });
}

export default SearchFetching;