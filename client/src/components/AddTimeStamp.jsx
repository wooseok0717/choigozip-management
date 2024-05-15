import React, { useState } from 'react';
import axios from 'axios';

const AddTimeStamp = ({user,closeModal, loadUserTime}) => {

  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [selectedAction, setSelectedAction] = useState('in');

  const handleSubmit = () => {
    axios.post('/api/createTimeStamp', {
      id: user,
      action: selectedAction,
      time: new Date(selectedDateTime).toLocaleString()
    })
    .then(({data}) => {
      alert(data);
      closeModal();
      loadUserTime();
      axios.post('/api/record', {
        creator: localStorage.getItem('name'),
        action: `${user}님의 timecard 기록을 생성했습니다.`,
        type: 'user'
      })
    });
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h4 className='modal-title'>Add Time stamp for {user}.</h4>
        </div>
        <div className='modal-body'>
          <div>
            TIME AND DATE SELECTOR:
            <input type='datetime-local' value={selectedDateTime} onChange={e => setSelectedDateTime(e.target.value)}/>
          </div>
          <div>
            Action:
            <select className='type-selector' onChange={e => setSelectedAction(e.target.value)}>
              <option value='in'>Clock In</option>
              <option value='out'>Clock Out</option>
            </select>
          </div>
        </div>
        <div className='modal-footer'>
          <button onClick={handleSubmit}>Add Timestamp</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default AddTimeStamp;