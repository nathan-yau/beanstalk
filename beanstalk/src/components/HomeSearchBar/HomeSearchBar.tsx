import { useState } from 'react';
import { SearchArea, SearchBar, SearchLabel } from './HomeSearchBar.styles';
import OverviewFetching from '../../utils/OverviewFetching';

function HomeSearchBar( { setData, setSearchLoading }: { setData: any, setSearchLoading: any } ) {

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
            setSearchLoading(true);
    
            // Set a new timer to fetch the data after 500ms
            const newTimerId = setTimeout(() => {
                OverviewFetching(inputValue, '', setData, setSearchLoading);
                
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