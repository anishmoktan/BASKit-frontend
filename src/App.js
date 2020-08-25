import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import HeaderBar from './containers/headerBar/HeaderBar';
import SignUp from './containers/auth/signUp/SignUp';
import Login from './containers/auth/login/Login';
import Logout from './containers/auth/logout/logout';
import Home from './containers/home/Home';
import Profile from './containers/profile/Profile';

function App(props) {
	let user = localStorage.getItem('user');
	// let usersData = localStorage.getItem('usersData');

	user = JSON.parse(user);
	console.log('this is in app');
	// usersData = JSON.parse(usersData);

	// if (usersData) {
	// 	usersData = usersData.map((user) => JSON.parse(user));
	// } else {
	// 	usersData = [];
	// }

	let authRoutes = (
		<Switch>
			<Route path='/login' component={Login} />
			<Route path='/sign-up' component={SignUp} />
			<Redirect to='/login' />
		</Switch>
	);

	if (props.isAuthenticated) {
		authRoutes = (
			<Switch>
				<Route exact path='/home' component={Home} />
				<Route path='/profile' component={Profile} />
				<Route path='/logout' component={Logout} />
				<Redirect to='/home' />
			</Switch>
		);
	}

	// props.getUserInfo(user);

	return (
		<div>
			<HeaderBar />
			{authRoutes}
		</div>
	);
}
const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.username !== null,
	};
};

export default connect(mapStateToProps)(App);
