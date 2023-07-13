import styled from "styled-components";

const transitionDuration = '0.3s';

export const BottomNavConatiner = styled.nav<{ BottomNavopen: boolean }>`
    position: fixed;
    bottom: 60px;
    left: 50%;
    transform: translateX(${props => props.BottomNavopen? '-50%': '-150%' });
    background-color: rgba(231, 233, 245);
    padding: 1em;
    border-radius: 1.50em;
    box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.5);
    transition: background-color ${transitionDuration}, box-shadow ${transitionDuration};
    width: min(90%, 700px);
    transition: transform ${transitionDuration};
`

export const OpenArrow = styled.img<{ BottomNavopen: boolean }>`
    position: absolute;
    bottom: 5px;
    left: 95%;
    ${props => props.BottomNavopen? 'transform: rotate(180deg)': ''};
    transition: transform 0.5s;
`

export const FunctionList = styled.div`
    display: flex;
    justify-content: space-between;
    list-style: none;
    margin: 0;
    padding: 0 5px;
`

export const BottomNavList = styled.ul`
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0 5px;
`

export const BottomNavItem = styled.li`
    display: flex;
    justify-content: space-between;
    list-style: none;
`

export const BottomNavIcon = styled.img`
    color: #000;
    text-decoration: none;
`

export const BottomNavText = styled.span`
    color: #000;
    text-decoration: none;
    font-size: 0.75em;
    margin-top: 0.25em;
    font-weight: 600;
`

export const BottomNavButton = styled.a`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    text-align: center;
    width: 3em;
    height: 3em;
    text-decoration: none;
`