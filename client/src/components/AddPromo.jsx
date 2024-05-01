import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddPromo = ({closeModal, loadPromos, promo}) => {

  const [korTitle, setKorTitle] = useState('');
  const [engTitle, setEngTitle] = useState('');
  const [url, setUrl] = useState('');
  const [korDetail, setKorDetail] = useState('');
  const [engDetail, setEngDetail] = useState('');

  useEffect(() => {
    if (promo) {
      setKorTitle(promo.kor_title);
      setEngTitle(promo.eng_title);
      setUrl(promo.url);
      setKorDetail(promo.kor_details);
      setEngDetail(promo.eng_details);
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
    if (korTitle === '') {
      alert('제목을 입력해주세요.');
    } else if (engTitle === '') {
      alert('영어제목을 입력해주세요.');
    } else if (url === '') {
      alert('사진을 첨부해주세요.');
    } else {
      if (!promo) {
        axios.post('/api/promo', {
          korTitle, engTitle: engTitle.toLowerCase(), url, korDetail, engDetail: engDetail.toLowerCase()
        })
        .then(({data}) => {
          alert(data);
          closeModal();
          loadPromos();
        });
      } else {
        alert('update the code for updating.')
        axios.put('/api/promo',null, {
          params: {
            id: promo.id, korTitle, engTitle: engTitle.toLowerCase(), url, korDetail, engDetail: engDetail.toLowerCase()
          }
        })
        .then(({data}) => {
          alert(data);
          closeModal();
          loadPromos();
        })
      }
    }
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h4 className='modal-title'>프로모션 추가</h4>
        </div>
        <div className='modal-body'>
          <div>
            제목 (한글):
            <input value={korTitle} onChange={e => setKorTitle(e.target.value)} />
          </div>
          <div>
            제목 (영어):
            <input value={engTitle} onChange={e => setEngTitle(e.target.value)} />
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
          <div>
            설명 (한글):
            <input placeholder='optional' value={korDetail} onChange={e => setKorDetail(e.target.value)} />
          </div>
          <div>
            설명 (영어):
            <input placeholder='optional' value={engDetail} onChange={e => setEngDetail(e.target.value)} />
          </div>
        </div>
        <div className='modal-footer'>
          <button onClick={handleSubmit}>{promo ? '수정하기' : '추가하기'}</button>
          <button onClick={() => closeModal()}>취소</button>
        </div>
      </div>
    </div>
  )
}

export default AddPromo;