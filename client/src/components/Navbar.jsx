import React, {useState} from 'react';

export default function Navbar (setCurrentPage) {

  const [clicked, setClicked] = useState(false);

  return (
    <>
      <div onClick={() => {setClicked(!clicked)}}>Drop down navbar will be here</div>
      {!!clicked && <>
        <div>홈</div>
        <div>매상 보고</div>
        <div>판매 품목 보고</div>
        <div>팁 보고</div>
        <div>타임카드</div>
        <div>장보기</div>
      </>}
    </>
  )
}