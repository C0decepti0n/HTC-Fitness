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
  Stack,
  TextField
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

  // create a state that will increase by 1 each time it is updated, allowing it to approximately give you the
  // amount of seconds since the Sleep Tracker page was opened. This state will be updated on startup and every
  // second after that, allowing timers to be constantly updated by it
  const [masterTimer, setMasterTimer] = useState(0);

  // create a default sleep record with default values to reference for filling out field values and for axios requests
  const defaultRecord = {
    quality: null,
    goal: 8,
    hours_slept: '00:00:00',
    sleep_aid: 'none',
    disturbances: 0,
    disturbance_notes: 'none',
    begin_sleep: null,
    stop_sleep: null,
  }

  // create a state to keep track of the field values that will be used in PATCH requests
  // insert pre_goal and pre_sleep_aid properties to keep track of field values used in POST requests
  const [fieldValues, setFieldValues] = useState({
    pre_goal: 8,
    pre_sleep_aid: 'none',
    ...defaultRecord
  });



  //////TEST start//////////////////////////////////////

  console.log(user);

  console.log(Date.now());

  console.log('dayjs');
  console.log(dayjs());

  const currentDateyy = dayjs();
const formattedDateyy = currentDateyy.format('YYYY-MM-DD HH:mm:ss');
console.log(formattedDateyy);


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


  // run on startup and whenever sleepRecords is changed
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

  // run on startup and whenever masterTimer is changed
  useEffect(() => {
    setTimeout(() => {
      console.log('amongus');
      setMasterTimer(masterTimer + 1);
    }, 1000);
  }, [masterTimer]);

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

  // POST new (unfinished) sleep record
  const postSleepRecord = () => {
    // create copy of defaultRecord object and name it 'input'
    const input = {...defaultRecord};

    // Replace the goal and sleep_aid properties with values from the 'pre' properties in the input fields
    input.goal = fieldValues.pre_goal;
    input.sleep_aid = fieldValues.pre_sleep_aid;

    // use current date for begin_sleep
    input.begin_sleep = dayjs();

    // use the input object to make a new sleep record
    axios.post(`/api/sleep/${user._id}`, input)
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
  const patchSleepRecord = (isResultOfStopTimer) => {
    // create an empty object and name it 'input'
    const input = {};

    // if patchSleepRecord was the result of stopping the sleep timer, then patch only the stop_sleep property
    if (isResultOfStopTimer) {
      // assign current date to input as the value of stop_sleep
      input.stop_sleep = dayjs();
    } else {
      // otherwise, loop through the field values
      for (let key in fieldValues) {
        if (fieldValues[key] === '') {

        }
      }
    }

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
  const deleteSleepRecord = (id) => {
    // delete the sleep record associated with the given input id
    axios.delete(`/api/sleep/${user._id}/${id}`)
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

  // updates the corresponding property in the fieldValues state when an input field is interacted with
  const updateFieldInputs = (type, val) => {
    console.log(fieldValues);
    setFieldValues(currentFieldValues => {
      const copy = {...currentFieldValues};
      copy[type] = val;
      return copy;
    })
  }

  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Box component={Paper} variant='outlined' sx={{ minWidth: 300, maxWidth: 700, textAlign: 'center', bgColor: 'secondary' }}>
          PLACEHOLDAH
        </Box>
        <Container maxWidth='lg'>
          <Box sx={{ bgcolor: '#cfe8fc', height: '10vh' }} />
          <Card component={Card} variant='outlined' sx={{ minWidth: 300, maxWidth: 'lg', textAlign: 'center', bgcolor: 'primary' }}>
            {/* Display the "time slept" for the current sleepRecord */}
            <Typography variant='h1' textAlign='center' fontSize={90} color={sleepRecord.stop_sleep ? 'white' : 'gray'}>
              {sleepRecord.hours_slept}
            </Typography>
            <Divider />
            <Box component={Paper} variant='outlined'>
              <Typography variant='h3' textAlign='center'>
                Inputs for New Sleep Record
              </Typography>
              <Stack direction='column' spacing={5}>
                <Box display="flex">
                  Goal (Hours):&nbsp;
                  <Typography color='gray'>
                    {fieldValues.pre_goal}&nbsp;
                  </Typography>
                  <Slider valueLabelDisplay="auto" value={fieldValues.pre_goal} step={1} marks min={0} max={24} onChange={e => {updateFieldInputs('pre_goal', e.target.value)}} />
                </Box>
                <Box display="flex">
                  Sleep Aid:&nbsp;
                  <Typography color='gray'>
                    {fieldValues.pre_sleep_aid}&nbsp;
                  </Typography>
                  <TextField label="Describe items used to help you sleep" variant="outlined" value={fieldValues.pre_sleep_aid} onChange={e => {updateFieldInputs('pre_sleep_aid', e.target.value)}} />
                </Box>
              </Stack>
            </Box>
            <Box component={Paper} variant='outlined' display="flex" justifyContent="center" alignItems="center" fontSize={30} sx={{ minWidth: 300, maxWidth: 'lg' }}>
              <Stack direction='row' spacing={5}>
                <Box display="flex">
                  <PlayArrow fontSize='inherit' />
                  <Chip label='Start Sleep Timer' variant='outlined' onClick={postSleepRecord} />
                </Box>
                <Divider variant='middle' orientation='vertical' flexItem />
                <Box display="flex">
                  <Stop fontSize='inherit' />
                  <Chip label='Stop Sleep Timer' variant='outlined' onClick={() => {patchSleepRecord(true)}} />
                </Box>
              </Stack>
            </Box>
            <Divider />
            <Box component={Paper} variant='outlined'>
              <Typography variant='h3' textAlign='center'>
                Inputs for Selected Sleep Record
              </Typography>
              <Stack direction='column' spacing={5}>
                <Box display="flex">
                  Goal (Hours):&nbsp;
                  <Typography color='gray'>
                    {fieldValues.goal}&nbsp;
                  </Typography>
                  <Slider valueLabelDisplay="auto" value={fieldValues.goal} step={1} marks min={0} max={24} onChange={e => {updateFieldInputs('goal', e.target.value)}} />
                </Box>
                <Box display="flex">
                  Time Slept (HH:MM:SS):&nbsp;
                  <Typography color='gray'>
                    {fieldValues.hours_slept}&nbsp;
                  </Typography>
                  <TextField label="Insert time you slept (HH:MM:SS)" variant="outlined" value={fieldValues.hours_slept} onChange={e => {updateFieldInputs('hours_slept', e.target.value)}} />
                </Box>
                <Box display="flex">
                  Sleep Aid:&nbsp;
                  <Typography color='gray'>
                    {fieldValues.sleep_aid}&nbsp;
                  </Typography>
                  <TextField label="Describe items used to help you sleep" variant="outlined" value={fieldValues.sleep_aid} onChange={e => {updateFieldInputs('sleep_aid', e.target.value)}} />
                </Box>
                <Box display="flex">
                  Disturbance Count:&nbsp;
                  <Typography color='gray'>
                    {fieldValues.disturbances}&nbsp;
                  </Typography>
                  <Slider valueLabelDisplay="auto" value={fieldValues.disturbances} step={1} marks min={0} max={10} onChange={e => {updateFieldInputs('disturbances', e.target.value)}} />
                  {/* <TextField label="Insert number of disturbances" variant="outlined" value={fieldValues.disturbances} onChange={e => {updateFieldInputs('disturbances', e.target.value)}} /> */}
                </Box>
                <Box display="flex">
                  Time Sleep Began:&nbsp;
                  <Typography color='gray'>
                    {fieldValues.begin_sleep}&nbsp;
                  </Typography>
                  <TextField label="Insert time when sleep began" variant="outlined" value={fieldValues.begin_sleep} onChange={e => {updateFieldInputs('begin_sleep', e.target.value)}} />
                </Box>
                <Box display="flex">
                  Time Sleep Ended:&nbsp;
                  <Typography color='gray'>
                    {fieldValues.stop_sleep}&nbsp;
                  </Typography>
                  <TextField label="Insert time when sleep ended" variant="outlined" value={fieldValues.stop_sleep} onChange={e => {updateFieldInputs('stop_sleep', e.target.value)}} />
                </Box>
                <Box display="flex">
                  Disturbance Notes:&nbsp;
                  <Typography color='gray'>
                    {fieldValues.disturbance_notes}&nbsp;
                  </Typography>
                  <TextField label="Describe sleep disturbances" variant="outlined" value={fieldValues.disturbance_notes} onChange={e => {updateFieldInputs('disturbance_notes', e.target.value)}} />
                </Box>
              </Stack>
            </Box>
            <Box component={Paper} variant='outlined' display="flex" justifyContent="center" alignItems="center" fontSize={30} sx={{ minWidth: 300, maxWidth: 'lg' }}>
              <Stack direction='row' spacing={5}>
                <Box display="flex">
                  <ChangeCircle fontSize='inherit' />
                  <Chip label='Update Current' variant='outlined' onClick={e => {console.log('foobar')}} />
                </Box>
                <Divider variant='middle' orientation='vertical' flexItem />
                <Box display="flex">
                  <Delete fontSize='inherit' />
                  <Chip label='Delete Current' variant='outlined' onClick={() => {deleteSleepRecord(sleepRecord._id)}} />
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
                <TableCell align='right'>Time Slept (HH:MM:SS)</TableCell>
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
                    {dayjs(sleepRecordObj.begin_sleep).format('YYYY-MM-DD')}
                  </TableCell>
                  <TableCell align='right'>{sleepRecordObj.hours_slept}</TableCell>
                  <TableCell align='right'>{sleepRecordObj.goal}</TableCell>
                  <TableCell align='right'>{sleepRecordObj.disturbances}</TableCell>
                  <TableCell align='right'>{sleepRecordObj.disturbance_notes}</TableCell>
                  <TableCell align='right'>{sleepRecordObj.sleep_aid}</TableCell>
                  <TableCell align='right'>{dayjs(sleepRecordObj.begin_sleep).format('YYYY-MM-DD hh:mm:ss A')}</TableCell>
                  <TableCell align='right'>{sleepRecordObj.stop_sleep ? dayjs(sleepRecordObj.stop_sleep).format('YYYY-MM-DD hh:mm:ss A') : 'not set' }</TableCell>
                  <TableCell align='right'>
                    {resolveRating(sleepRecordObj.quality)}
                  </TableCell>
                  <TableCell align='right'>
                    <ButtonGroup variant='contained' aria-label='quick select and delete'>
                      <Button onClick={() => {setSleepRecord(sleepRecordObj)}}>
                        {sleepRecordObj._id === sleepRecord._id ? <CheckCircle fontSize='inherit' /> : <CheckCircleOutline fontSize='inherit' /> }
                        Select
                      </Button>
                      <Button onClick={() => {deleteSleepRecord(sleepRecordObj._id)}}>
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
