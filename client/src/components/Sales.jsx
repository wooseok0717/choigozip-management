import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AddReport from './AddReport.jsx';

const Sales = () => {

  const [newReport, setNewReport] = useState(false);

  return (
    <>
      <h3 className='page-title'>SALES REPORT</h3>
      <div className='btn-ctn'>
        <button onClick={() => setNewReport(true)}>Create a report</button>
      </div>
      {newReport && <AddReport closeModal={() => setNewReport(false)}/>}
    </>
  )
}

export default Sales;