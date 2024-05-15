import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTimeStamp from './AddTimeStamp.jsx';

const TimecardEditor = () => {

  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [newTime, setNewTime] = useState(false);
  const [recentActivities, setRecentActivities] = useState([]);

  const loadUserList = () => {
    axios.get('/api/users')
    .then(({data}) => {
      setUserList(data)
    });
  }

  const loadUserTime = () => {
    // work on this later.
    // it is being invoked in then clause inside of handleSubmit function in addTimeStamp.jsx
  }

  const handleChange = (e) => {
    setSelectedUser(e.target.value);
  }

  const covertTime = (time) => {
    const options = {
      weekday: 'long', // Full name of the day of the week
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true // Use 12-hour clock format
    };
    const date = new Date(new Date(time).getTime() + (7 * 60 * 60 * 1000));
    return date.toLocaleString('ko-KR', options);
  };

  useEffect(() => {
    if (userList.length) {
      setSelectedUser(userList[0].user_id);
    }
  },[userList]);

  useEffect(() => {
    if (selectedUser !== '') {
      axios.get(`/api/getRecentActivity/?id=${selectedUser}`)
      .then(({data}) => {
        setRecentActivities(data);
      })
    }
  },[selectedUser])

  useEffect(() => {
    loadUserList();
  },[]);

  return (
    <div>
      <h3 className='page-title'>유저 타임카드 수정하기</h3>
      <div className='btn-ctn'>
        유저:
        {userList.length && (
          <select className='type-selector' onChange={handleChange}>
            {userList.map((user,ind) => (
              <option key={ind} selected={selectedUser === user.name} value={user.user_id}>{user.name}</option>
            ))}
          </select>
        )}
      </div>
      <div className='btn-ctn'>
        <button onClick={() => setNewTime(true)}>시간 추가하기</button>
        {newTime && (<AddTimeStamp user={selectedUser} closeModal={() => setNewTime(false)} loadUserTime={loadUserTime}/>)}
      </div>
      <div>
        {recentActivities.map((row,index) => (
          <div key={index} className={`timestamp clock-row-${row.interaction}`}>
            {covertTime(row.time)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TimecardEditor;