import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PortalWithState } from 'react-portal';

const CardContainer = styled.div`
  display: inline-block;
  width: 90vw;
  max-width: 400px;
  height: 70vh;
  background: #FFFFFF;
  padding-bottom: 40px;
  border-radius: 8px;
  overflow: hidden;
  position: absolute;
  will-change: transform;
  transition: all 0.3s ease-in-out;
  cursor: -webkit-grab;
  cursor: -moz-grab;
  cursor: grab;
`;

const CardMedia = styled.img`
  max-width: 100%;
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
`;

function Card({id, available, setAvailable, mySelections, setMySelections, setPortalState, portalContext, setPortalContext}) {
  const [info, setInfo] = useState({});

  useEffect(() => {
    fetch(`https://statsapi.mlb.com/api/v1/people/${id}?hydrate=currentTeam`)
      .then(response => response.json())
      .then(data => {
        const person = data.people[0];
        setInfo({
          name: person.useName + " " + person.lastName,
          team: person.currentTeam.name,
          position: person.primaryPosition.name,
          number: person.primaryNumber,
          country: person.birthCountry,
          height: person.height,
          weight: person.weight,
          age: person.age
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
      team: info.team,
      position: info.position,
      number: info.number,
      country: info.country,
      height: info.height,
      weight: info.weight,
      age: info.age
    });
  }

  function handleError(ev) {
    ev.target.src = 'https://www.mlbstatic.com/team-logos/share/mlb.jpg';
  }

  return (
    <CardContainer>
      <CardMedia 
        src={`https://img.mlbstatic.com/mlb-photos/image/upload/w_240,h_382,g_auto,c_fill,q_auto:best/v1/people/${id}/action/vertical/current`}
        onClick={handleOpen} 
        onError={handleError}
      />
      <CardMeta>
        <CardTitle>{info.name}</CardTitle>
        <CardSecondary>{info.team}</CardSecondary>
        <CardPosition>{info.position}</CardPosition>
      </CardMeta>
      <CardActions>
        <CardButton onClick={handleNo}>No</CardButton>
        <CardButton onClick={handleYes}>Yes</CardButton>
      </CardActions>
    </CardContainer>
  );
}

export default Card;
