import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const VideosContainer = styled.div`
	display: flex;
    flex-flow: row nowrap;
    overflow-x: auto;
    margin: 0px -1rem;
    padding: 0px 1rem;
`;

const Video = styled.div`
	background-image: url(${props => props.src});
	margin-right: 1rem;
	min-width: 283px;
	width: 283px;
	height: 160px;
	border-radius: 6px;
	display: inline-flex;
	position: relative;

	&:last-child {
		margin-right: 2rem;
	}
`;

const PlayButton = styled.button`
	position: absolute;
	bottom: 1rem;
	left: 1rem;
`;

function Videos({ id }) {
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		fetch(`https://dapi.cms.mlbinfra.com/v2/content/en-us/videos?tags.slug=playerid-${id}&$limit=6`)
			.then(response => response.json())
			.then(data => {
				const videos = data.items;
				setVideos([...videos]);
			});
	}, [videos]);

	const vids = videos.map((vid, i) => {
		const src = vid.thumbnail.templateUrl.replace('{formatInstructions}', 't_16x9/t_w640');
		return (
			<Video key={i} src={src}>
				<PlayButton>Play</PlayButton>
			</Video>
		)
	})

	return (
		<VideosContainer>
			{vids}
		</VideosContainer>
	);
}

export default Videos;
