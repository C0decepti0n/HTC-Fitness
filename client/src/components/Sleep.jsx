/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Grid2,
  Snackbar,
  Typography,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Stars,
  Circle,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import axios from 'axios';
// import Chart from './Chart.jsx';
// import WeightCard from './WeightCard.jsx';

const Sleep = ({ user }) => {
  const [sleepRecords, setSleepRecords] = useState([]);
  const [sleepRecord, setSleepRecord] = useState({});

  // TEMPORARY TESTING MUI
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  let currentDay = new Date().toLocaleDateString();
  const rows = [
    createData(currentDay, 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  return (
    <div>
      {/* IN PROGRESS (TEMPORARY TESTING MUI) */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="sleep records">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
              <TableCell align="right">Sleep Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">
                  <Rating
                    name="Sleep Rating"
                    value={3}
                    max={7}
                    icon={<Stars fontSize="inherit" />}
                    emptyIcon={<Circle fontSize="inherit" />}
                    readOnly
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>PAIN</div>
      <Typography component="legend">Sleep Rating</Typography>
      <Rating
        name="Sleep Rating"
        defaultValue={3}
        max={7}
        icon={<Stars fontSize="inherit" />}
        emptyIcon={<Circle fontSize="inherit" />}
        readOnly
      />
      <div>hey look, you found me ;]</div>
      <img src="https://i.etsystatic.com/48285043/r/il/38bfed/5614526251/il_600x600.5614526251_36m9.jpg" />
    </div>
  );
};

export default Sleep;
