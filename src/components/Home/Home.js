import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 150,
    position: "absolute",
    marginBottom: 73
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center"
  }
}));

function Home() {
  const classes = useStyles();
  const date = new Date();
  const day = new Date().getDate();
  const year = new Date().getFullYear();
  const month = date.toLocaleString("default", { month: "short" });
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Link to="/datemonthquiz">
            <Paper className={classes.paper}>
              <Button variant="contained" color="secondary">
                JAIN QUIZ {day + "-" + month + "-" + year}
              </Button>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link to="/datemonthresult">
            <Paper className={classes.paper}>
              <Button variant="contained" color="secondary">
                QUIZ RESULT {day + "-" + month + "-" + year}
              </Button>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link to="/oldquizresults">
            <Paper className={classes.paper}>
              <Button variant="contained" color="secondary">
                OLD QUIZ , RESULTS & ANSWER SHEETS
              </Button>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link to="/oldquizresults">
            <Paper className={classes.paper}>
              <Button variant="contained" color="secondary">
                OLD QUIZ , RESULTS & ANSWER SHEETS
              </Button>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link to="/oldquizresults">
            <Paper className={classes.paper}>
              <Button variant="contained" color="secondary">
                OLD QUIZ , RESULTS & ANSWER SHEETS
              </Button>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link to="/oldquizresults">
            <Paper className={classes.paper}>
              <Button variant="contained" color="secondary">
                OLD QUIZ , RESULTS & ANSWER SHEETS
              </Button>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link to="/oldquizresults">
            <Paper className={classes.paper}>
              <Button variant="contained" color="secondary">
                OLD QUIZ , RESULTS & ANSWER SHEETS
              </Button>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link to="/oldquizresults">
            <Paper className={classes.paper}>
              <Button variant="contained" color="secondary">
                OLD QUIZ , RESULTS & ANSWER SHEETS
              </Button>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link to="/oldquizresults">
            <Paper className={classes.paper}>
              <Button variant="contained" color="secondary">
                OLD QUIZ , RESULTS & ANSWER SHEETS
              </Button>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link to="/oldquizresults">
            <Paper className={classes.paper}>
              <Button variant="contained" color="secondary">
                OLD QUIZ , RESULTS & ANSWER SHEETS
              </Button>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link to="/oldquizresults">
            <Paper className={classes.paper}>
              <Button variant="contained" color="secondary">
                OLD QUIZ , RESULTS & ANSWER SHEETS
              </Button>
            </Paper>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
