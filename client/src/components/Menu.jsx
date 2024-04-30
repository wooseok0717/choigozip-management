import React, { useState, useEffect } from 'react';
import AddCategory from './AddCategory.jsx';
import axios from 'axios';
import CategoryEntry from './CategoryEntry.jsx';

const Menu = () => {

  const [newCategory, setNewCategory] = useState(false);
  const [categories, setCategories] = useState([]);

  const closeModal = () => {
    setNewCategory(false);
  }

  const loadCategories = () => {
    axios.get('/api/categories')
    .then(({data}) => {
      setCategories(data);
    });
  };

  useEffect(() => {
    loadCategories();
  },[])

  return (
    <div>
      <h3 className='page-title'>메뉴수정</h3>
      <button onClick={() => setNewCategory(true)}>카테고리 추가</button>
      {categories.map((cat, ind) => (<CategoryEntry key={ind} cat={cat} ind={ind} categories={categories} loadCategories={loadCategories}/>))}
      {newCategory && (
        <AddCategory closeModal={closeModal} loadCategories={loadCategories}/>
      )}

    </div>
  )
}

export default Menu;