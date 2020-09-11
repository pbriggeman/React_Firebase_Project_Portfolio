import React from 'react';
import { Link } from 'react-router-dom';
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

const Navigation = () => (
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
						<div>
							<AuthUserContext.Consumer>
								{authUser =>
									authUser ? <NavigationAuth /> : <NavigationNonAuth />
								}
							</AuthUserContext.Consumer>
						</div>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	</div>
);

const NavigationAuth = () => (
	<Button component={ Link } to="/signout" variant="contained" startIcon={<LaunchIcon />}>
		Sign Out
	</Button>
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
	<Button component={ Link } to="/signin" variant="contained" startIcon={<ExitToAppIcon />}>
		Sign In
	</Button>
	
	// <ul>
	// 	<li>
	// 		<Link to={ROUTES.LANDING}>Landing</Link>
	// 	</li>
	// 	<li>
	// 		<Link to={ROUTES.SIGN_IN}>Sign In</Link>
	// 	</li>
	// </ul>
);

export default Navigation;