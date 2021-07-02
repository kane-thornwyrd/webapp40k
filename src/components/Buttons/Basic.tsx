import React, { MouseEvent } from 'react';
import styled, { css } from 'styled-components';

export type BasicProps = {
  label: string;
  onClick?: Function;
  color?: string;
  background?: string;
  hoverColor?: string;
  hoverBackground?: string;
};

const StyledButton = styled.button`
  position: relative;
  overflow: hidden;
  transition: background 400ms;
  padding: 0.5rem 1rem;
  outline: 0;
  border: 0;
  border-radius: 1.5rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
  cursor: pointer;

  ${({ color = '#fff' }) =>
    css`
      color: ${color};
    `};

  ${({ background = 'linear-gradient(to top, #1118C1 0%, #1118C1 100%)' }) =>
    css`
      background: ${background};
    `};

  ${({ hoverColor = '#fff' }) => css`
    &:hover {
      color: ${hoverColor};
    }
  `}

  ${({ hoverBackground = 'linear-gradient(to top, #2511fc 0%, #2575fc 100%)' }) =>
    css`
      &:hover {
        background: ${hoverBackground};
      }
    `};

  span.ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 600ms linear;
    opacity: 70%;
    background-image: linear-gradient(to top, #1118c1, #1118c1);
  }

  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

function createRipple(event: MouseEvent<HTMLInputElement>) {
  if (event.currentTarget === null) return;
  const button = event.currentTarget as HTMLElement;

  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add('ripple');
  circle.onclick = createRipple;

  setTimeout(() => circle.remove(), 500);

  button.appendChild(circle);
}

export const Basic: React.FC<BasicProps> = ({ label, onClick = () => null, ...props }) => (
  <StyledButton
    {...props}
    onClick={e => {
      createRipple(e as MouseEvent<HTMLInputElement>);
      onClick(e);
    }}
  >
    {label}
  </StyledButton>
);
