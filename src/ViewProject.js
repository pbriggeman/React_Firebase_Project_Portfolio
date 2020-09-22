import React from 'react';
import { withFirebase } from './FirebaseContextInit';
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

function Details(props) {
  // const [isFetching, setFetching] = useState( false );
  console.log("DETAILS!" + props.pid);  

  // var documentReference = props.firebase.projects().doc('1C7k9hcsKpxWxOe0MbW2');
  // documentReference.get().then(function(documentSnapshot) {
  //   if (documentSnapshot.exists) {
  //     console.log('document found');
  //     var data = documentSnapshot.data();
  //     console.log('DATA :' + data.title);
  //   } else {
  //     console.log('document not found');
  //   }
  // });


  
  // const projectRef = props.firebase.projects().doc('1C7k9hcsKpxWxOe0MbW2');
  // const doc = await projectRef.get().then();


  // props.firebase.projects()
  //   .doc('1C7k9hcsKpxWxOe0MbW2')
  //   .get()
  //   .then(snapshot => {
      

  //     // if (!snapshot.empty) {
  //     //   console.log("snapshot not empty");
  //     //   // const data = snapshot.docs.map(doc => doc.data());
  //     //   console.log(snapshot);
  //     // }
  //     // else {
  //     //   console.log("snapshot empty");
  //     // }
      
  //     // var contentKeys = Object.keys(querySnapshot.fE);
  //     // console.log("DATA: " + querySnapshot.data.description);
  //     // const data = querySnapshot.doc;
  //     // querySnapshot.forEach((queryDocumentSnapshot) => {
  //     //   console.log(queryDocumentSnapshot.id);
  //     // });
  //     //console.log("querySnapshot: " + data);
  //     // this.setState({
  //     //   projects: data,
  //     //   loading: false
  //     // });

  //     if (!snapshot.empty) {
  //       console.log("snapshot not empty");
  //       snapshot.docs.forEach ((doc) => {
  //         const data = doc.data();
  //         console.log("TITLE :" + data[0].title);
  //       });
  //     }
  //     else {
  //       console.log("snapshot empty");
  //     }


  //     // snapshot.forEach(doc => {
  //     //   const data = doc.data();
  //     //   console.log(doc.id, data);
  //     // });
  //   });

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Test
    </Typography>
  );
}

function ViewProject(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);

  var documentReference = props.firebase.projects().doc('1C7k9hcsKpxWxOe0MbW2');
  documentReference.get().then(function(documentSnapshot) {
    if (documentSnapshot.exists) {
      console.log('document found');
      var data = documentSnapshot.data();
      console.log('DATA :' + data.title);
    } else {
      console.log('document not found');
    }
    setLoading(false);
  });
 
  return (  
    <div className={classes.heroContent}>
      { loading && <CircularProgress /> }
      <Typography variant="body2" color="textSecondary" align="center">
        Test
      </Typography>   
    </div>
  );
}

export default withFirebase(ViewProject);
