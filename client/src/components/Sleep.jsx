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

  console.log(user);

  // TEMPORARY TESTING MUI
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  let currentDay = new Date().toLocaleDateString();
  const rows = [
    createData(currentDay, 8.1, 5.5, 0, 'none'),
    createData(currentDay, 4, 9, 0, 4.3),
    createData(currentDay, 9, 10, 0, 6.0),
    createData(currentDay, 20, 8, 0, 4.3),
    createData(currentDay, 7, 8, 0, 3.9),
  ];

  return (
    <div>
      {/* IN PROGRESS (TEMPORARY TESTING MUI) */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="sleep records">
          <TableHead>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell align="right">Hours Slept</TableCell>
              <TableCell align="right">Hours Goal</TableCell>
              <TableCell align="right">Disturbances</TableCell>
              <TableCell align="right">Disturbance Notes</TableCell>
              <TableCell align="right">Sleep Aid Used</TableCell>
              <TableCell align="right">Sleep Starting Time</TableCell>
              <TableCell align="right">Sleep Ending Time</TableCell>
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
      <div>emotional support V1 for programmers ;]</div>
      <img src="https://i.etsystatic.com/48285043/r/il/38bfed/5614526251/il_600x600.5614526251_36m9.jpg" />
    </div>
  );
};

export default Sleep;
