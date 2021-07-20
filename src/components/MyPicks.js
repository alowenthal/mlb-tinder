import React, { useState } from 'react';
import styled from 'styled-components';

const MP_Container = styled.div`
  text-align: center;
`;

const PickMedia = styled.img`
	border-radius: 50%;
  width: 118px;
  pointer-events: none;
  display: inline-block;
  border: 1px solid #002366;

  -webkit-animation: reveal 0.6s ease;
  -webkit-animation-fill-mode: backwards;

  @-webkit-keyframes reveal {
    0%   {width: 0px;}
    100% { width: 118px;}
	}

	@keyframes reveal {
	    0%   {width: 0px;}
	    100% { width: 118px;}
	}
`;

const EmptyPick = styled.div`
	border-radius: 50%;
	height: 120px;
	width: 120px;
	background-color: #A9A9A9;
  display: inline-block;
`;

const PickContainer = styled.div`
	height: 120px;
	width: 120px;
	display: inline-block;
  text-align: center;
  margin-right: 8px;
  margin-top: 12px;
`

function MyPicks({ mySelections }) {

	let picks = [];

	for (let i = 0; i <= 5 ; i++) {
		if (mySelections[i]) {
			picks.push(
				<PickContainer key={i}>
					<PickMedia src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:silo:curr[…]max/w_120,q_auto:best/v1/people/${mySelections[i]}/headshot/silo/current`} />
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
