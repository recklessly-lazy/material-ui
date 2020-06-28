import React from "react";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: "600px",
  },
}));

const createRow = (savory, calorie, fat, carbohydrates, protein) => {
  calorie += " kcal";
  return { savory, calorie, fat, carbohydrates, protein };
};
const CustomTable = () => {
  const classes = useStyles();
  const tableData = [createRow("Cookies", 450, 2, 18, 10)];
  return (
    <TableContainer component={Card}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Savouries (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat (g)</TableCell>
            <TableCell align="right">Carbohydrates (g)</TableCell>
            <TableCell align="right">Protein (g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow>
              <TableCell>{row.savory}</TableCell>
              <TableCell align="right">{row.calorie}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbohydrates}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
