import styled, { keyframes } from 'styled-components';

const gradientAnimation = keyframes`
    0%, 100% {background-position: 0% center; }
    50% {background-position: 100% center;}
`;

export const Title = styled.h1`
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans";;
  font-size: 2rem;
  font-weight: 800;
  background-image: linear-gradient(to right, #f59e0b, #ea580c, #eab308);
  background-size: 200% auto;
  -webkit-animation: ${gradientAnimation} 2s linear infinite;
  animation: ${gradientAnimation} 2s linear infinite;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  }
`;
