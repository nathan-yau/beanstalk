import { useEffect, useState } from 'react';
import { Title, Nav, SignUp, SignUpButton } from './TopNav.styles';

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

    const navrbarPosition = ScrollingEvents();
    
    return (
        <Nav pageScrolled={navrbarPosition}>
            <Title href="/">Beanstalk</Title>
            {authorized ? null:
            <SignUp>
                <SignUpButton href="/register">Sign Up</SignUpButton>
            </SignUp>}
        </Nav>
    )
}

export default TopNav;