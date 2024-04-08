import React, { useState,useEffect } from 'react';
import axios from 'axios';
import AddMenu from './AddMenu.jsx';
import MenuEntry from './MenuEntry.jsx';
import AddCategory from './AddCategory.jsx';

const CategoryEntry = ({cat, ind, categories, loadCategories}) => {

  const [addNewMenu, setAddNewMenu] = useState(false);
  const [menuList, setMenuList] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    loadMenuList();
  },[categories]);

  const loadMenuList = () => {
    axios.get(`/api/menuList/?id=${cat.id}`)
    .then(({data}) => {
      setMenuList(data)
    });
  };

  const handleDelete = () => {
    axios.delete(`/api/category/?id=${cat.id}`)
    .then(() => {
      loadCategories();
    });
  }

  const handleChange = (direction) => {
    let obj;
    if (direction === 1) {
      obj = {
        first: cat.order_id,
        second: categories[ind - 1].order_id
      }
    } else {
      obj = {
        first: cat.order_id,
        second: categories[ind + 1].order_id
      }
    }
    axios.put('/api/changeOrder/category', null,  {
      params: obj
    })
    .then(({data}) => loadCategories());
  }

  return (
    <div className='category-entry'>
      {cat.kor_name}
      {cat.eng_name}
      {/* {cat.kor_details && cat.kor_details}
      {cat.eng_details && cat.eng_details} */}
      <button onClick={() => setAddNewMenu(true)}>메뉴 추가하기</button>
      <button onClick={() => setEdit(true)}>수정하기</button>
      {edit && <AddCategory closeModal={() => setEdit(false)}loadCategories={loadCategories} cat={cat}/>}
      {!menuList.length && <button onClick={handleDelete}>삭제</button>}
      {ind > 0 && (<button onClick={() => handleChange(1)}>↑
</button>)}
      {ind < categories.length - 1 && (<button onClick={() => handleChange(-1)}>↓</button>)}
      {addNewMenu && <AddMenu setAddNewMenu={setAddNewMenu} catId={cat.id} loadMenuList={loadMenuList}/>}
      {menuList.map((menu,ind) => (<MenuEntry key={ind} menu={menu}/>))}
    </div>
  )
}

export default CategoryEntry;