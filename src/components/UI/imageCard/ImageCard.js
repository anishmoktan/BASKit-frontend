import React from 'react';
import {
	Button,
	Card,
	CardActionArea,
	CardMedia,
	CardActions,
} from '@material-ui/core';

import './ImageCard.css';

const ImageCard = (props) => {
	return (
		<Card style={{ height: '100%' }}>
			<CardActionArea>
				<CardMedia component='img' image={props.photoUrl} />
			</CardActionArea>
			<CardActions
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<Button
					size='small'
					variant='contained'
					color='primary'
					onClick={() => props.handleClick(props.photoUrl)}>
					{props.buttonName}
				</Button>
			</CardActions>
		</Card>
	);
};

export default ImageCard;
