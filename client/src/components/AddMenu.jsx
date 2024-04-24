import React, { useState,useEffect } from 'react';
import axios from 'axios';

const AddMenu = ({closeModal, catId, loadMenuList, menu}) => {

  const [korName, setKorName] = useState('');
  const [engName, setEngName] = useState('');
  const [korDetail, setKorDetail] = useState('');
  const [engDetail, setEngDetail] = useState('');
  const [price, setPrice] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (menu) {
      console.log(menu);
      setKorName(menu.kor_name);
      setEngName(menu.eng_name);
      setKorDetail(menu.kor_details);
      setEngDetail(menu.eng_details);
      setPrice(menu.price);
      setUrl(menu.img_url);
    }
  },[]);

  const handleUpload = (e) => {
    const file = e.target.files[0];

    const cloudName = 'dfxarumgq';
    const uploadPreset = 'krundzwn';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
      .then((response) => {
        const imageUrl = response.data.secure_url;

        setUrl(imageUrl);
        console.log(imageUrl);
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  }

  const handleSubmit = () => {
    if (korName === '') {
      alert('이름을 입력해주세요.');
    } else if (engName === '') {
      alert('영어이름을 입력해주세요.');
    } else if (price === '') {
      alert('가격을 입력해주세요.');
    } else {
      if (!menu) {
        axios.post('/api/menu', {
          id: catId, korName, engName: engName.toLowerCase(), korDetail, engDetail: engDetail.toLowerCase(), price, url
        })
        .then(({data}) => {
          closeModal();
          loadMenuList();
          console.log(data);
        });
      } else {
        axios.put('/api/menu',null, {
          params: {
            id: menu.id, korName, engName: engName.toLowerCase(), korDetail, engDetail: engDetail.toLowerCase(), price, url, cat_id: menu.category_id
          }
        })
        .then(({data}) => {
          closeModal();
          loadMenuList();
          console.log(data);
        })
      }
    }
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h4 className='modal-title'>메뉴를 추가하세요.</h4>
        </div>
        <div className='modal-body'>
          <div>
            메뉴 이름 (한글):
            <input value={korName} onChange={e => setKorName(e.target.value)} />
          </div>
          <div>
            메뉴 이름 (영어):
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
          <div>
            가격:
            <input type='number' value={price} onChange={e => setPrice(e.target.value)} step='0.5'/>
          </div>
          <div>
            사진:
            <input type='file' onChange={handleUpload}/>
              {url && (
                <div className='img-container'>
                  <img src={url}/>
                </div>
              )}
          </div>
        </div>
        <div className='modal-footer'>
          <button onClick={handleSubmit}>{menu ? '수정하기' : '추가하기'}</button>
          <button onClick={() => closeModal()}>취소</button>
        </div>
      </div>
    </div>
  )
}

export default AddMenu;