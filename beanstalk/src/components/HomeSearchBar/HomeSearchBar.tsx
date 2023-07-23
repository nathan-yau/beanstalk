import { useState } from 'react';
import { SearchArea, SearchBar, SearchLabel, InputSection, FailedSearch } from './HomeSearchBar.styles';
import SearchFetching from '../../utils/SearchFetching';
import InstrumentCards from '../../components/MarketOverview/InstrumentCards';

function HomeSearchBar({authorized}: {authorized: boolean}) {
    interface SearchData {
        success: boolean;
      }

    const [searchLoading, setSearchLoading] = useState(false);
    const [searchData, setSearchData] = useState<SearchData | null>(null);
    const [searchInput, setSearchInput] = useState("");

        // Timer id for the timeout
        const [timerId, setTimerId] = useState<NodeJS.Timeout | undefined>(undefined);
    
        // Store the search input in the state
    
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
            {searchData && <InstrumentCards instrumentInfo={searchData} animationEnabled={false} mode="search" authorized={authorized}></InstrumentCards>}
            {!searchLoading && searchData && !searchData.success && searchInput !== "" && <FailedSearch>No Result found</FailedSearch>}

        </>
    );
}

export default HomeSearchBar;