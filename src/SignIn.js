import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { withFirebase } from './FirebaseContextInit';
import * as ROUTES from './constants/routes';

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
	},
	error: {
    color: theme.palette.error.dark,
  },
});

const SignInPage = () => (
	<div>
		<SignInForm />
		{/* <PasswordForgetLink />
		<SignUpLink /> */}
	</div>
);

const INITIAL_STATE = {
	email: '',
	password: '',
	error: null,
};

class SignInFormBase extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	onSubmit = event => {
		event.preventDefault();
		const { email, password } = this.state;

		this.props.firebase
			.doSignInWithEmailAndPassword(email, password)
			.then(() => {
				this.setState({ ...INITIAL_STATE });
				this.props.history.push(ROUTES.HOME);
			})
			.catch(error => {
				this.setState({ error });
				console.log("ERROR:" + error)
			});		
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	/****** TODO: HANDLE "REMEMBER ME" CHECKBOX *****/

	render() {
		const { email, password, error } = this.state;

		const isInvalid = password === '' || email === '';

		const { classes } = this.props;

		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign In
					</Typography>
					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							value={email}
							onChange={e => this.onChange(e)}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							value={password}
							onChange={e => this.onChange(e)}
						/>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<Button
							type="button"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							disabled={isInvalid}
							onClick={e => this.onSubmit(e)}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href={ROUTES.PASSWORD_FORGET} variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href={ROUTES.SIGN_UP} variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs>
								<Typography component="h1" variant="body2" className={this.props.classes.error}>
									{error && <p>{error.message}</p>}
								</Typography>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		);
	}
}

const SignInForm = compose(
	withRouter,
	withFirebase,
	withStyles(useStyles, { withTheme: true }),
)(SignInFormBase);

export default SignInPage;

export { SignInForm };