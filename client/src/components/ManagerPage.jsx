import React from 'react';

const ManagerPage = ({setCurrentPage}) => {

  return (
    <div>
      <h3 className='page-title'>관리자 페이지</h3>
      <div className='row-container'>
        <div className='row-item manage-btn-ctn'>
          <button onClick={() => setCurrentPage('users')}>유저 관리하기</button>
        </div>
        <div className='row-item manage-btn-ctn'>
          <button onClick={() => {setCurrentPage('timecard-edit')}}>타임카드 수정하기</button>
        </div>
      </div>
      <div className='row-container'>
        <div className='row-item manage-btn-ctn'>
          <button onClick={() => setCurrentPage('report')}>리포트 보기</button>
        </div>
      </div>
    </div>
  )
}

export default ManagerPage;