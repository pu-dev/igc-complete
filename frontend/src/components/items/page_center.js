import styled from 'styled-components';


export const PageCenter = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
`;

export const PageCenter2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  `;