import React from 'react';

const ReportOfTime = ({data}) => {

  return (
    <div>
      <div className='times-label'>
        Timecard
      </div>
      <div className='times-report-display'>
        {data.map((user, ind) => (
          <div className='times-report-entry' key={ind}>
            <span>
              {user.name}
            </span>
            <span>
              {user.time}
            </span>
            <span>
              Hours
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReportOfTime;