
import './home.css'
import { useState } from 'react';
import HomeSearchBar from '../../components/HomeSearchBar/HomeSearchBar';
import OverviewPlaceholder, {OverviewHolder} from '../../components/InstrumentOverviewCards/InstrumentOverviewCards';
import { GuestCard, GuestCardText,  SignInLink,  Subheading } from './Home.styles'

function GuestHome() {

    // Store the fetched data in the state
    const [data, setData] = useState(null);
    
    const [searchLoading, setSearchLoading] = useState(false);

    return (
        <>
        <HomeSearchBar setData={setData} setSearchLoading={setSearchLoading}></HomeSearchBar>
        
        {data && <Subheading>Top Match</Subheading>}
        {searchLoading? <OverviewPlaceholder></OverviewPlaceholder>: null}
        {data && !searchLoading? <OverviewHolder data={data}></OverviewHolder>: null}

        <Subheading>Popular Instruments</Subheading>
        <OverviewPlaceholder></OverviewPlaceholder>
        <OverviewPlaceholder></OverviewPlaceholder>
        <OverviewPlaceholder></OverviewPlaceholder>
        <Subheading>Saved Watchlist</Subheading>
        <GuestCard>
            <GuestCardText>Already have an account? <SignInLink href="/signin">Sign in</SignInLink></GuestCardText>
        </GuestCard>
        
        </>
    );
}

export default GuestHome;