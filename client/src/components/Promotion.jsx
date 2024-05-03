import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddPromo from './AddPromo.jsx';
import PromoEntry from './PromoEntry.jsx';

const Promotion = () => {

  const [addNewPromo, setAddNewPromo] = useState(false);
  const [promoList, setPromoList] = useState([]);

  const loadPromos = () => {
    axios.get('/api/promos')
    .then(({data}) => {setPromoList(data)});
  }

  useEffect(() => {
    loadPromos();
  },[]);

  return (
    <div>
      <h3 className='page-title'>프로모션</h3>
      <div className='btn-ctn'>
        <button onClick={() => setAddNewPromo(true)}>프로모션 등록하기</button>
      </div>
      <div className='promotion-container'>
        <div className='promo-row promo-label'>
          <div className='promo-col promo-title'>
            제목
          </div>
          <div className='promo-col promo-active'>
            활성화
          </div>
          <div className='promo-col promo-edit'>
            수정
          </div>
          <div className='promo-col promo-delete'>
            삭제
          </div>
        </div>
        {addNewPromo && (<AddPromo closeModal={() => setAddNewPromo(false)} loadPromos={loadPromos}/>)}
        {promoList.map((promo, ind) => (<PromoEntry key={ind} promo={promo} loadPromos={loadPromos}/>))}
      </div>
    </div>
  )
}

export default Promotion;