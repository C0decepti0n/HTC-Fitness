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
  Divider,
  Chip,
  Box,
  Card,
  Container,
  GlobalStyles,

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
  // create states for the sleep records table and the main sleep record to be displayed
  const [sleepRecords, setSleepRecords] = useState([]);
  const [sleepRecord, setSleepRecord] = useState({});

  // create a state to use as a flag to know when to prevent useEffect from running getSleepRecords
  // (prevents an infinite loop that is caused when sleepRecords is empty)
  const [stopRecordsRenderLoop, setStopRecordsRenderLoop] = useState(false);

  // create a state to keep track of the field values that will be used in POST and PATCH requests
  const [fieldValues, setFieldValues] = useState({
    in_progress: true,
    quality: null,
    // ^ maybe use 'in progress'?
    goal: 8,
    hours_slept: null,
    sleep_aid: 'none',
    disturbances: 0,
    disturbance_notes: 'none',
    day: null,
    begin_sleep: null,
    stop_sleep: null,
  });

  console.log(user);

  useEffect(() => {
    // if sleepRecords is empty and the stopRecordsRenderLoop state/flag hasn't been tripped yet
    if(sleepRecords.length === 0 && !stopRecordsRenderLoop) {
      // set the stopRecordsRenderLoop state/flag to true;
      setStopRecordsRenderLoop(true);
      // get the user's sleep records if they aren't set in state yet
      getSleepRecords();
    } else if (sleepRecords.length !== 0 && !sleepRecord._id) {
      // otherwise if the main sleep record hasn't been set in state yet and if sleepRecords isn't empty,
      // find the first sleep record that is 'in progress' and assign the record to be the value of the state's main sleep record
      let found = false;
      for (let i = 0; i < sleepRecords.length; i++) {
        if (sleepRecords[i].in_progress) {
          found = true;
          setSleepRecord(sleepRecords[i]);
          break;
        }
      }

      // if an 'in progress' sleep record can't be found, use the most recent record instead
      if (!found) {
        setSleepRecord(sleepRecords[0]);
      }
    }
  }, [sleepRecords]);

  // GET sleep records
  const getSleepRecords = () => {
    axios.get(`/api/sleep/${user._id}`)
    .then(sleepRecordsObj => {
      console.log('GET');
      console.log(sleepRecordsObj);
      // assign the obtained records to the sleepRecords state
      setSleepRecords(sleepRecordsObj.data.data);
    })
    .catch(err => {
      console.error('Failed to find sleep records', err)
    });
  }

  // POST new sleep record
  const postSleepRecord = () => {
    axios.post(`/api/sleep/${user._id}`, {})
    .then(newSleepRecordObj => {
      console.log('POST');
      console.log(newSleepRecordObj);
      // refresh sleep records in state
      getSleepRecords();
    })
    .catch(err => {
      console.error('Failed to find sleep records', err)
    });
  }

  // PATCH new sleep record
  const patchSleepRecord = () => {
    axios.patch(`/api/sleep/${user._id}/${sleepRecord._id}`, {})
    .then(oldSleepRecordObj => {
      console.log('PATCH');
      console.log(oldSleepRecordObj);
      // refresh sleep records in state
      getSleepRecords();
    })
    .catch(err => {
      console.error('Failed to find sleep records', err)
    });
  }

  // DELETE sleep record
  const deleteSleepRecord = () => {
    axios.delete(`/api/sleep/${user._id}/${sleepRecord._id}`)
    .then(deletedSleepRecordsObj => {
      console.log('DELETE');
      console.log(deletedSleepRecordsObj);
      // refresh sleep records in state
      getSleepRecords();
    })
    .catch(err => {
      console.error('Failed to find sleep records', err)
    });
  }

  // TEMPORARY TESTING MUI
  function createData(day, hours, goal, disturbances, disturbanceNotes, aid, start, end, rating) {
    return { day, hours, goal, disturbances, disturbanceNotes, aid, start, end, rating };
  }
  let currentDay = new Date().toLocaleDateString();
  const rows = [
    createData(currentDay, 8.1, 5.5, 0, 'none', 'none', 12, 18),
    createData(currentDay, 4, 9, 0, 'none', '...', 12, 18),
    createData(currentDay, 9, 10, 0, 'mosquito', 'none', 12, 18),
    createData(currentDay, 20, 8, 0, 'none', 'none', 12, 18),
    createData(currentDay, 7, 8, 0, 'loud people', 'lavender', new Date().toString(), null ),
  ];

  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Card component={Card} variant='outlined' sx={{ minWidth: 300, maxWidth: 700, textAlign: 'center', bgColor: 'secondary' }}>
          PLACEHOLDAH
        </Card>
        <Container maxWidth="lg">
          <Box sx={{ bgcolor: '#cfe8fc', height: '10vh' }} />
          <Box component={Paper} variant='outlined' sx={{ minWidth: 300, maxWidth: 700, textAlign: 'center', bgcolor: 'primary' }}>
            {/* <Typography variant='h1' textAlign='center'> */}
            <GlobalStyles styles={{ h1: { color: 'grey' } }} />
            <h1>Grey h1 element</h1>
            {/* </Typography> */}
          </Box>
        </Container>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        {/* IN PROGRESS (TEMPORARY TESTING MUI) */}
        <TableContainer component={Paper} variant='outlined'>
          <Table sx={{ minWidth: 700 }} aria-label='sleep records'>
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell align='right'>Hours Slept</TableCell>
                <TableCell align='right'>Hours Goal</TableCell>
                <TableCell align='right'>Disturbances</TableCell>
                <TableCell align='right'>Disturbance Notes</TableCell>
                <TableCell align='right'>Sleep Aid Used</TableCell>
                <TableCell align='right'>Sleep Starting Time</TableCell>
                <TableCell align='right'>Sleep Ending Time</TableCell>
                <TableCell align='right'>Sleep Rating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sleepRecords.map((sleepRecordObj) => (
                <TableRow
                  key={sleepRecordObj._id}
                  sx={{ '&:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {sleepRecordObj.day}
                  </TableCell>
                  <TableCell align='right'>{sleepRecordObj.hours_slept}</TableCell>
                  <TableCell align='right'>{sleepRecordObj.goal}</TableCell>
                  <TableCell align='right'>{sleepRecordObj.disturbances}</TableCell>
                  <TableCell align='right'>{sleepRecordObj.disturbance_notes}</TableCell>
                  <TableCell align='right'>{sleepRecordObj.sleep_aid}</TableCell>
                  <TableCell align='right'>{sleepRecordObj.begin_sleep}</TableCell>
                  <TableCell align='right'>{sleepRecordObj.stop_sleep}</TableCell>
                  <TableCell align='right'>
                    <Rating
                      name='Sleep Rating'
                      value={sleepRecordObj.rating}
                      max={7}
                      icon={<Stars fontSize='inherit' />}
                      emptyIcon={<Circle fontSize='inherit' />}
                      readOnly
                    />
                    in_progress: true,
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div>PAIN</div>
        <Typography component='legend'>Sleep Rating</Typography>
        <Rating
          name='Sleep Rating'
          defaultValue={3}
          max={7}
          icon={<Stars fontSize='inherit' />}
          emptyIcon={<Circle fontSize='inherit' />}
          readOnly
        />
        <div>emotional support V1 for programmers ;]</div>
        <img src='https://i.etsystatic.com/48285043/r/il/38bfed/5614526251/il_600x600.5614526251_36m9.jpg' />
      </Box>
    </div>
  );
};

export default Sleep;
