import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Dialog = styled.dialog`
    width: 100vw;
    height: 100vh;
    z-index: 10000;
    position: fixed;
    top: 0;
    border: none;
    padding: 0rem;
    background: #333333;

    &[open] {
        display: flex;
        flex-flow: column wrap;
        align-items: flex-start;
    }
`;

const Close = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: white;
`;

const Hero = styled.div`
    background-image: url(${props => props.img});
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 200px;
`;

const PlayerInfo = styled.section`
    padding: 1rem;
    display: flex;
`;

const Headshot = styled.img`
    margin-top: -5rem;
    width: 120px;
    height: 120px;
`;

const PlayerMeta = styled.div`
    margin-left: 1rem;
    color: white;
`;

const PlayerTeam = styled.div`
    color: #f1f1f1;
    text-transform: uppercase;
    font-size: 12px;
`;
const PlayerName = styled.div`
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 0.25rem;
`;
const PlayerDetails = styled.div`
    color: #f1f1f1;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 700;
`;


function Portal({ portalState, setPortalState, portalContext, setPortalContext }) {

    function handleClose() {
        setPortalState(false);
    }

    const {
        id,
        name,
        team,
        position,
        number,
        country,
        height,
        weight,
        age
    } = portalContext;

  return ReactDOM.createPortal(
    <Dialog open={portalState}>
        <Hero img={`https://img.mlbstatic.com/mlb-photos/image/upload/w_1000,q_100/v1/people/${id}/action/hero/current`}>
            <Close onClick={handleClose}>Close</Close>
        </Hero>
        <PlayerInfo>
            <Headshot src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:silo:current.png,u_team:119:fill:spot,fl_relative,w_1.0/r_max/w_120,q_auto:best/v1/people/${id}/headshot/silo/current`} />
            <PlayerMeta>
                <PlayerTeam>{team}</PlayerTeam>
                <PlayerName>{name} #{number}</PlayerName>
                <PlayerDetails>{position} | {height} | {weight} lbs</PlayerDetails>
            </PlayerMeta>
        </PlayerInfo>
        
    </Dialog>,
    document.getElementById('portal-root')
  );
}

export default Portal;
