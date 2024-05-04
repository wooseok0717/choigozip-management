import React from 'react';

const SalesEntry = ({sales}) => {

  console.log(sales);

  const convertTime = (time) => {
    const options = {
      month: 'numeric',
      day: 'numeric',
      timeZone: 'America/Los_Angeles'
    };
    const date = new Date(time);
    return date.toLocaleString('en-US', options);
  };

  const calculateCash = (sales, tip) => {
    return Math.round(Number(sales) + Number(tip))
  }

  return (
    <div className='sales-entry'>
      <div>
        {convertTime(sales.created_at)}
      </div>
      <div className='report-amount'>
        ${sales.total_sales}
      </div>
      <div className='report-amount'>
        ${sales.total_tip}
      </div>
      <div className='report-amount'>
        ${calculateCash(sales.cash_sales, sales.cash_tip)}
      </div>
    </div>
  )
}

export default SalesEntry;