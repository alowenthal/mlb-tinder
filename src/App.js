import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MyPicks from './components/MyPicks';
import Cards from './components/Cards';
import Portal from './components/Portal';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: opacity 0.1s ease-in-out;
  background: #333333;
`;

const Header = styled.div`
  padding: 1rem;
  text-align: center;
`;
const Logo = styled.img`
  max-width: 250px;
`;

function App() {
  const [available, setAvailable] = useState([]);
  const [mySelections, setMySelections] = useState([]);
  const [portalState, setPortalState] = useState(false);
  const [portalContext, setPortalContext] = useState({});

  useEffect(() => {
    fetch("https://spreadsheets.google.com/feeds/list/1uA4DvmZ3UXF7K9rjS1L1RKaQd8LE298EEZ-oUvm1WO4/od6/public/values?alt=json")
      .then(response => response.json())
      .then(data => {
        setAvailable([...data.feed.entry]);
      });
  }, []);

  return (
    <AppContainer>
      <Header>
        <Logo src="https://assets.codepen.io/7022/on_deck_logo_small.png" />
      </Header>
      <MyPicks mySelections={mySelections} />
      <Cards 
        available={available} 
        setAvailable={setAvailable} 
        mySelections={mySelections} 
        setMySelections={setMySelections}
        setPortalState={setPortalState} 
        portalContext={portalContext} 
        setPortalContext={setPortalContext}
      />
      <Portal 
        portalState={portalState} 
        setPortalState={setPortalState} 
        portalContext={portalContext} 
        setPortalContext={setPortalContext}
      />
    </AppContainer>
  );
}

export default App;
