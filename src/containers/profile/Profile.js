import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ProfileCard from '../../components/UI/profileCard/ProfileCard';
import ImageCard from '../../components/UI/imageCard/ImageCard';
import * as actions from '../../store/actions/auth';

const Profile = (props) => {
	const handleDeletePhoto = async (photoUrl) => {
		try {
			const { data } = await axios({
				method: 'POST',
				url: 'http://localhost:5000/delete-photo',
				data: {
					username: props.username,
					password: props.password,
					photoUrl: photoUrl,
				},
			});

			console.log('this is the data from the delete photo: ', data);
			props.deletePhotoSuccess(data.gallery);
		} catch (err) {
			console.log('there is an error to delete the photo: ', err);
		}

		// const gallery = [...props.gallery];

		// const updateUpdateGllery = gallery.filter((imgUrl) => imgUrl !== photoUrl);

		// props.deletePhotoSuccess(updateUpdateGllery);
	};

	let gallerySection = (
		<Typography variant='p' component='p'>
			You haven't saved any images yet, click <Link to='/home'>here</Link> to
			search some amazing images!
		</Typography>
	);

	if (props.gallery.length > 0) {
		console.log('this is props.gallery: ', props.gallery);
		gallerySection = props.gallery.map((photoUrl) => (
			<Grid key={photoUrl} item xs={12} sm={4} md={4} lg={4}>
				<ImageCard
					photoUrl={photoUrl}
					buttonName='Delete'
					handleClick={handleDeletePhoto}
				/>
			</Grid>
		));
	}

	return (
		<Container fixed>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={4} md={4}>
					<ProfileCard props={props} />
				</Grid>
				<Grid item xs={12} sm={8} md={8}>
					<Grid container spacing={2}>
						{gallerySection}
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
};

const mapStateToProps = (state) => {
	return {
		username: state.username,
		password: state.password,
		gallery: state.gallery,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		deletePhotoSuccess: (gallery) =>
			dispatch(actions.deletePhotoSuccess(gallery)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
