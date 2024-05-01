import React, {useState} from 'react';
import axios from 'axios';
import AddPromo from './AddPromo.jsx';

const PromoEntry = ({promo,loadPromos}) => {
  console.log(promo);

  const [isActive, setIsActive] = useState(promo.active);
  const [edit, setEdit] = useState(false);

  const handleChange = () => {
    axios.put(`/api/activatePromo/?id=${promo.id}&active=${isActive}`)
    .then(({data}) => setIsActive(data));
  }

  const handleDelete = () => {
    axios.delete(`/api/promo/?id=${promo.id}`)
    .then(({data}) => {
      console.log(data);
      loadPromos();
    });
  }

  return (
    <div>
      {promo.kor_title}
      <input type='checkbox' checked={isActive} onChange={handleChange}/>
      <button onClick={handleDelete}>삭제</button>
      <button onClick={() => setEdit(true)}>수정하기</button>
      {edit && <AddPromo closeModal={() => setEdit(false)} promo={promo} loadPromos={loadPromos}/>}
    </div>
  )
}

export default PromoEntry;