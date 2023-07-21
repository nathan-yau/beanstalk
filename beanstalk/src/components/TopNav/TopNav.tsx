import { useEffect, useState } from 'react';
import { Title, Nav, SignUp, SignUpButton, Profile, DropDown, DropDownItem } from './TopNav.styles';

function TopNav({authorized, userInfo}: {authorized: boolean, userInfo: any}) {
    function ScrollingEvents() {
        const [scrolled, setScrolled] = useState(false);
    
        useEffect(() => {
            const handleScroll = () => {
                const isScrolled = window.scrollY > 0;
                setScrolled(isScrolled);
            };
    
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, []);
    
        return scrolled;
    }

    const [dropDownOpen, setDropDownOpen] = useState(false);

    const ToggleDropDown = () => {
        setDropDownOpen(!dropDownOpen);
    }

    const navrbarPosition = ScrollingEvents();
    
    return (
        <Nav pageScrolled={navrbarPosition}>
            <Title href="/">Beanstalk</Title>
            {authorized ? 
            <>
            <div style={{display: "flex", gap: "25px", height: "30px"}}>
                <div style={{display: "flex", gap: "5px", alignItems: "center", justifyContent: "center", textAlign: "center"}}>
                    <img src="/icons/auto-nav.svg"  width={"25px"} height={'25px'} style={{transform: "rotate(90deg)"}}></img>
                    <span style={{fontWeight: "600"}}>Auto</span>
                </div>
                <Profile>
                    <img src="/icons/avatar-nav.svg" width="25px" onClick={ToggleDropDown}></img>
                </Profile>
            </div>
            {dropDownOpen ? 
            <DropDown>
                <DropDownItem href="/profile">{userInfo.username}</DropDownItem>
                <DropDownItem href="/dashboard">Credit: {userInfo.credit}</DropDownItem>
                <DropDownItem href="/trading">Profile</DropDownItem>
                <DropDownItem href="/logout">Logout</DropDownItem>
            </DropDown>: ""}
            </>:
            <SignUp>
                <SignUpButton href="/register">Sign Up</SignUpButton>
            </SignUp>}
        </Nav>
    )
}

export default TopNav;