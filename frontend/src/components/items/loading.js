import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import styled from 'styled-components';

const Loading = () => {

  const Div = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  `;

  const SpinnerStyled = styled(Spinner)`
    margin-right: 20px;
  `;

  const AlertStyled = styled(Alert)`
      font-size: 0.85em;

  `;
  return (

    <Div>
      <AlertStyled variant="primary" disabled>
      <SpinnerStyled
        variant="primary"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
        Loading...
      </AlertStyled>
    </Div>
  )
}

export default Loading;