import { useEffect, useState } from 'react';
import { BottomNavConatiner, BottomNavList, OpenArrow, FunctionList, BottomNavButton, BottomNavIcon, BottomNavItem, BottomNavText } from "./BottomNav.styles"

function BottomNav({authorized}: {authorized: boolean}) {
    const guestUser = [['Search', 'icons/search-nav.svg', "/search"],['Login','icons/login-nav.svg', "/signin"],['Register','icons/register-nav.svg', "/register"]]
    const authUser = [['Search','icons/search-nav.svg', "/search"],['Dashboard','icons/dashboard-nav.svg',"/dashboard"],['Simulation','icons/simulation-nav.svg',"/trading"],['Profile','icons/profile-nav.svg',"/profile"]]

    const [BottomNavopen, setBottomNavopen] = useState(true);


    const ToggleNav = () => {
        setBottomNavopen(!BottomNavopen);
    }

    useEffect(() => {
        setTimeout(() => {
            setBottomNavopen(false);
        }, 2000);
    }, []);

    return (
        <BottomNavConatiner BottomNavopen={BottomNavopen}>
            <BottomNavList>
                <FunctionList>
                    {authorized? authUser.map((element, _) => {
                        return (
                        <BottomNavItem key={element[0]}>
                            <BottomNavButton href={element[2]}>
                                <BottomNavIcon src={element[1]} width="30px"/>
                                <BottomNavText>{element[0]}</BottomNavText>
                            </BottomNavButton>
                        </BottomNavItem>
                    )}):guestUser.map((element, _) => {
                        return (
                        <BottomNavItem key={element[0]}>
                            <BottomNavButton href={element[2]}>
                                <BottomNavIcon src={element[1]} width="30px"/>
                                <BottomNavText>{element[0]}</BottomNavText>
                            </BottomNavButton>
                        </BottomNavItem>
                    )})}
                </FunctionList>
                <OpenArrow src="/icons/open-nav.svg" className="bav-open" width="40px" onClick={ToggleNav} BottomNavopen={BottomNavopen}/>
            </BottomNavList>
        </BottomNavConatiner>
    )
}

export default BottomNav;