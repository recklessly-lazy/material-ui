import React from "react";
import Table from "./Table";
import { Grid, Paper, makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: "0px",
  },
  paper: {
    padding: "10px",
    textAlign: "center",
    color: "#000",
    background: theme.palette.secondary.light,
  },
  table: {
    minWidth: "600px",
  },
}));

function Demo() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Paper title="some item" className={classes.paper}>
            item 1
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Paper className={classes.paper}>item 2</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Paper className={classes.paper}>item 3</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Paper className={classes.paper}>item 4</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Paper className={classes.paper}>item 5</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Paper className={classes.paper}>item 6</Paper>
        </Grid>
      </Grid>
      <Box mt={3} marginLeft={1}>
        <Table />
      </Box>
    </React.Fragment>
  );
}
export default Demo;
