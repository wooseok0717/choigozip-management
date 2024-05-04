import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddReport = ({ closeModal }) => {

  const [cashSales, setCashSales] = useState('');
  const [creditSales, setCreditSales] = useState('');
  const [totalSales, setTotalSales] = useState('');
  const [creditTip, setCreditTip] = useState('');
  const [cashTip, setCashTip] = useState('');
  const [totalTip, setTotalTip] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().substr(0, 10));

  const handleSubmit = () => {
    const obj = {
      selectedDate,cashSales, creditSales,totalSales,creditTip,cashTip,totalTip
    }
    axios.post('/api/salesReport', obj)
    .then(({data}) => console.log(data));
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const getTotal = (card, cash, unit) => {
    return (Number(card) + Number(cash)).toFixed(2);
  };

  useEffect(() => {
    setTotalSales(getTotal(creditSales, cashSales, 'Sales'));
  }, [cashSales, creditSales]);

  useEffect(() => {
    setTotalTip(getTotal(creditTip, cashTip, 'Tips'));
  }, [cashTip, creditTip]);

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h4 className='modal-title'>Add Report</h4>
        </div>
        <div className='modal-body'>
          <div>
            <input type='date' value={selectedDate} onChange={handleDateChange}/>
          </div>
          <div>
            Cash Sales:
            <input type='number' value={cashSales} onChange={e => setCashSales(e.target.value)}/>
          </div>
          <div>
            Credit Sales:
            <input type='number' value={creditSales} onChange={e => setCreditSales(e.target.value)}/>
          </div>
          <div>
            Total Sales:
            ${totalSales}
          </div>
          <div>
            Credit Tip:
            <input type='number' value={creditTip} onChange={e => setCreditTip(e.target.value)}/>
          </div>
          <div>
            Cash Tip:
            <input type='number' value={cashTip} onChange={e => setCashTip(e.target.value)}/>
          </div>
          <div>
            Total Tip:
            ${totalTip}
          </div>
        </div>
        <div className='modal-footer'>
          <button onClick={handleSubmit}>Add Report</button>
          <button onClick={() => closeModal()}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default AddReport;