import React, {useState} from 'react';
import axios from 'axios';
import AddPromo from './AddPromo.jsx';

const PromoEntry = ({promo,loadPromos}) => {
  console.log(promo);

  const [isActive, setIsActive] = useState(promo.active);
  const [edit, setEdit] = useState(false);

  const handleChange = () => {
    axios.put(`/api/activatePromo/?id=${promo.id}&active=${isActive}`)
    .then(({data}) => {
      setIsActive(data)
      axios.post('/api/record', {
        creator: localStorage.getItem('name'),
        action: `프로모션 ${promo.kor_title}의 상태를 변경했습니다.`,
        type: 'promo'
      })
      .then(({data}) => console.log(data));
    });
  }

  const handleDelete = () => {
    axios.delete(`/api/promo/?id=${promo.id}`)
    .then(({data}) => {
      console.log(data);
      loadPromos();
      axios.post('/api/record', {
        creator: localStorage.getItem('name'),
        action: `프로모션 ${promo.kor_title}을(를) 삭제했습니다.`,
        type: 'promo'
      })
      .then(({data}) => console.log(data));
    });
  }

  return (
    <div className='promo-row promo-data'>
      <div className='promo-col promo-title'>
        {promo.kor_title}
      </div>
      <div className='promo-col promo-active'>
        <input type='checkbox' checked={isActive} onChange={handleChange}/>
      </div>
      <div className='promo-col promo-edit'>
        <button onClick={() => setEdit(true)}>수정하기</button>
      </div>
      <div className='promo-col promo-delete'>
        <button onClick={handleDelete}>삭제</button>
      </div>
      {edit && <AddPromo closeModal={() => setEdit(false)} promo={promo} loadPromos={loadPromos}/>}
    </div>
  )
}

export default PromoEntry;