import React from 'react';

const HistoryEntry = ({hist}) => {

  const convertTime = (time) => {
    const options = {
      month: 'numeric',
      day: 'numeric',
      timeZone: 'America/Los_Angeles'
    };
    const newDate = new Date(time);
    // comeback for fix this code
    newDate.setDate(newDate.getDate() + 1);
    return newDate.toLocaleString('en-US', options);
  };

  return (
    <div className='hist-entry'>
      <div>
        {hist.creator}
      </div>
      <div>
        {hist.message}
      </div>
      <div>
        {convertTime(hist.created_at)}
      </div>
    </div>
  )
}

export default HistoryEntry;