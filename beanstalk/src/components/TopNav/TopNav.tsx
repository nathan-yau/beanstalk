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

    const [autoUpdate, setAutoUpdate] = useState(false);

    const ToggleAutoUpadte = () => {
        setAutoUpdate(!autoUpdate);
    }


    const [dropDownOpen, setDropDownOpen] = useState(false);

    const ToggleDropDown = () => {
        setDropDownOpen(!dropDownOpen);
    }

    const navrbarPosition = ScrollingEvents();
    
    console.log(autoUpdate)
    return (
        <Nav pageScrolled={navrbarPosition}>
            <Title href="/">Beanstalk</Title>
            {authorized ? 
            <>
            <div style={{display: "flex", gap: "5px", height: "30px", alignItems: "center", justifyContent: "center"}}>
                {/* <div style={{display: "flex", gap: "5px", alignItems: "center", justifyContent: "center", textAlign: "center"}}>
                    <img src="/icons/auto-nav.svg"  width={"25px"} height={'25px'} style={{transform: "rotate(90deg)"}}></img>
                    <span style={{fontWeight: "600"}}>Auto</span>
                </div> */}
                <div style={{display: "flex", gap: "5px", alignItems: "center", justifyContent: "center", textAlign: "center", border: "0px solid black", padding: "0em 0.50em 0.25em 0em", borderRadius: "5rem"}}>
                    <img src={autoUpdate? "/icons/auto-nav.svg": "/icons/not-auto-nav.svg"}  width={"50px"} height={'40px'} onClick={ToggleAutoUpadte}></img>
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