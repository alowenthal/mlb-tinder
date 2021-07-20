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

	let id;

	mySelections.forEach(function (selection) {
		id = selection;
	});

	// This repitition is pretty gross and should be refactored
  return (
    <MP_Container>

    	<PickContainer>
	      {mySelections.length >= 1
	        ? <PickMedia src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:silo:curr[…]max/w_120,q_auto:best/v1/people/${mySelections[0]}/headshot/silo/current`} />
	        : <EmptyPick />
	      }
	    </PickContainer>

    	<PickContainer>
	      {mySelections.length >= 2
	        ? <PickMedia src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:silo:curr[…]max/w_120,q_auto:best/v1/people/${mySelections[1]}/headshot/silo/current`} />
	        : <EmptyPick />
	      }
	    </PickContainer>

      <PickContainer>
	      {mySelections.length >= 3
	        ? <PickMedia src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:silo:curr[…]max/w_120,q_auto:best/v1/people/${mySelections[2]}/headshot/silo/current`} />
	        : <EmptyPick />
	      }
	    </PickContainer>

      <PickContainer>
	      {mySelections.length >= 4
	        ? <PickMedia src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:silo:curr[…]max/w_120,q_auto:best/v1/people/${mySelections[3]}/headshot/silo/current`} />
	        : <EmptyPick />
	      }
	    </PickContainer>

      <PickContainer>
	      {mySelections.length >= 5
	        ? <PickMedia src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:silo:curr[…]max/w_120,q_auto:best/v1/people/${mySelections[4]}/headshot/silo/current`} />
	        : <EmptyPick />
	      }
	    </PickContainer>

    </MP_Container>
  );
}

export default MyPicks;
