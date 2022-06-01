import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SimpleAccordion from './SimpleAccordion/SimpleAccordion';
import MaterialUIPickers from './Date_Fns/MaterialUIPickers';
import "./Steper.css"
import SideComponent from "../Steper/SideComponent/SideComponent";
import Finalizing from './Finalizing/Finalizing';
import Location from '../Apps/Location/Location';
import { dataAtom, dateAtom } from '../../atom';
import { useRecoilState , useRecoilValue } from 'recoil';
import axios from 'axios';
import {useNavigate} from "react-router-dom"
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Services', 'Date1 & Time', 'Finalizing'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <div className='container'><SimpleAccordion /></div>;
    case 1:
      return <MaterialUIPickers />;
    case 2:
      return <Finalizing />;
    default:
      return 'Unknown step';
  }
}

export default function HorizontalLinearStepper() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  const [dataArray, setDataArray] = useRecoilState(dataAtom);
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const dateObject = useRecoilValue(dateAtom);
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      let test = dataArray;
      const testing = test.map(p => p ? {...p, startTime: dateObject.inDays } : null);
      const d = {
        "date": dateObject.choiceDate,
        "services": testing
        }
      axios.post("https://fci-back-end.herokuapp.com/bookings", d)
            .then(dd => {
              console.log(dd)
              navigate('/booking')
            })
            .catch(err => {
              console.log(err)
            })
          }
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      };
      
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setDataArray([]);
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div className='row mLeft'>
            <div className='col-sm-12 col-md-8 mRight'>
              <div className='mt-3'>{getStepContent(activeStep)}</div>
            </div>
            <div className='divLeft border rounded overflow-hidden container col-sm-11 col-md-3 mt-5'
              style={{ backgroundColor: "white" }}>
              <div>
                <div style={{ marginTop: "8px" }}>
                  <button type="button"
                    className="btn btn-outline-primary  btn_margin"
                    onClick={handleBack}
                  >back</button>

                  {isStepOptional(activeStep) && (
                    <button type="button"
                      disabled={activeStep === 0}
                      className="btn btn-outline-primary  btn_margin"
                      onClick={handleSkip}
                    >skip</button>
                  )}
                  <button type="button"
                    className="btn btn-primary "
                    onClick={handleNext}
                    disabled={dataArray.length === 0 ? true : false}
                  >{activeStep === steps.length - 1 ? 'Saving Booking' : 'Next'}
                  </button>
                </div>
              </div>
              <p style={{ clear: "left" }}></p>
              <Location />
                <SideComponent />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
