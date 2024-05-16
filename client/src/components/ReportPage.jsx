import React, { useState, useEffect } from 'react';
import ReportOfSales from './ReportOfSales.jsx';
import ReportOfTime from './ReportOfTime.jsx';
import axios from 'axios';

const ReportPage = () => {

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [salesData, setSalesData] = useState([]);
  const [timecardData, setTimecardData] = useState([]);
  const [calculatedTime, setCalculatedTime] = useState([]);

  const getSales = () => {
    axios.get(`/api/salesDate`, {
      params: {
        startDate, endDate
      }
    })
    .then(({data}) => setSalesData(data));
  }

  const getTimeData = () => {
    const newDate = new Date(endDate);
    newDate.setDate(newDate.getDate() + 1);
    axios.get('/api/timeData', {
      params: {
        startDate, endDate: newDate
      }
    })
    .then(({data}) => setTimecardData(data));
  }

  const collectData = () => {
    if (startDate === '') {
      console.log('set a start date');
    } else if (endDate === '') {
      console.log('set a end date');
    } else {
      // all the retrieve should happen here.
      getSales();
      getTimeData();
    }
  };

  const sortDataByUser = () => {
    const users = {};
    timecardData.forEach(row => {
      if (!users[row.user_id]) {
        users[row.user_id] = [];
      }
      users[row.user_id].push(row);
    });
    const sumOfTime = [];
    Object.keys(users).forEach(user => {
      let obj = {user:user, name: users[user][0].name};
      let total = 0;
      let difference = 0;
      let currentIn = null
      users[user].forEach(row => {
        if (row.interaction === 'in') {
          currentIn = row.time;
        } else {
          if (currentIn !== null) {
            difference += new Date(row.time) - new Date(currentIn);
            currentIn = null
          }
        }
      });
      obj.time = (difference / (60 * 60 * 1000)).toFixed(2);
      sumOfTime.push(obj);
    });
    setCalculatedTime(sumOfTime);
  }

  useEffect(() => {
    if (timecardData.length) {
      sortDataByUser();
    }
  },[timecardData]);

  useEffect(() => {
    collectData();
  },[startDate, endDate]);

  return (
    <div>
      <h3 className='page-title'>리포트 보기</h3>
      <div className='date-selector'>
        <span>
          시작일:
          <input type='date' className='date-selector-input' value={startDate} onChange={e =>setStartDate(e.target.value)}/>
        </span>
        <span>
          마감일:
          <input type='date' className='date-selector-input' value={endDate} onChange={e =>setEndDate(e.target.value)}/>
        </span>
      </div>
      {salesData.length ? (<ReportOfSales data={salesData[0]}/>) : null}
      {calculatedTime.length ? (<ReportOfTime data={calculatedTime}/>) : null}
    </div>
  )
}

export default ReportPage;