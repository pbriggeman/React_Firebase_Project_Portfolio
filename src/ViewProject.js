import React from 'react';
import { withFirebase } from './FirebaseContextInit';
import { useParams } from "react-router-dom";
import './ViewProject.css';

import { makeStyles } from '@material-ui/core/styles';
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

function ViewProject(props) {
  const classes = useStyles();
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [hasSucceeded, setSuccess] = React.useState(false);

  if (!hasSucceeded) {
    var documentReference = props.firebase.projects().doc(id);
    documentReference.get().then(function(documentSnapshot) {
      if (documentSnapshot.exists) {
        console.log('document found');
        setData(documentSnapshot.data());
        setSuccess(true);
        console.log('DATA :' + data.title);
      } else {
        console.log('document not found');
      }
      setLoading(false);
    });
  }
  
  return (  
    <div className={classes.heroContent}>
      { loading && <CircularProgress /> }
      <Typography variant="body2" color="textSecondary" align="center">
        Title: {data.title}
      </Typography>   
    </div>
  );
}

export default withFirebase(ViewProject);
