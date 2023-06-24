import { Title } from './Home.styles';
import { useState } from 'react';
import ChartComponent from '../../components/Chart';

function GuestHome() {
    // Store the fetched data in the state
    const [data, setData] = useState(null);

    // Timer id for the timeout
    const [timerId, setTimerId] = useState<NodeJS.Timeout | undefined>(undefined);

    // Store the search input in the state
    const [searchInput, setSearchInput] = useState("");

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
                console.log(data)
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
        <Title>Beanstalk</Title>
        <div>
            <input className="flex-grow-1 px-3 border-0 search-bar" type="text" placeholder="SEARCH FOR A FINANCIAL INSTRUMENT"
                        aria-label="Search" value={searchInput} onChange={handleSearchInputChange}></input>
            {data ? 
            <>
            <ChartComponent chartData={data['chartData']} meta={data['stockMeta']}></ChartComponent>
            </>:
            <h1 className="head_text">No Result</h1>
            }
        </div>
        </>
    );
}

export default GuestHome;