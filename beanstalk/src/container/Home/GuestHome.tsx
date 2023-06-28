
import './home.css'
import { useState } from 'react';
import HomeSearchBar from '../../components/HomeSearchBar/HomeSearchBar';
import HomeCards from '../../components/HomeCards/HomeCards';
import OverviewPlaceholder from '../../components/InstrumentOverviewCards/InstrumentOverviewCards';
import { GuestCard, GuestCardText,  SignInLink,  Subheading } from './Home.styles'

function GuestHome() {

    // Store the fetched data in the state
    const [data, setData] = useState(null);
      
    return (
        <>
        <HomeSearchBar setData={setData}></HomeSearchBar>
        <HomeCards data={data}></HomeCards>
        <Subheading>Top Match</Subheading>
        <OverviewPlaceholder></OverviewPlaceholder>
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