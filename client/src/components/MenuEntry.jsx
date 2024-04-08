import React from 'react';

const MenuEntry = ({menu}) => {
  // console.log(menu);
  return (
    <div className='menu-entry'>
      {menu.kor_name}
      {menu.eng_name}
      {menu.price}
    </div>
  )
}

export default MenuEntry;