import React, {useState} from 'react';

export default function Navbar ({setCurrentPage}) {

  const [clicked, setClicked] = useState(false);

  return (
    <>
      <div onClick={() => {setClicked(!clicked)}}>☰</div>
      {!!clicked && <>
        <div className='nav-bar-entry' onClick={() => setCurrentPage('home')}>홈</div>
        <div className='nav-bar-entry' onClick={() => setCurrentPage('menu')}>메뉴 수정</div>
        <div className='nav-bar-entry' onClick={() => setCurrentPage('promo')}>프로모션</div>
        <div className='nav-bar-entry' onClick={() => setCurrentPage('timecard')}>타임카드</div>
        <div className='nav-bar-entry' onClick={() => setCurrentPage('sales')}>매상 보고</div>
        <div className='nav-bar-entry' onClick={() => setCurrentPage('history')}>유저 기록</div>
        {/* <div className='nav-bar-entry'>판매 품목 보고</div> */}
        {/* <div className='nav-bar-entry'>팁 보고</div> */}
        {/* <div className='nav-bar-entry'>장보기</div> */}
      </>}
    </>
  )
}