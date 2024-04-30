import React, { useState } from 'react';
import axios from 'axios';
import AddPromo from './AddPromo.jsx';

const Promotion = () => {

  const [addNewPromo, setAddNewPromo] = useState(false);

  const loadPromos = () => {
    alert('loaded all promos');
  }

  return (
    <div>
      <h3 className='page-title'>프로모션</h3>
      <div className='btn-ctn'>
        <button onClick={() => setAddNewPromo(true)}>프로모션 등록하기</button>
      </div>
      {addNewPromo && (<AddPromo closeModal={() => setAddNewPromo(false)} loadPromos={loadPromos}/>)}
    </div>
  )
}

export default Promotion;