import ChartComponent from '../../components/Charts/Chart';

function HomeCards({ data }: any) {
    
    function expand(event: any) {
        const card = event.currentTarget;
        card.classList.toggle('profile--expanded');

        if (!card.classList.contains('profile--expanded')) card.classList.toggle('profile--unexpanded');
        else if (card.classList.contains('profile--expanded') && card.classList.contains('profile--unexpanded')) card.classList.toggle('profile--unexpanded');
    }

    return (
        <div>
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
    );
}

export default HomeCards;