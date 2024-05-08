import React, {useState, useEffect} from 'react';
import axios from 'axios';

const AddCategory = ({closeModal, loadCategories, cat}) => {

  const [korName, setKorName] = useState('');
  const [engName, setEngName] = useState('');
  const [korDetail, setKorDetail] = useState('');
  const [engDetail, setEngDetail] = useState('');

  useEffect(() => {
    if (cat) {
      setKorName(cat.kor_name);
      setEngName(cat.eng_name);
      setKorDetail(cat.kor_details);
      setEngDetail(cat.eng_details);
    }
  },[])

  const handleSubmit = () => {
    if (korName === '') {
      alert('이름을 입력해주세요.');
    } else if (engName === '') {
      alert('영어이름을 입력해주세요.');
    } else {
      if (!cat) {
        axios.post('/api/category', {
          korName, engName: engName.toLowerCase(), korDetail, engDetail: engDetail.toLowerCase()
        })
        .then(({data}) => {
          closeModal();
          loadCategories();
          alert(data);
          axios.post('/api/record', {
            action: `created a category called ${korName}`,
            creator: localStorage.getItem('name')
          }).
          then(({data}) => console.log(data));
        });
      } else {
        axios.put('/api/category', null, {params: {
          korName, engName: engName.toLowerCase(), korDetail, engDetail: engDetail.toLowerCase(), id: cat.id
        }})
        .then(({data}) => {
          closeModal();
          loadCategories();
          alert(data);
        });
      }
    }
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h4 className='modal-title'>카테고리를 추가하세요.</h4>
        </div>
        <div className='modal-body'>
          <div>
            카테고리 이름 (한글):
            <input value={korName} onChange={e => setKorName(e.target.value)} />
          </div>
          <div>
            카테고리 이름 (영어):
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
        </div>
        <div className='modal-footer'>
          <button onClick={handleSubmit}>{cat ? '수정하기' : '추가하기'}</button>
          <button onClick={closeModal}>취소</button>
        </div>
      </div>
    </div>
  )
}

export default AddCategory;