import React, { useState } from 'react';
import styled from 'styled-components';

const MP_Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 1rem;
`;

const PickMedia = styled.img`
	border-radius: 50%;
	width: 60px;
	pointer-events: none;
	display: inline-block;
	border: 2px solid #40DAF9;
	background: white;

	-webkit-animation: reveal 0.6s ease;
	-webkit-animation-fill-mode: backwards;

  @-webkit-keyframes reveal {
    0%   {width: 0px;}
    100% { width: 60px;}
	}

	@keyframes reveal {
	    0%   {width: 0px;}
	    100% { width: 60px;}
	}
`;

const EmptyPick = styled.div`
	border-radius: 50%;
	height: 60px;
	width: 60px;
	background-color: #A9A9A9;
	display: inline-block;
`;

const PickContainer = styled.div`
	height: 60px;
	width: 60px;
	display: inline-block;
	text-align: center;
	margin-right: 8px;
	margin-top: 12px;
`

function MyPicks({ mySelections }) {

	let picks = [];

	for (let i = 0; i <= 4 ; i++) {
		if (mySelections[i]) {
			picks.push(
				<PickContainer key={i}>
					<PickMedia src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:silo:curr[…]max/w_60,q_auto:best/v1/people/${mySelections[i]}/headshot/silo/current`} />
				</PickContainer>
			)
		} else {
			picks.push(
				<PickContainer key={i}>
					<EmptyPick />
				</PickContainer>
			)
		}
	};

  return (
    <MP_Container>
    	{picks}
    </MP_Container>
  );
}

export default MyPicks;
