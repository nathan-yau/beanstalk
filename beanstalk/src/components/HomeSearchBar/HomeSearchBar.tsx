import { useState } from 'react';
import { SearchArea, SearchBar, SearchLabel } from './HomeSearchBar.styles';

function HomeSearchBar( { setData }: { setData: any } ) {

        // Timer id for the timeout
        const [timerId, setTimerId] = useState<NodeJS.Timeout | undefined>(undefined);
    
        // Store the search input in the state
        const [searchInput, setSearchInput] = useState("");
    
        // Handle the search input change
        const handleSearchInputChange = (event: any) => {
            // Get the input value
            const inputValue = event.target.value;
            setSearchInput(inputValue);
    
            // Clear the timer if the user is still typing
            clearTimeout(timerId);
    
            // Set a new timer to fetch the data after 500ms
            const newTimerId = setTimeout(() => {
                fetch('/api/stockQuery', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ symbol: inputValue })
                }).then((res) => res.json()).then((data) => {
                    if ('stockMeta' in data) {
                        setData(data);
                    } else {
                        setData(null);
                    }
                });
            }, 1000);
    
            // Store the timer id so we can clear it if the user is still typing
            setTimerId(newTimerId);
        };

    return (
        <>
            <SearchBar>
                <SearchLabel>SEARCH FOR A FINANCIAL INSTRUMENT</SearchLabel>
                <SearchArea type="text" aria-label="Search" value={searchInput} onChange={handleSearchInputChange} placeholder='ENTER SYMBOL TO SEARCH'></SearchArea>
            </SearchBar>
        </>
    );
}

export default HomeSearchBar;