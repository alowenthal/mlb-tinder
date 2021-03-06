import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoPlayCircle } from 'react-icons/io5';

const GifsContainer = styled.div`
	display: flex;
    flex-flow: row nowrap;
    overflow-x: auto;
    margin: 0px -1rem;
    padding: 0px 1rem;
`;

const Gif = styled.div`
	background-image: url(${props => props.src});
	background-size: cover;
    background-position: center;
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
	bottom: 0px;
	left: 0px;
	background: none;
	border: none;
	font-size: 36px;
	color: #ffffff;
`;

function Gifs({ id }) {
	const [gifs, setGifs] = useState([]);

	useEffect(() => {
		fetch(`https://dapi.cms.mlbinfra.com/v2/content/en-us/photos?tags.slug=playerid-${id}&fields.photoType=Animated%20GIF`)
			.then(response => response.json())
			.then(data => {
				const gifs = data.items.filter((gif) => gif.image.format === 'gif');
				setGifs([...gifs]);
			});
	}, [gifs]);

	const vids = gifs.map((gif, i) => {
		const src = gif.image.templateUrl.replace('{formatInstructions}', 't_16x9/t_w640');
		return (
			<Gif key={i} src={src} />
		)
	})

	return (
		<GifsContainer>
			{vids}
		</GifsContainer>
	);
}

export default Gifs;
