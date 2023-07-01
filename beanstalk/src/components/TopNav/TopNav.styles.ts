import styled, { keyframes } from 'styled-components';

const gradientAnimation = keyframes`
    0%, 100% {background-position: 0% center; }
    50% {background-position: 100% center;}
`;

export const Title = styled.h1`
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans";;
  font-size: 2rem;
  font-weight: 800;
  background-image: linear-gradient(to right, #E98973, #FF8882, #E98973);
  background-size: 200% auto;
  -webkit-animation: ${gradientAnimation} 2s linear infinite;
  animation: ${gradientAnimation} 2s linear infinite;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin: 0;
  }
`;

export const Nav = styled.nav<{ pageScrolled: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.0rem 1.5rem;
  border-radius: 0em 0em 0.75em 0.75em;
  background-color: ${props => props.pageScrolled? 'rgba(255,255,255,1)': 'rgba(0,0,0,0)'};
  ${props => props.pageScrolled? 'box-shadow: 0 0 10px rgba(0, 0, 0, 0.3)': ''};
  position: sticky;
  top: 0;
  z-index: 999;
`;

export const SignUp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 1rem;
  border-radius: 0.25em;
  background-color: #88B2CC;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  gap: 5px;
  &:hover {
    background-color: #ea580c;
    }
    `;

export const SignUpButton = styled.a`
  text-decoration: none;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding-bottom: 5px;
  &:hover {
    color: #fff;
    }
    `;