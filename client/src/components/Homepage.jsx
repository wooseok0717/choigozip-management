import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Homepage = () => {

  const [lowestSales, setLowestSales] = useState('');
  const [highestSales, setHighestSales] = useState('');
  const [averageSales, setAverageSales] = useState('');
  const [mostRecentSales, setMostRecentSales] = useState('');
  const [mostRecentDate, setMostRecentDate] = useState('');

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

  const getStats = () => {
    axios.get('/api/stats')
    .then(({data}) => {
      setLowestSales(data.lowest_sales);
      setHighestSales(data.highest_sales);
      setAverageSales(data.average_sales);
      setMostRecentSales(data.most_recent_sales);
      setMostRecentDate(convertTime(data.most_recent_date));
    });
  };

  useEffect(() => {
    getStats();
  },[]);

  return (
    <div>
      <div className='row-container'>
        <div className='row-item'>
          <div>최저기록:</div>
          <div>${lowestSales}</div>
        </div>
        <div className='row-item'>
          <div>최고기록:</div>
          <div>${highestSales}</div>
        </div>
        {/* <div className='row-item'>Place Holder</div> */}
      </div>
      <div className='row-container'>
        <div className='row-item'>
          <div>평균기록:</div>
          <div>${averageSales}</div>
        </div>
        <div className='row-item'>
          <div>최근기록:</div>
          <div>{mostRecentDate}</div>
          <div>${mostRecentSales}</div>
        </div>
        {/* <div className='row-item'>Place Holder</div> */}
      </div>
      <div className='row-container'>
        {/* <div className='row-item'>Place Holder</div> */}
        {/* <div className='row-item'>Place Holder</div> */}
        {/* <div className='row-item'>Place Holder</div> */}
      </div>
    </div>
  )
}

export default Homepage;