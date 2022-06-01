import * as React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format, formatDistance, isBefore } from 'date-fns';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { useSetRecoilState } from 'recoil';
import { dateAtom } from '../../../atom';

export default function MaterialUIPickers() {

  const setDateObject = useSetRecoilState(dateAtom);
  const today = new Date();

  const handleChange = (date) => {
    const distance = formatDistance(date, today);
    const formo = format(date, 'd MMM y');
    const object = { inDays: distance, choiceDate: formo }
    setDateObject(object);
  };
  const isDateInvalid = date => {
    return isBefore(date, today)
  }

  return (
    <>
      <p className='h3'>{`#Data & Time`}</p>
      <div style={{ padding: "15px", backgroundColor: "white" }} >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            orientation='landscape'
            openTo='day'
            value={today}
            shouldDisableDate={isDateInvalid}
            onChange={handleChange}
          >
          </StaticDatePicker>
        </LocalizationProvider>
      </div>
    </>


  );
}