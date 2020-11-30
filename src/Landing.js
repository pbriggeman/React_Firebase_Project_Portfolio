import React, { Component } from 'react';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import 'fontsource-roboto';
import './Landing.css';

import { withFirebase } from './FirebaseContextInit';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { ConfirmationNumberOutlined } from '@material-ui/icons';
// import FormLabel from '@material-ui/core/FormLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import Checkbox from '@material-ui/core/Checkbox';

const useStyles = theme => ({
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
    '& > * + *': {
      marginLeft: theme.spacing(24),
    },
  },
  formControl: {
    margin: theme.spacing(3),
  },
  circularProgress: {
    // border: '1px solid #ff0000',
    textAlign: 'center',
  },
});

const LandingPage = () => (
  <div>
    <Landing/>
  </div>
);

const INITIAL_STATE = {
  projects: [],
  role: "",
  loading: false,
  error: null,
};

const Loader = () => (
  <div>
    <CircularProgress />
  </div>
)
class LandingBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.getAllProjects = this.getAllProjects.bind(this);
    // this.getRole = this.getRole.bind(this);
  }
  
  getAllProjects = () => {
    this.props.firebase.projects()
    .get()
    .then(querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      console.log(data);
      this.setState({
        projects: data,
        loading: false
      });
    });
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });
    this.getAllProjects();
  }

  render () {
    const { classes } = this.props;
    

    return (
    <Container className={classes.cardGrid} maxWidth="md">          
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4} className={classes.circularProgress}>
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={classes.circularProgress}>
          {this.state.loading && <Loader />}
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        {this.state.projects.map((project) => (
          <Grid item key={project.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image="https://source.unsplash.com/random"
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {project.title}
                </Typography>
                <Typography>
                {project.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button component={ Link } to={"/viewproject/" + project.id} size="small" color="primary">
                  View
                </Button>
                {/* <Button size="small" color="primary">
                  Edit
                </Button> */}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>      
    </Container>
    );
  }
}

const Landing = compose(
  withFirebase,
  withStyles(useStyles, { withTheme: true }),
)(LandingBase);

export default LandingPage;