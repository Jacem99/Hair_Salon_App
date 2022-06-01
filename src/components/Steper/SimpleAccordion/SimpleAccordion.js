import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "../SimpleAccordion/SimpleAccordion.css"
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { dataAtom } from '../../../atom';
;
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleAccordion() {

  const classes = useStyles();
  const [data, setData] = useState([{}]);
  useEffect(() => {
    axios.get("https://fci-back-end.herokuapp.com/services")
      .then(d => {
        setData(d.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const [dataArray, setDataArray] = useRecoilState(dataAtom);

  const handleChange = (event, service) => {
    // service.startTime="";
    // console.log(ser)
    const item = dataArray.findIndex((m) => m.id === service.id);
    if (event.target.checked) {
      if (item === -1) {
        setDataArray([...dataArray, service])
      }
    } else {
      setDataArray([
        ...dataArray.slice(0, item),
        ...dataArray.slice(item + 1)
      ]);
    }

  }

  return (
    <div className={classes.root} style={{
      marginTop: '2px',
      marginBottom: '14px'
    }}>
      <p className='h3'>#Services</p>
      {
        data.map(d =>
          <Accordion key={d.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <p className='h6'>{d.name}</p>
            </AccordionSummary>
            <AccordionDetails>
              <div className='List'>{
                d && d.services ? d.services.map(dd =>
                  <div className='Listgroup' key={dd.id}>
                    <div className='ListG1 gg'>
                      <p>{dd.name}</p>
                      <ul>
                        <li style={{ fontWeight: "bold" }} >
                          {`${dd.durationInMinutes} minutes`}</li>
                        <li>{`${dd.description}`}</li>
                      </ul>
                    </div>
                    <div className='ListG2'>
                      $ {dd.price}
                      <input
                        type="checkbox"
                        onClick={(event) => handleChange(event, dd)}
                        className='form-check-input"'
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </AccordionDetails>
          </Accordion>
        )
      }
    </div>
  );

}