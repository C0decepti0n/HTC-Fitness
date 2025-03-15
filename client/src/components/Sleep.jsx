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
  Slider,
  Button,
  ButtonGroup,
  Stack
} from '@mui/material';
import {
  Stars,
  Circle,
  Delete,
  ChangeCircle,
  PlayArrow,
  Stop,
  CheckCircle,
  CheckCircleOutline
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

  // create a default sleep record with default values to reference for filling out field values and for axios requests
  const defaultRecord = {
    quality: null,
    goal: 8,
    hours_slept: '00:00:00',
    sleep_aid: 'none',
    disturbances: 0,
    disturbance_notes: 'none',
    day: null,
    begin_sleep: null,
    stop_sleep: null,
  }

  // create a state to keep track of the field values that will be used in POST and PATCH requests
  const [fieldValues, setFieldValues] = useState({...defaultRecord});



  //////TEST start//////////////////////////////////////

  console.log(user);

  console.log(Date.now());

  let date = new Date();
date.setHours(9, 45, 0, 0); // Set hours to 9, minutes to 45, seconds and milliseconds to 0

console.log(date.toTimeString().slice(0, 8)); // Output: '09:45'

let dat2 = new Date();
dat2.setHours(9, 45, 2, 4); // Set hours to 9, minutes to 45, seconds and milliseconds to 0

console.log(dat2.toTimeString()); // Output: '09:45'



 // TEMPORARY TESTING MUI
 let currentDay = new Date().toLocaleDateString();
 let currentDayAndTime = new Date().toLocaleString();
 let currentTime = new Date().toLocaleTimeString();

 console.log(currentDay, currentDayAndTime, currentTime)

  //////TEST end//////////////////////////////////////



  useEffect(() => {
    // if sleepRecords is empty and the stopRecordsRenderLoop state/flag hasn't been tripped yet
    if(sleepRecords.length === 0 && !stopRecordsRenderLoop) {
      // set the stopRecordsRenderLoop state/flag to true;
      setStopRecordsRenderLoop(true);
      // get the user's sleep records if they aren't set in state yet
      getSleepRecords();
    } else if (sleepRecords.length !== 0 && !sleepRecord._id) {
      // otherwise if the main sleep record hasn't been set in state yet and if sleepRecords isn't empty,
      // find the first sleep record that is 'in progress' (has null for stop_sleep property) and assign the record to be the value of the state's main sleep record
      let found = false;
      for (let i = 0; i < sleepRecords.length; i++) {
        if (sleepRecords[i].stop_sleep === null) {
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

  // resolve quality rating
  const resolveRating = (quality) => {
    if (quality === null) {
      // return string if no rating
      return 'no rating yet'
    } else {
      // return rating component otherwise
      return (
        <Rating
          name='Sleep Rating'
          value={quality}
          max={7}
          icon={<Stars fontSize='inherit' />}
          emptyIcon={<Circle fontSize='inherit' />}
          readOnly
        />
      )
    }
  }

  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Box component={Paper} variant='outlined' sx={{ minWidth: 300, maxWidth: 700, textAlign: 'center', bgColor: 'secondary' }}>
          PLACEHOLDAH
        </Box>
        <Container maxWidth='lg'>
          <Box sx={{ bgcolor: '#cfe8fc', height: '10vh' }} />
          <Card component={Card} variant='outlined' sx={{ minWidth: 300, maxWidth: 'lg', textAlign: 'center', bgcolor: 'primary', fontSize: 30 }}>
            {/* Display the "time slept" for the current sleepRecord */}
            <Typography variant='h1' textAlign='center' color={sleepRecord.stop_sleep ? 'white' : 'gray'}>
              {sleepRecord.hours_slept}
            </Typography>
            <Divider />
            <Box component={Paper} variant='outlined'>
              <Stack direction='column' spacing={5}>
                <Box display="flex">
                  Goal (Hours):
                  <Typography color='gray'>
                    {fieldValues.goal}
                  </Typography>
                  <Slider valueLabelDisplay="auto" defaultValue={8} step={1} marks min={0} max={24}/>
                </Box>
                <Box display="flex">
                  <PlayArrow fontSize='inherit' />
                  <Chip label='Start Sleep Timer' variant='outlined' onClick={e => {console.log('foobar')}} />
                </Box>
              </Stack>
            </Box>
            <Box component={Paper} variant='outlined' display="flex" justifyContent="center" alignItems="center" sx={{ minWidth: 300, maxWidth: 'lg' }}>
              <Stack direction='row' spacing={5}>
                <Box display="flex">
                  <PlayArrow fontSize='inherit' />
                  <Chip label='Start Sleep Timer' variant='outlined' onClick={e => {console.log('foobar')}} />
                </Box>
                <Box display="flex">
                  <Stop fontSize='inherit' />
                  <Chip label='Stop Sleep Timer' variant='outlined' onClick={e => {console.log('foobar')}} />
                </Box>
                <Divider variant='middle' orientation='vertical' flexItem />
                <Box display="flex">
                  <ChangeCircle fontSize='inherit' />
                  <Chip label='Update Current' variant='outlined' onClick={e => {console.log('foobar')}} />
                </Box>
                <Box display="flex">
                  <Delete fontSize='inherit' />
                  <Chip label='Delete Current' variant='outlined' onClick={e => {console.log('foobar')}} />
                </Box>
              </Stack>
            </Box>
          </Card>
        </Container>
      </Box>
      <Divider variant='middle' />
      <Box sx={{ p: 2 }}>
        {/* Table to hold all of the user's sleep records */}
        <TableContainer component={Paper} variant='outlined'>
          <Table sx={{ minWidth: 700 }} aria-label='sleep records'>
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell align='right'>Time Slept (H:M:S)</TableCell>
                <TableCell align='right'>Hours Goal</TableCell>
                <TableCell align='right'>Disturbances</TableCell>
                <TableCell align='right'>Disturbance Notes</TableCell>
                <TableCell align='right'>Sleep Aid Used</TableCell>
                <TableCell align='right'>Sleep Starting Time</TableCell>
                <TableCell align='right'>Sleep Ending Time</TableCell>
                <TableCell align='right'>Sleep Rating</TableCell>
                <TableCell align='right'>Options</TableCell>
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
                  <TableCell align='right'>{sleepRecordObj.begin_sleep.toLocaleString()}</TableCell>
                  <TableCell align='right'>{sleepRecordObj.stop_sleep}</TableCell>
                  <TableCell align='right'>
                    {resolveRating(sleepRecordObj.quality)}
                  </TableCell>
                  <TableCell align='right'>
                    <ButtonGroup variant='contained' aria-label='quick select and delete'>
                      <Button>
                        {sleepRecordObj._id === sleepRecord._id ? <CheckCircle fontSize='inherit' /> : <CheckCircleOutline fontSize='inherit' /> }
                        Select
                      </Button>
                      <Button>
                        <Delete fontSize='inherit' />
                        Delete
                      </Button>
                    </ButtonGroup>
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
