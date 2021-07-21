import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import ReactAudioPlayer from 'react-audio-player';
import { FaInstagram, FaTwitter } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import Videos from './Videos';

const Dialog = styled.dialog`
    width: 100vw;
    z-index: 10000;
    overflow-y: auto;
    border: none;
    padding: 0rem;
    background: #133452;
    position: fixed;

    &[open] {
        display: flex;
        flex-flow: column wrap;
        align-items: flex-start;
        padding-bottom: 5rem;
        top: 0;

        -webkit-animation: reveal 0.2s ease;
	    -webkit-animation-fill-mode: backwards;
    }

    @-webkit-keyframes reveal {
        0%   {top: 1000px;}
        100% { top: 0px;}
    }

    @keyframes reveal {
        0%   {top: 1000px;}
        100% { top: 0px;}
    }
`;

const Close = styled.button`
    position: absolute;
    top: 0px;
    right: 0px;
    background: none;
    border: none;
    color: white;
    padding: 1rem;
    font-size: 26px;
`;

const Hero = styled.div`
    background-image: url(${props => props.img});
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 200px;
    position: relative;
`;

const PlayerInfo = styled.section`
    padding: 1rem;
    display: flex;
`;

const Headshot = styled.img`
    margin-top: -5rem;
    width: 120px;
    height: 120px;
    z-index: 1000;
    position: relative;
    display: block;
`;

const Left = styled.div`
    display: flex;
    flex-flow: column wrap;
    align-items: center;
`;

const PlayerMeta = styled.div`
    margin-left: 1rem;
    color: white;
`;

const Eyebrow = styled.div`
    color: #f1f1f1;
    text-transform: uppercase;
    font-size: 12px;
`;

const Eyebrow2 = styled.div`
    color: #f1f1f1;
    font-size: 20px;
    font-weight: 700;
`;

const PlayerNickName = styled.div`
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 0.25rem;
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    color: #ffffff;
    text-shadow: 1px 3px 3px #000000;
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

const InfoSection = styled.section`
    padding: 1rem;
    color: #ffffff;
    display: grid;
    grid-template-columns: 50% 50%;
`;

const VideoSection = styled.section`
    padding: 1rem;
    color: #ffffff;
    width: 100%
`;

const SocialIcon = styled.a`
    color: #ffffff;
    font-size: 26px;
    padding: 1rem 0.25rem;
    display: inline-block;
`;

function Portal({ portalState, setPortalState, portalContext, setPortalContext }) {

    function handleClose() {
        setPortalState(false);
    }

    const {
        id,
        name,
        nickname,
        team,
        teamID,
        position,
        number,
        hometown,
        fun_fact,
        walkUpMusicName,
        walkUpMusicSRC,
        height,
        weight,
        age,
        birthday,
        twitter,
        instagram,
        gif
    } = portalContext;

  return ReactDOM.createPortal(
    <Dialog open={portalState}>
        <Hero img={gif}>
            <Close onClick={handleClose}><IoCloseOutline /></Close>
            <PlayerNickName>"{nickname}"</PlayerNickName>
        </Hero>
        <PlayerInfo>
            <Left>
                <Headshot src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:silo:current.png,u_team:${teamID}:fill:spot,fl_relative,w_1.0/r_max/w_120,q_auto:best/v1/people/${id}/headshot/silo/current`} />
                <div>
                    {twitter && <SocialIcon href={`https://www.twitter.com/${twitter}`} target="_blank"><FaTwitter /></SocialIcon>}
                    {instagram && <SocialIcon href={`https://www.instagram.com/${instagram}`} target="_blank"><FaInstagram /></SocialIcon>}
                </div>
            </Left>
            <PlayerMeta>
                <Eyebrow>{team}</Eyebrow>
                <PlayerName>{name} #{number}</PlayerName>
                <PlayerDetails>{position} | {height} | {weight} lbs</PlayerDetails>
                <PlayerDetails>Age: {age} | Birthday: {birthday}</PlayerDetails>
            </PlayerMeta>
        </PlayerInfo>
        <InfoSection className="info">
            <div>
                <Eyebrow2>Hometown</Eyebrow2>
                <p>{hometown}</p>
            </div>
            <div>
                <Eyebrow2>Fun Fact</Eyebrow2>
                <p>{fun_fact}</p>
            </div>
            <div>
                <Eyebrow2>Walk Up Music</Eyebrow2>
                <p>{walkUpMusicName}</p>
                <ReactAudioPlayer
                    src={walkUpMusicSRC}
                    controls
                />
            </div>
        </InfoSection>
        <VideoSection className="videos">
            <h2>Videos</h2>
            <Videos id={id} />
        </VideoSection>
    </Dialog>,
    document.getElementById('portal-root')
  );
}

export default Portal;
