import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AddReport from './AddReport.jsx';
import SalesEntry from './SalesEntry.jsx';

const Sales = () => {

  const [newReport, setNewReport] = useState(false);
  const [salesList, setSalesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentOffset, setCurrentOffset] = useState(10);

  const loadReports = () => {
    axios.get(`/api/salesReport/?page=${currentPage}&offset=${currentOffset}`)
    .then(({data}) => setSalesList(data));
  };

  useEffect(() => {
    loadReports();
  },[currentPage]);

  return (
    <>
      <h3 className='page-title'>SALES REPORT</h3>
      <div className='btn-ctn'>
        <button onClick={() => setNewReport(true)}>Create a report</button>
      </div>
      <div className='sales-ctn'>
        <div className='sales-entry-label'>
          <div>
            Date
          </div>
          <div className='report-amount'>
            Total Sales
          </div>
          <div className='report-amount'>
            Total Tip
          </div>
          <div className='report-amount'>
            Cash Stash
          </div>
        </div>
        {salesList.map((sales, ind) => <SalesEntry key={ind} sales={sales}/>)}
      </div>
      <div className='page-selector'>
        {currentPage > 1 && <span>{'<'}</span>}
        {currentPage}
        <span>{'>'}</span>
      </div>
      {newReport && <AddReport closeModal={() => setNewReport(false)} loadReports={loadReports}/>}
    </>
  )
}

export default Sales;