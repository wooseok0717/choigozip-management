import React, { useState, useEffect } from 'react';
import HistoryEntry from './HistoryEntry.jsx';
import axios from 'axios';

const UserHistory = () => {

  const [historyList, setHistoryList] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentOffset, setCurrentOffset] = useState(9);
  const [maxPage, setMaxPage] = useState(null);
  const [currentType, setCurrentType] = useState('');
  const [currentDisplay, setCurrentDisplay] = useState([]);

  const loadHistory = () => {
    axios.get(`/api/history/?page=${currentPage}&offset=${currentOffset}`)
    .then(({data}) => {
      setHistoryList(data);
    });
  };

  const getMaxPage = () => {
    setMaxPage(Math.ceil(filteredHistory.length/currentOffset));
  };

  const handleChange = (e) => {
    setCurrentType(e.target.value);
    console.log(e.target.value);
  };

  const filterList = () => {
    if (currentType === '') {
      setFilteredHistory(historyList);
    } else {
      setFilteredHistory(historyList.filter(hist => {
        return hist.type === currentType
      }));
    }
  }

  useEffect(() => {
    getMaxPage();
    setCurrentPage(1);
  },[filteredHistory]);

  useEffect(() => {
    setCurrentDisplay(filteredHistory.slice(currentOffset * (currentPage - 1), currentOffset * currentPage));
  },[filteredHistory, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    filterList();
  },[historyList, currentType]);

  useEffect(() => {
    loadHistory();
  },[]);

  return (
    <>
      <h3 className='page-title'>기록</h3>
      <div className='btn-ctn'>
        <select className='type-selector' onChange={handleChange}>
          <option value=''>전체</option>
          <option value='category'>카테고리</option>
          <option value='menu'>메뉴</option>
          <option value='promo'>프로모션</option>
          <option value='report'>세일즈 리포트</option>
          <option value='user'>유저</option>
        </select>
      </div>
      {currentDisplay.map((hist, ind) => (<HistoryEntry key={ind} hist={hist}/>))}
      <div className='page-selector'>
        {currentPage > 1 && (
          <span onClick={() => setCurrentPage(currentPage - 1)}>{'<'}</span>
        )}
        <span className='page-label'>{currentPage}</span>
        {currentPage < maxPage && (
          <span onClick={() => setCurrentPage(currentPage + 1)}>{'>'}</span>
        )}
      </div>
    </>
  )
}

export default UserHistory;