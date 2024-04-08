import React, { useState } from 'react';
import axios from 'axios';

const AddMenu = ({setAddNewMenu, catId, loadMenuList}) => {

  const [korName, setKorName] = useState('');
  const [engName, setEngName] = useState('');
  const [korDetail, setKorDetail] = useState('');
  const [engDetail, setEngDetail] = useState('');
  const [price, setPrice] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = () => {
    if (korName === '') {
      alert('이름을 입력해주세요.');
    } else if (engName === '') {
      alert('영어이름을 입력해주세요.');
    } else if (price === '') {
      alert('가격을 입력해주세요.');
    } else {
      axios.post('/api/menu', {
        id: catId, korName, engName: engName.toLowerCase(), korDetail, engDetail: engDetail.toLowerCase(), price, url
      })
      .then(({data}) => {
        setAddNewMenu(false);
        loadMenuList();
        console.log(data);
      });
    }
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h4 className='modal-title'>메뉴를 추가하세요.</h4>
        </div>
        <div className='modal-body'>
          <div>
            메뉴 이름 (한글):
            <input value={korName} onChange={e => setKorName(e.target.value)} />
          </div>
          <div>
            메뉴 이름 (영어):
            <input value={engName} onChange={e => setEngName(e.target.value)} />
          </div>
          <div>
            설명 (한글):
            <input placeholder='optional' value={korDetail} onChange={e => setKorDetail(e.target.value)}/>
          </div>
          <div>
            설명 (영어):
            <input placeholder='optional' value={engDetail} onChange={e => setEngDetail(e.target.value)}/>
          </div>
          <div>
            가격:
            <input type='number' value={price} onChange={e => setPrice(e.target.value)} step='0.5'/>
          </div>
          <div>
            사진:
            <input type='file' />
          </div>
        </div>
        <div className='modal-footer'>
          <button onClick={handleSubmit}>추가하기</button>
          <button onClick={() => setAddNewMenu(false)}>취소</button>
        </div>
      </div>
    </div>
  )
}

export default AddMenu;