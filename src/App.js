import React, { useState } from 'react';
import styled from 'styled-components';
import { players } from './data/players';
import Cards from './Cards';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: opacity 0.1s ease-in-out;
`;

function App() {
  const [available, setAvailable] = useState([...players]);
  const [mySelections, setMySelections] = useState([]);

  return (
    <AppContainer>
      <Cards available={available} setAvailable={setAvailable} mySelections={mySelections} setMySelections={setMySelections} />
    </AppContainer>
  );
}

export default App;
