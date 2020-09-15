import React from 'react';
import { withFirebase } from './FirebaseContextInit';
import './ViewProject.css';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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

function Details(props) {
  console.log("DETAILS!" + props.firebase);
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Test
    </Typography>
  );
}

function ViewProject(props) {
  const classes = useStyles();
  
  return (
    <div className={classes.heroContent}>
      <Details firebase={props.firebase} />
    </div>
  );
}

export default withFirebase(ViewProject);
