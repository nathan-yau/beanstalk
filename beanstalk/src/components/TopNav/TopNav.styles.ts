import styled, { keyframes } from 'styled-components';

export const gradientAnimation = keyframes`
    0%, 100% {background-position: 0% center; }
    50% {background-position: 100% center;}
`;

export const Title = styled.a`
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
  display: flex;
  }
`;

export const Nav = styled.nav<{ pageScrolled: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0.9rem 0.4rem 0.9rem;
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

export const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.25rem;
  border-radius: 500px;
  background-color: #88B2CC;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  gap: 5px;
`;

export const ProfileButton = styled.a`
  text-decoration: none;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding-bottom: 5px;
`

export const DropDown = styled.div`
  position: absolute;
  top: 4rem;
  right: 2rem;
  width: 9rem;
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 0.5rem 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease-in-out;
  display: block;
  z-index: 999;
`;

export const DropDownItem = styled.a`
  display: block;
  padding: 0.2rem 1rem;
  text-decoration: none;
  color: #000;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-bottom: 1px solid #eee;
`