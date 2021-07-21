import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../index.css';
import { IoCloseOutline, IoHeartSharp } from 'react-icons/io5';

const CardContainer = styled.div`
  display: inline-block;
  width: 90vw;
  max-width: 400px;
  height: 70vh;
  background: #333333;
  color: #ffffff;
  padding-bottom: 40px;
  overflow: hidden;
  position: absolute;
  will-change: transform;
  transition: all 0.3s ease-in-out;
  cursor: -webkit-grab;
  cursor: -moz-grab;
  cursor: grab;
`;

const CardMedia = styled.div`
  background: #f8f8f8;
  background-image: url(${props => props.img});
  background-position: center;
  background-size: cover;
  display: block;
  height: 300px;
  width: 100%;
  border-radius: 6px;
`;

const CardMeta = styled.div`
  pointer-events: none;
`;

const CardTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  pointer-events: none;
`;

const CardSecondary = styled.div`
  font-size: 16px;
  font-weight: 400;
`;

const CardPosition = styled.div`
  font-size: 16px;
  font-weight: 400;
`;

const CardActions = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`;

const CardButton = styled.button`
  padding: 1rem;
  margin: 1rem;
  background: none;
  border: none;
  font-size: 72px;

  &.no {
    color: #ff4757;
  }

  &.yes {
    color: #2ed573;
  }
`;

function Card({id, available, setAvailable, mySelections, setMySelections, setPortalState, portalContext, setPortalContext}) {
  const [info, setInfo] = useState({});

  useEffect(() => {
    fetch(`https://statsapi.mlb.com/api/v1/people/${id}?hydrate=currentTeam,social`)
      .then(response => response.json())
      .then(data => {
        const person = data.people[0];
        const player = available.filter((obj) => obj.gsx$playerid.$t === id)[0];
        setInfo({
          name: person.useName + " " + person.lastName,
          nickname: player.gsx$nickname.$t,
          team: person.currentTeam.name,
          teamID: person.currentTeam.id,
          position: person.primaryPosition.name,
          number: person.primaryNumber,
          country: person.birthCountry,
          hometown: player.gsx$hometown.$t,
          fun_fact: player.gsx$funfact.$t,
          height: person.height,
          weight: person.weight,
          age: person.currentAge,
          birthday: person.birthDate,
          funImage: player.gsx$imagesrc.$t,
          gif: player.gsx$gifsrc.$t,
          walkUpMusic: {
            name: player.gsx$walkupsong.$t,
            src: player.gsx$walkupsongsrc.$t,
          },
          social: person.social ? {
            twitter: person.social.twitter ? person.social.twitter[0] : '',
            instagram: person.social.instagram ? person.social.instagram[0] : ''
          } : ''
        });
      });
  }, [info]);

  function handleYes() {
    setMySelections(mySelections => [...mySelections, id]);

    const updatedAvailable = available.filter((obj) => obj.gsx$playerid.$t !== id);
    setAvailable(updatedAvailable);
  }

  function handleNo() {
    const updatedAvailable = available.filter((obj) => obj.gsx$playerid.$t !== id);
    setAvailable(updatedAvailable);
  }

  function handleOpen() {
    setPortalState(true);
    setPortalContext({
      id,
      name: info.name,
      nickname: info.nickname,
      team: info.team,
      teamID: info.teamID,
      position: info.position,
      number: info.number,
      country: info.country,
      hometown: info.hometown,
      fun_fact: info.fun_fact,
      height: info.height,
      weight: info.weight,
      age: info.age,
      birthday: info.birthday,
      walkUpMusicName: info.walkUpMusic.name,
      walkUpMusicSRC: info.walkUpMusic.src,
      twitter: info.social.twitter,
      instagram: info.social.instagram,
      gif: info.gif
    });
  }

  function handleError(ev) {
    ev.target.src = 'https://www.mlbstatic.com/team-logos/share/mlb.jpg';
  }

  return (
    <CardContainer>
      <CardMedia 
        img={info.funImage}
        onClick={handleOpen}
      />
      <CardMeta>
        <CardTitle>{info.name}</CardTitle>
        <CardSecondary>{info.team}</CardSecondary>
        <CardPosition>{info.position}</CardPosition>
      </CardMeta>
      <CardActions>
        <CardButton onClick={handleNo} className="no"><IoCloseOutline /></CardButton>
        <CardButton onClick={handleYes} className="yes"><IoHeartSharp /></CardButton>
      </CardActions>
    </CardContainer>
  );
}

export default Card;
