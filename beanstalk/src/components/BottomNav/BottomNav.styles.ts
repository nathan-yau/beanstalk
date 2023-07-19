import styled from "styled-components";

const transitionDuration = '0.3s';

export const BottomNavContainer = styled.nav<{ BottomNavopen: boolean}>`
  display: flex;
  position: fixed;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(231, 233, 245);
  padding: 0.25em 1.00em;
  border-radius: 0.50em;
  height: 50px;
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.5);
  transition: all ${transitionDuration};
  width: ${props => (props.BottomNavopen ? 'min(90%, 700px)' : '55px')};
  transition-property: background-color, box-shadow, width;
  justify-content: space-between;
  align-items: center;
  opacity: ${props => (props.BottomNavopen ? '0.95' : '0.7')};
`;

export const BottomNavIcon = styled.img<{ status?: boolean, animation?: boolean }>`
  color: #000;
  text-decoration: none;
  ${props => props.animation? `rotate: ${props.status ? '0deg' : '135deg'};`: null}
  ${props => props.status? null: `display: none;`}
  transition: rotate ${transitionDuration};
`;

export const BottomNavButton = styled.a`
    text-decoration: none;
`