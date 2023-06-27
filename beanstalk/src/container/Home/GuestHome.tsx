import { Title } from './Home.styles';
import { useState } from 'react';
import './home.css'
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

    function expand(event: any) {
        const card = event.currentTarget;
        card.classList.toggle('profile--expanded');

        if (!card.classList.contains('profile--expanded')) card.classList.toggle('profile--unexpanded');
        else if (card.classList.contains('profile--expanded') && card.classList.contains('profile--unexpanded')) card.classList.toggle('profile--unexpanded');
    }

    return (
        <>
        <Title>Beanstalk</Title>
        <div>
            <input className="flex-grow-1 px-3 border-0 search-bar" type="text" placeholder="SEARCH FOR A FINANCIAL INSTRUMENT"
                        aria-label="Search" value={searchInput} onChange={handleSearchInputChange}></input>       
        { data && 
            <div className="profile" onClick={(event) => expand(event)}>
                <div className="profile__info">
                    <span className="profile__info-display">{data['stockMeta']['symbol']} </span>
                    <span className="profile__info-username">{data['stockMeta']['instrumentType']} ({data['stockMeta']['exchangeName']})</span>
                </div>
                {/* <div>
                    <div className="profile__pic">
                        <img src="https://i.imgur.com/mQvmS3c.jpg?1" alt="Profile picture of Cho Miyeon" />
                    </div>
                </div> */}
                <div className="profile__data">
                    <ChartComponent chartData={data['chartData']} meta={data['stockMeta']}></ChartComponent>
                </div>
            </div>
        }
        </div>
        </>
    );
}

export default GuestHome;