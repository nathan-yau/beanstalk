import { useEffect, useState } from 'react';
import { Title, Nav, SignUp, SignUpButton, Profile, DropDown, DropDownItem } from './TopNav.styles';

function TopNav({authorized}: {authorized: boolean}) {
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
            <Profile>
                <img src="/icons/avatar-nav.svg" width="25px" onClick={ToggleDropDown}></img>
            </Profile>
            {dropDownOpen ? 
            <DropDown>
                <DropDownItem href="/profile">Nathan Yau</DropDownItem>
                <DropDownItem href="/dashboard">Credit: 1,000</DropDownItem>
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