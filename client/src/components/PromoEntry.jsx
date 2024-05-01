import React, {useState} from 'react';
import axios from 'axios';

const PromoEntry = ({promo,loadPromos}) => {

  const [isActive, setIsActive] = useState(promo.active);

  const handleChange = () => {
    axios.put(`/api/promo/?id=${promo.id}&active=${isActive}`)
    .then(({data}) => console.log(data));
  }

  const handleDelete = () => {
    axios.delete(`/api/promo/?id=${promo.id}`)
    .then(({data}) => {
      console.log(data);
      loadPromos();
    });
  }

  console.log(promo);

  return (
    <div>
      {promo.kor_title}
      <input type='checkbox' checked={isActive} onChange={handleChange}/>
      <button onClick={handleDelete}>삭제</button>
    </div>
  )
}

export default PromoEntry;