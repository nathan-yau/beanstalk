import { useState } from 'react';
import { BottomNavContainer, BottomNavIcon, BottomNavButton } from "./BottomNav.styles"

function BottomNav({authorized}: {authorized: boolean}) {
    const [BottomNavopen, setBottomNavopen] = useState(true);
    
    const ToggleNav = () => {
        setBottomNavopen(!BottomNavopen);
    }

    return (
        <BottomNavContainer BottomNavopen={BottomNavopen}>
            {authorized ?
            <>
                <BottomNavButton href="\search"><BottomNavIcon src={'icons/search-nav.svg'} width="25px" status={BottomNavopen}/></BottomNavButton>
                <BottomNavButton href="\"><BottomNavIcon src={'icons/home-nav.svg'} width="25px" status={BottomNavopen}/></BottomNavButton>
                <BottomNavIcon src={'icons/menu-nav.svg'} width="25px" onClick={ToggleNav} animation={true} status={BottomNavopen} style={{display: "unset"}}/>
                <BottomNavButton href="\dashboard"><BottomNavIcon src={'icons/dashboard-nav.svg'} width="25px" status={BottomNavopen}/></BottomNavButton>
                <BottomNavButton href="\trading"><BottomNavIcon src={'icons/simulation-nav.svg'} width="25px" status={BottomNavopen}/></BottomNavButton>
            </>
            :
            <>
                <BottomNavButton href="\search"><BottomNavIcon src={'icons/search-nav.svg'} width="25px" status={BottomNavopen}/></BottomNavButton>
                <BottomNavButton href="\"><BottomNavIcon src={'icons/home-nav.svg'} width="25px" status={BottomNavopen}/></BottomNavButton>
                <BottomNavIcon src={'icons/menu-nav.svg'} width="25px" onClick={ToggleNav} animation={true} status={BottomNavopen} style={{display: "unset"}}/>
                <BottomNavButton href="\about"><BottomNavIcon src={'icons/about-nav.svg'} width="25px" status={BottomNavopen}/></BottomNavButton>
                <BottomNavButton href="\signin"><BottomNavIcon src={'icons/login-nav.svg'} width="25px" status={BottomNavopen}/></BottomNavButton>
            </>
}
        </BottomNavContainer>

    )
}

export default BottomNav;