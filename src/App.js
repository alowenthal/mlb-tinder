import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactAudioPlayer from 'react-audio-player';
import { IoVolumeMedium, IoVolumeMuteSharp, IoLogoFacebook, IoLogoTwitter, IoLogoInstagram } from 'react-icons/io5';
import Confetti from 'react-confetti'
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
  background: #8854d0;
  background-image: linear-gradient(to bottom, #824d9f, #8a82bd, #5ecae8);
`;

const Header = styled.div`
  padding: 1rem;
  text-align: center;
  background: #333333;
`;
const Logo = styled.img`
  max-width: 250px;
`;

const Congrats = styled.div`
  color: #ffffff;
  padding: 1rem;
  font-size: 26px;
  font-weight: 700;
  text-align: center;
`;

const Heavy = styled.div`
  color: #ffffff;
  padding: 1rem;
  font-size: 48px;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
`;

const SoundPlayer = styled.div``;

const MuteButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 28px;
  position: absolute;
  top: 1.5rem;
  right: 1rem;
`;

const SharePicks = styled.div`
  padding: 1rem;
  color: #ffffff;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

const ShareIcons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 36px;

  svg {
    padding: 1rem;
  }
`;

function App() {
  const [available, setAvailable] = useState([]);
  const [mySelections, setMySelections] = useState([]);
  const [portalState, setPortalState] = useState(false);
  const [portalContext, setPortalContext] = useState({});
  const [complete, setComplete] = useState(false);
  const [activeSong, setActiveSong] = useState('');
  const [mute, setMute] = useState(false);

  useEffect(() => {
    if (available.length > 0) {
      setActiveSong(available[available.length - 1].gsx$walkupsongsrc.$t);
    } else {
      setActiveSong('');
    }
  }, [available]);

  useEffect(() => {
    if (mySelections.length >= 5) {
      setComplete(true);
      setAvailable([]);
    }
  }, [mySelections]);

  useEffect(() => {
    fetch("https://spreadsheets.google.com/feeds/list/1uA4DvmZ3UXF7K9rjS1L1RKaQd8LE298EEZ-oUvm1WO4/od6/public/values?alt=json")
      .then(response => response.json())
      .then(data => {
        setAvailable([...data.feed.entry]);
      });
  }, []);

  function handleMute() {
    setMute(!mute);
  }

  return (
    <AppContainer>
      <Header>
        <Logo src="https://assets.codepen.io/7022/on_deck_logo_final+%281%29.png" />
      </Header>
      {complete && <Confetti
        width={1000}
        height={1300}
      />}
      <MyPicks mySelections={mySelections} />
      {!complete && <Cards 
        available={available} 
        setAvailable={setAvailable} 
        mySelections={mySelections} 
        setMySelections={setMySelections}
        setPortalState={setPortalState} 
        portalContext={portalContext} 
        setPortalContext={setPortalContext}
      />}
      {complete && <Congrats>Week One Picks<Heavy>Complete!</Heavy></Congrats>}
      {complete && (
        <SharePicks>
          <h3>Share Your Picks:</h3>
          <ShareIcons>
            <IoLogoFacebook />
            <IoLogoTwitter />
            <IoLogoInstagram />
          </ShareIcons>
        </SharePicks>
      )}
      {!complete && <SoundPlayer>
        <ReactAudioPlayer
            src={activeSong}
            autoPlay
            muted={mute}
        />
      </SoundPlayer>}
      {!complete && <MuteButton onClick={handleMute}>
        {mute ? <IoVolumeMuteSharp /> : <IoVolumeMedium />}
      </MuteButton>}
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
