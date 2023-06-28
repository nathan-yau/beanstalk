import { useEffect, useState } from 'react';
import { Title, Nav, SignUp, SignUpButton } from './TopNav.styles';

function TopNav() {
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

    const navrbarPosition = ScrollingEvents();
    console.log(navrbarPosition)

    return (
        <Nav pageScrolled={navrbarPosition}>
            <Title>Beanstalk</Title>
            <SignUp>
                <SignUpButton href="/register">Sign Up</SignUpButton>
            </SignUp>
        </Nav>
    )
}

export default TopNav;