import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AddReport from './AddReport.jsx';
import SalesEntry from './SalesEntry.jsx';

const Sales = () => {

  const [newReport, setNewReport] = useState(false);
  const [salesList, setSalesList] = useState([]);

  const loadReports = () => {
    axios.get('/api/salesReport')
    .then(({data}) => setSalesList(data));
  };

  useEffect(() => {
    loadReports();
  },[]);

  return (
    <>
      <h3 className='page-title'>SALES REPORT</h3>
      <div className='btn-ctn'>
        <button onClick={() => setNewReport(true)}>Create a report</button>
      </div>
      {salesList.map((sales, ind) => <SalesEntry key={ind} sales={sales}/>)}
      {newReport && <AddReport closeModal={() => setNewReport(false)} loadReports={loadReports}/>}
    </>
  )
}

export default Sales;