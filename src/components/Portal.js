import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Dialog = styled.dialog`
    width: 100vw;
    height: 100vh;
    background: pink;
    z-index: 10000;
    position: fixed;
    top: 0;
    border: none;
`;

function Portal({ portalState, setPortalState, portalContext, setPortalContext }) {

    function handleClose() {
        setPortalState(false);
    }

  return ReactDOM.createPortal(
    <Dialog open={portalState}>
      Player: + {portalContext}
      <button onClick={handleClose}>Close</button>
    </Dialog>,
    document.getElementById('portal-root')
  );
}

export default Portal;
