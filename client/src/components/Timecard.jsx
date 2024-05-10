import React, { useState,useEffect } from 'react';
import axios from 'axios';

function Timecard() {

  const [recentlyClockedIn, setRecentlyClockedIn] = useState(false);
  const [currentAction, setCurrentAction] = useState('in');
  const [recentActivities, setRecentActivities] = useState([]);

  const getRecentActivity = () => {
    axios.get(`/api/getRecentActivity/?id=${localStorage.getItem('user_id')}`)
    .then(({data}) => {
      // if (data[data.length - 1].interaction === 'in') {
      //   setCurrentAction('out');
      // } else {
      //   setCurrentAction('in');
      // }
      setRecentActivities(data);
    });
  };

  const handleClick = () => {
    axios.post('/api/createTimeStamp', {
      id: localStorage.getItem('user_id'),
      action: currentAction,
      time: new Date().toLocaleString("en-US",{ timeZone: "America/Los_Angeles" }),
    })
    .then(({data}) => {
      getRecentActivity();
      axios.post('/api/record', {
        creator: localStorage.getItem('name'),
        action: `타임카드를 "${currentAction}" 하셨습니다.`,
        type: 'user'
      })
      .then(({data}) => console.log(data));
    });
  };

  const covertTime = (time) => {
    const options = {
      weekday: 'long', // Full name of the day of the week
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true // Use 12-hour clock format
    };
    const date = new Date(time);
    return date.toLocaleString('en-US', options);
  };

  useEffect(() => {
    getRecentActivity();
  },[]);

  useEffect(() => {
    if (recentActivities.length) {
      if (recentActivities[0].interaction === 'in') {
        setCurrentAction('out');
      } else {
        setCurrentAction('in');
      }
    }
  },[recentActivities]);

  return (
    <>
      <h3 className='page-title'>타임카드</h3>
      <h2>
        {localStorage.getItem('name')}님으로 사용중이십니다.
      </h2>
      <div className='btn-ctn'>
        {currentAction === 'in' ? (
          <button onClick={() => handleClick()}>Clock In</button>
        ) : (
          <button onClick={() => handleClick()}>Clock Out</button>
        )
        }
      </div>
      <div>최근기록</div>
      <div>
        {recentActivities.map((row,index) => (
          <div key={index}>
            {covertTime(row.time)} {row.time} {row.interaction.toUpperCase()}
          </div>
        ))}
      </div>


    </>
  );
}

export default Timecard;