import React from 'react';
import { withFirebase } from './FirebaseContextInit';
import { useParams, Link } from "react-router-dom";
import './ViewProject.css';
import { AuthUserContext } from './SessionContextInit';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

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

const UserControlsNonAuth = () => (
	<div>
		<Grid item>
			<Button component={ Link } to="/editproject" variant="contained" startIcon={<EditIcon />}>
				Edit Project
			</Button>
      <Button component={ Link } to="/deleteproject" variant="contained" startIcon={<DeleteIcon />}>
				Delete Project
			</Button>
		</Grid>
	</div>
);

const UserControlsAuth = () => (
	<div>
		<Grid item>
			<Button component={ Link } to="/editproject" variant="contained" startIcon={<EditIcon />}>
				Edit Project
			</Button>
      <Button component={ Link } to="/deleteproject" variant="contained" startIcon={<DeleteIcon />}>
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
    <div className={classes.heroContent}>
      { loading && <CircularProgress /> }
      { error &&
        <Typography variant="body2" color="textSecondary" align="center">
          {errMessage}
        </Typography>
      }
      { !error && hasSucceeded &&
        <div>
          <Typography variant="body2" color="textSecondary" align="center">
            Title: {data.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            Description: {data.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            URL: {data.url}
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            Image: {data.image }
          </Typography>
          <AuthUserContext.Consumer>
            {authUser =>
              authUser ? <UserControlsAuth /> : <UserControlsNonAuth />
            }
          </AuthUserContext.Consumer>
        </div>	
      }          
    </div>
  );
}

export default withFirebase(ViewProject);
