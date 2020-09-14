import React from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from './FirebaseContextInit';
import './Navigation.css';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LaunchIcon from '@material-ui/icons/Launch';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// import SignOutButton from './SignOut';
import { AuthUserContext } from './SessionContextInit';

const styleLogoLink = {
  textDecoration: 'none',
  marginRight: '20px'
};

const Navigation = ({ firebase }) => (
	<div>
		<AppBar position="relative">
			<Toolbar>
				<Grid
					justify="space-between"
					container 
					spacing={10}
				>
					<Grid item>
						<Grid container justify="flex-start">
							<Grid item>
								<Typography style={styleLogoLink} component={ Link } to="/" variant="h6" color="inherit" noWrap>
									Project Portfolio
								</Typography>
							</Grid>
							<Grid item>
								<Typography style={styleLogoLink} component={ Link } to="/blog" variant="h6" color="inherit" noWrap>
									Blog
								</Typography>
							</Grid>
						</Grid>						           
					</Grid>
					<Grid item>						
						<AuthUserContext.Consumer>
							{authUser =>
								authUser ? <NavigationAuth firebase={firebase} /> : <NavigationNonAuth />
							}
						</AuthUserContext.Consumer>			           
					</Grid>					
				</Grid>
			</Toolbar>
		</AppBar>
	</div>
);

const NavigationAuth = ({ firebase }) => (
	<Grid container justify="flex-end">
		<Grid item>
			<Typography style={styleLogoLink} component={ Link } to="/addproject" variant="h6" color="inherit" noWrap>
				Add Project
			</Typography>
		</Grid>
		<Grid item>
			<Button component={ Link } to="/" variant="contained" startIcon={<LaunchIcon />} onClick={firebase.doSignOut}>
				Sign Out
			</Button>
		</Grid>
	</Grid>
	// <SignOutButton />
	
	// <ul>
	// 	<li>
	// 		<Link to={ROUTES.LANDING}>Landing</Link>
	// 	</li>
	// 	<li>
	// 		<Link to={ROUTES.HOME}>Home</Link>
	// 	</li>
	// 	<li>
	// 		<Link to={ROUTES.ACCOUNT}>Account</Link>
	// 	</li>
	// 	<li>
  //     <Link to={ROUTES.ADMIN}>Admin</Link>
  //   </li>
	// 	<li>
	// 		<SignOutButton />
	// 	</li>
	// </ul>
);

const NavigationNonAuth = () => (
	<div>
		<Grid item>
			<Button component={ Link } to="/signin" variant="contained" startIcon={<ExitToAppIcon />}>
				Sign In
			</Button>
		</Grid>
	</div>
	
	
	// <ul>
	// 	<li>
	// 		<Link to={ROUTES.LANDING}>Landing</Link>
	// 	</li>
	// 	<li>
	// 		<Link to={ROUTES.SIGN_IN}>Sign In</Link>
	// 	</li>
	// </ul>
);

export default withFirebase(Navigation);