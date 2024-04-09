import React, {useState} from 'react';
import axios from 'axios';

const MenuEntry = ({menu, loadMenuList, ind, menuList}) => {

  const [edit, setEdit] = useState(false);

  const handleDelete = () => {
    axios.delete(`/api/menu/?id=${menu.id}`)
    .then(({data}) => {
      alert(data);
      loadMenuList();
    });
  }

  const handleChange = (direction) => {
    let obj;
    if (direction === 1) {
      obj = {
        first: menu.order_id,
        second: menuList[ind - 1].order_id
      }
    } else {
      obj = {
        first: menu.order_id,
        second: menuList[ind + 1].order_id
      }
    } axios.put('/api/changeOrder/menu', null, {
      params: obj
    })
    .then(loadMenuList)
  }

  return (
    <div className='menu-entry'>
      {menu.kor_name}
      {menu.eng_name}
      {menu.price}
      {ind > 0 && (<button onClick={() => handleChange(1)}>↑</button>)}
      {ind < menuList.length - 1 && (<button onClick={() => handleChange(-1)}>↓</button>)}
      <button onClick={handleDelete}>삭제하기</button>
    </div>
  )
}

export default MenuEntry;