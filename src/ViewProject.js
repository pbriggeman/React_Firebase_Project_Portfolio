import React from 'react';
import { withFirebase } from './FirebaseContextInit';
import { useParams, Link } from "react-router-dom";
import './ViewProject.css';
import { AuthUserContext } from './SessionContextInit';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const UserControlsNonAuth = (props) => (
	<div>
		<Grid item align="center">
      <Button component={ Link } to="/" variant="contained" startIcon={<ArrowBackIcon />} className={ props.styles.formControl}>
				Portfolio
			</Button>
      <Button component={ Link } to="/editproject" variant="contained" startIcon={<ShareIcon />} className={ props.styles.formControl}>
				Share Project
			</Button>
		</Grid>
	</div>
);

const UserControlsAuth = (props) => (
	<div>
		<Grid item align="center">
      <Button component={ Link } to="/" variant="contained" startIcon={<ArrowBackIcon />} className={ props.styles.formControl}>
				Portfolio
			</Button>
      <Button component={ Link } to="/editproject" variant="contained" startIcon={<EditIcon />} className={ props.styles.formControl}>
				Edit Project
			</Button>
      <Button component={ Link } to="/deleteproject" variant="contained" startIcon={<DeleteIcon />} className={ props.styles.formControl}>
				Delete Project
			</Button>
		</Grid>
	</div>
);

function ViewProject(props) {
  const classes = useStyles();
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [hasSucceeded, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errMessage, setErrMessage] = React.useState("");

  if (!hasSucceeded) {
    props.firebase.getProject(id)
      .then(function(data) {
        if (data) {
          setData(data);
          setSuccess(true);
          setLoading(false);
        }
        else {
          setSuccess(true);
          setLoading(false);
          setError(true);
          setErrMessage("There is no data for that Project ID!");
        }
      });
  }
  
  return (  
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Typography component="h1" variant="h5" align="center" className={classes.formControl}>
        Project Details
      </Typography>
      <div className={classes.paper}>    
        { loading && <CircularProgress /> }
        { error &&
          <Typography variant="body2" color="textSecondary" align="center">
            {errMessage}
          </Typography>
        }
        { !error && hasSucceeded &&          
          <div>
            <Typography variant="h6" gutterBottom align="center">
              {data.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" align="left">
              <b>Description:</b> {data.description}e
            </Typography>
            <Typography variant="body2" color="textSecondary" align="left">
            <b>URL:</b> {data.url}
            </Typography>
            <Typography variant="body2" color="textSecondary" align="left">
            <b>Image:</b> {data.image }
            </Typography>
            <AuthUserContext.Consumer>
              {authUser =>
                authUser ? <UserControlsAuth styles={classes} /> : <UserControlsNonAuth styles={classes} />
              }
            </AuthUserContext.Consumer>
          </div>	
        }          
      </div>
    </Container>
  );
}

export default withFirebase(ViewProject);
