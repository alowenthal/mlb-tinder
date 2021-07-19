import React, { useState } from 'react';
import styled from 'styled-components';
import Card from './Card';

const CardsContainer = styled.div`
  flex-grow: 1;
  padding-top: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1;
`;

function Cards({ available, setAvailable, mySelections, setMySelections }) {
  const players = available.map((player) => <Card id={player.id} available={available} setAvailable={setAvailable} type={player.type} wildCard={player.wildCard} mySelections={mySelections} setMySelections={setMySelections} />)

  return (
    <CardsContainer>
      {players}
    </CardsContainer>
  );
}

export default Cards;
