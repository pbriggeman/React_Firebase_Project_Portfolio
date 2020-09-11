import React from 'react';
import 'fontsource-roboto';
import './Landing.css';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

// import  { FirebaseContext } from './FirebaseContextInit';

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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function Landing() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

  return (
    <React.Fragment>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Album layout
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc.
              Make it short and sweet, but not too short so folks don&apos;t simply skip over it
              entirely.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <div className={classes.root}>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend">Assign responsibility</FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
                          label="Gilad Gray"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
                          label="Jason Killian"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
                          label="Antoine Llorca"
                        />
                      </FormGroup>
                      <FormHelperText>Be careful</FormHelperText>
                    </FormControl>
                    <FormControl required error={error} component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend">Pick two</FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
                          label="Gilad Gray"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
                          label="Jason Killian"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
                          label="Antoine Llorca"
                        />
                      </FormGroup>
                      <FormHelperText>You can display an error</FormHelperText>
                    </FormControl>
                  </div>
                </Grid>
              </Grid>
            </div>
            
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
    // <div>
    //   <h1>
    //     Landing
    //   </h1>
    //   <FirebaseContext.Consumer>
    //     {firebase => {
    //       return <div>I've access to Firebase and render something.</div>;
    //     }}
    //   </FirebaseContext.Consumer>
    // </div>
  );
}

export default Landing;