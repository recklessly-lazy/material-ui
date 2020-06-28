import React, { Fragment, useState } from "react";
import {
  Button,
  Grid,
  makeStyles,
  Paper,
  Card,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    width: "100%",
    margin: "auto",
  },
  display: {
    backgroundColor: "black",
    border: "2px solid grey",
    height: "50px",
    textAlign: "right",
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    color: "white",
    padding: "12px 15px 3px 0px",
    fontSize: "20px",
    fontFamily: "verdana",
    fontWeight: "300",
    boxShadow: "1px 3px 4px black",
    marginBottom: "40px",
  },
  paper: {
    position: "relative",
    backgroundColor: theme.palette.primary.dark,
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    margin: "50px auto",
    width: "80%",
    maxWidth: "329px",
    "@media(min-width:600px)": {
      minWidth: "330px",
      maxWidth: "450px",
      width: "50%",
    },
    padding: "20px 10px 30px ",
    boxShadow: "2px 5px 15px 3px rgb(120,120,120,1)",
    borderRadius: "10px 10px 50% 50% / 2%",
  },
  gridItem: {
    // margin: "auto",
    textAlign: "center",
  },
  button: {
    padding: "5px",
    fontWeight: "bolder",
    fontFamily: "cursive",
    width: "70%",
    textAlign: "center",
    background: theme.palette.warning.light,
    borderRadius: "10px",
    boxShadow: "0px 5px 2px rgb(60,60,60)",
    border: "2px solid white",
    "&:hover": {
      background: theme.palette.warning.main,
      boxShadow: `0px 0px 18px 6px ${theme.palette.warning.dark}`,
    },
    "&:active": {
      background: theme.palette.warning.dark,
      transform: "translate(0px, 2px)",
      boxShadow: "0px 1px 2px 1px rgb(40,40,40)",
    },
  },
  functionButtons: {
    padding: "5px",
    fontWeight: "bold",
    fontFamily: "roboto",
    width: "70%",
    textAlign: "center",
    background: theme.palette.secondary.light,
    borderRadius: "10px",
    boxShadow: "0px 5px 2px rgb(60,60,60)",
    border: "2px solid white",
    "&:hover": {
      background: theme.palette.secondary.main,
      boxShadow: `0px 0px 20px 5px red`,
    },
    "&:active": {
      background: theme.palette.secondary.dark,
      transform: "translate(0px, 2px)",
      boxShadow: "0px 1px 2px 1px rgb(40,40,40)",
    },
  },
  spanButtons: {
    padding: "10px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    borderRadius: "5px",
    // boxShadow: '1px 8px 10px 3px rgb(40,40,40,0.7)'
  },
}));

const useToolTipStyles = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

const Calculator = () => {
  const [result, setResult] = useState('0');
  const [disabled, setDisabled] = useState(false)

  const operators = { "+": "", "-": "", "*": "", "/": "" };
  
  const valueChangedHandler = (oldValue, input) => {
    let newValue = oldValue;
    const previousInput = oldValue.charAt( oldValue.length - 1 )
    const inputBeforePreviousInput = oldValue.charAt( oldValue.length - 2)
    if( newValue === 'Infinity' || newValue === 'NaN'){
      newValue = input
      setDisabled(false)
    }else if (input === "0" && oldValue === "0") {
      newValue = "0";
    } else if (oldValue === "0") {
      newValue = input;
    } else if( previousInput === '0' && inputBeforePreviousInput in operators) {
      newValue = newValue.slice(0, -1) + input
    } else {
      newValue += input;
    }
    setResult(newValue);
  };

  const operationsHandler = (result, operation) => {
    let newResult = result;
    const lastInput = result.charAt(result.length - 1);
    if (lastInput === operation) {
    } else if (lastInput !== operation && lastInput in operators) {
      newResult = result.slice(0, -1) + operation;
    } else {
      newResult += operation;
    }
    setResult(newResult);
  };

  const evaluate = (result) => {

    let lastInput = ( result.length > 1 ) ? result.charAt( result.length - 1 ) : null
    if( lastInput in operators){
      result = result.slice(0, -1)
    }
    let output = eval(result).toString();
    if( output === 'Infinity' || output === 'NaN') {
      console.log('setting disabled to true')
      setDisabled(true)
    }
    setResult(output);
  };

  const classes = useStyles();
  const tooltipClasses = useToolTipStyles()

  const buttons = '789456123'.split('').map((button) => (
    <Grid key={button} className={classes.gridItem} item xs={4}>
      <Button
        className={classes.button}
        onClick={() =>
          valueChangedHandler(result.toString(), button.toString())
        }
      >
        {button}
      </Button>
    </Grid>
  ));

  const operatorsAndFunctions = "+-*/=".split("").map((button) =>
    button === "=" ? (
      <Grid key={button} className={classes.gridItem} item xs={4}>
        <Tooltip
          title={disabled ? "Press AC or a number" : "Evaluate"}
          classes={tooltipClasses}
          arrow
        >
          <span className={classes.spanButtons}>
            <Button
              disabled={disabled}
              className={classes.functionButtons}
              onClick={() => evaluate(result)}
            >
              {button}
            </Button>
          </span>
        </Tooltip>
      </Grid>
    ) : (
      <Grid key={button} className={classes.gridItem} item xs={4}>
        <Tooltip
          title={
            disabled
              ? "Press AC or a number"
              : `${
                  button === "+"
                    ? "Add"
                    : button === "-"
                    ? "Subtract"
                    : button === "*"
                    ? "Multiply"
                    : "Divide"
                }`
          }
          arrow
          placement="right-start"
          classes={tooltipClasses}
        >
          <span>
            <Button
              className={classes.functionButtons}
              disabled={disabled}
              // disabled={result === "Infinity" || result === "NaN" ? true : false}
              onClick={() =>
                operationsHandler(result.toString(), button.toString())
              }
            >
              {button}
            </Button>
          </span>
        </Tooltip>
      </Grid>
    )
  );
  return (
    <Fragment>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => alert("Nothing")}
          >
            <MenuIcon titleAccess={"Menu"} />
          </IconButton>
          <Typography variant={"h6"}>Calculator</Typography>
        </Toolbar>
      </AppBar>
      <Paper className={classes.paper}>
        <Grid className={classes.gridContainer} container spacing={2}>
          <Grid className={classes.gridItem} item xs={12}>
            <Card className={classes.display}>
              <p>{result}</p>
            </Card>
          </Grid>
          {buttons}
          <Grid className={classes.gridItem} item xs={4}>
            <Button
              className={classes.button}
              onClick={() => valueChangedHandler(result.toString(), "0")}
            >
              {0}
            </Button>
          </Grid>
          {operatorsAndFunctions}
          <Grid className={classes.gridItem} item xs={4}>
            <Tooltip classes={tooltipClasses} title="Clear All" arrow>
              <span className = { classes.spanButtons }>
                <Button
                  className={classes.functionButtons}
                  onClick={() => {
                    setResult("0");
                    setDisabled(false);
                  }}
                >
                  {"AC"}
                </Button>
              </span>
            </Tooltip>
          </Grid>
          <Grid className={classes.gridItem} item xs={4}>
            <Tooltip
              classes={tooltipClasses}
              title={disabled ? "Press AC or a number" : "Clear last entry"}
              arrow
            >
              <span className = { classes.spanButtons }  >
                <Button
                  disabled={disabled}
                  className={classes.functionButtons}
                  onClick={() => {
                    setResult(result.length === 1 ? "0" : result.slice(0, -1));
                  }}
                >
                  <ArrowBackIcon></ArrowBackIcon>
                </Button>
              </span>
            </Tooltip>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};
export default Calculator;
//comment