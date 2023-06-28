import styled from 'styled-components';


export const HomeContainer = styled.div`
    margin: 1rem 1.5rem 1rem 1.5rem;
`

export const Subheading = styled.h5`
    font-size: 1rem;
    font-weight: 600;
    margin-top: 1rem;
`

export const GuestCardText = styled.span`
    font-size: 1rem;
    font-weight: 600;
    margin-top: 1rem;
    margin-left: 1rem;
    color: #000;
    text-decoration: none;
`

export const GuestCard = styled.div`
    width: min(100%, 500px);
    height: 50px;
    background-color: #fff;
    padding: 10px;
    border-radius: 0.25em;
    border: 1px solid #ccc;
}`

export const SignInLink = styled.a`
    text-decoration: none;
    display: inline-block;
    position: relative;
    margin-left: 1rem;
    &:after{
        content: "";
        position: absolute;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #0561EE;
        transform: scaleX(0);
        transition: transform 0.25s;
        bottom: -3px;
        transform-origin: left;
    }

    &:hover::after {
        transform: scaleX(1);
    }
`