import React from 'react';
import { withFirebase } from './FirebaseContextInit';
import { useParams } from "react-router-dom";
// import { AuthUserContext } from './SessionContextInit';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
// import { NoteTwoTone } from '@material-ui/icons';
// import Link from '@material-ui/core/Link';

// import * as ROUTES from './constants/routes';

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
  circularProgress: {
    border: '1px solid #ff0000',
    textAlign: 'center',
  },
  gridClass: {
    border: '1px solid #ff0000',
    textAlign: 'center',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

function EditProject(props) {
  const classes = useStyles();
  const { id } = useParams();
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [hasSucceeded, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errMessage, setErrMessage] = React.useState("");
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [image, setImage] = React.useState('');

  React.useEffect( () => {
    (async () => {
      setData(await 
        props.firebase.getProject(id)
      );
      console.log("FETCH HAS FIRED!!");
    })();
  }, [props,id]);

  // console.log("fetched data!" + data.title);

  // React.useEffect(() => {
  //   if (!hasSucceeded) {
  //     props.firebase.getProject(id)
  //       .then(function(data) {
  //         if (data) {
  //           // setData(data);
  //           setTitle(data.title);
  //           setDescription(data.description);
  //           setUrl(data.url);
  //           setSuccess(true);
  //           setLoading(false);
  //           console.log("fetched data!" + new Date().toLocaleTimeString());
  //         }
  //         else {
  //           setSuccess(true);
  //           setLoading(false);
  //           setError(true);
  //           setErrMessage("There is no data for that Project ID!");
  //         }
  //       });
  //   }
  // });

  // if (!hasSucceeded) {
  //   props.firebase.getProject(id)
  //     .then(function(data) {
  //       if (data) {
  //         // setData(data);
  //         setTitle(data.title);
  //         setDescription(data.description);
  //         setUrl(data.url);
  //         setSuccess(true);
  //         setLoading(false);
  //         console.log("fetched data!" + new Date().toLocaleTimeString());
  //       }
  //       else {
  //         setSuccess(true);
  //         setLoading(false);
  //         setError(true);
  //         setErrMessage("There is no data for that Project ID!");
  //       }
  //     });
  // }

  function doSubmit() {
    console.log("DO SUBMIT!!");
  }

  // const onChange = (event) => {
	// 	this.setState({ [event.target.name]: event.target.value });
  // };
  
  // const setFormTitle = (event) => {
  //   data.title = event.target.value;
  //   console.log("TITLE: " + data.title);
  // };

  // const setFormDescription = (event) => {
	// 	setDescription( event.target.value );
  // };

  // const setFormImage = (event) => {
	// 	setImage( event.target.value );
  // };

  // const setFormURL = (event) => {
	// 	setUrl( event.target.value );
  // };

  function onChangeTitle (e) {
		data.title = '';
	};
  
  return (  
    <Container component="main" maxWidth="sm">
				<CssBaseline />
				<div className={classes.paper}>
					<Typography component="h1" variant="h5">
            Edit Project
					</Typography>
          { !data &&
              <CircularProgress />        
          }
          { error &&
            <Typography variant="body2" color="textSecondary" align="center">
              {errMessage}
            </Typography>
          }
          { data &&          
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
                autoFocus
                value={data.title}
                // onChange={e => setTitle(e.target.value)}
                onChange={e => onChangeTitle(e)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                value={data.description}
                onChange={e => setDescription(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="url"
                label="URL"
                name="url"
                autoComplete="url"
                value={data.url}
                onChange={e => setUrl(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="image"
                label="Image"
                name="image"
                autoComplete="image"
                value={data.image}
                onChange={e => setImage(e.target.value)}
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                // disabled={isInvalid}
                onClick={e => doSubmit(e)}
              >
                Update Project
              </Button>
            </form>
          }  
				</div>
			</Container>
  );
}

export default withFirebase(EditProject);
