import { useState } from 'react';
import { SearchArea, SearchBar, SearchLabel, InputSection } from './HomeSearchBar.styles';
import SearchFetching from '../../utils/SearchFetching';
// import { set } from 'mongoose';

function HomeSearchBar( { setSearchData, setSearchLoading, searchLoading }: { setSearchData: any, setSearchLoading: any, searchLoading:any } ) {

        // Timer id for the timeout
        const [timerId, setTimerId] = useState<NodeJS.Timeout | undefined>(undefined);
    
        // Store the search input in the state
        const [searchInput, setSearchInput] = useState("");
    
        // Handle the search input change
        const handleSearchInputChange = (event: any) => {
            // Get the input value
            const inputValue = event.target.value;
            setSearchInput(inputValue);
            setSearchLoading(true);
    
            // Clear the timer if the user is still typing
            clearTimeout(timerId);
    
            // Set a new timer to fetch the data after 500ms
            const newTimerId = setTimeout(() => {
                SearchFetching(inputValue, setSearchData, setSearchLoading);
            }, 1000);
    
            // Store the timer id so we can clear it if the user is still typing
            setTimerId(newTimerId);
        };


    return (
        <>
            <SearchBar>
                <SearchLabel>SEARCH FOR A FINANCIAL INSTRUMENT</SearchLabel>
                <InputSection>
                    <SearchArea type="text" aria-label="Search" value={searchInput} onChange={handleSearchInputChange} placeholder='ENTER SYMBOL TO SEARCH'></SearchArea>
                    {searchLoading && <img src="/icons/loading-validation.svg" alt="" width={25} height={25}></img>}
                </InputSection>
            </SearchBar>
        </>
    );
}

export default HomeSearchBar;