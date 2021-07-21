import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../index.css';
import { IoCloseCircleSharp, IoHeartSharp } from 'react-icons/io5';

const CardContainer = styled.div`
  display: inline-block;
  width: 90vw;
  max-width: 400px;
  height: 70vh;
  color: #ffffff;
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
  position: relative;
`;

const CardMeta = styled.div`
  pointer-events: none;
`;

const CardTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  text-shadow: 1px 3px 3px #000000;
`;

const CardTeamLogo = styled.img`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  max-height: 40px;
  max-width: 40px;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: center;
`;

const CardButton = styled.button`
  padding: 1rem;
  margin: 1rem;
  background: none;
  border: none;
  font-size: 72px;
  color: #2ed573;
  background: white;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  display: flex;
  align-items: center;

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
      >
        <CardTitle>{info.name}</CardTitle>
        <CardTeamLogo src={`https://img.mlbstatic.com/mlb-photos/image/upload/w_64,h_64,c_pad/u_team:${info.teamID}:fill:spot,ar_1:1,w_100/r_max,f_png,q_auto:best/v1/team/${info.teamID}/logo/spot/current`} />
      </CardMedia>
      <CardMeta>
      </CardMeta>
      <CardActions>
        <CardButton onClick={handleNo} className="no"><IoCloseCircleSharp /></CardButton>
        <CardButton onClick={handleYes} className="yes"><IoHeartSharp /></CardButton>
      </CardActions>
    </CardContainer>
  );
}

export default Card;
