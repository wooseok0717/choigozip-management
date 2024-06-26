import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ManageUsers = () => {

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    loadUsers();
  },[])

  const loadUsers = () => {
    axios.get('/api/users')
    .then(({data}) => setUserList(data));
  }

  const handleChange = (tier, id, name) => {
    axios.put(`/api/updateTier/?id=${id}&tier=${tier}`)
    .then(({data}) => {
      console.log(data)
      axios.post('/api/record', {
        creator: localStorage.getItem('name'),
        action: `${name}님의 등급을 ${tier}로(으로) 변경했습니다.`,
        type: 'user'
      })
      .then(({data}) => console.log(data))
    });
  }

  return (
    <div className='user-list'>
      {userList.map((user, ind) => (
        <div key={ind} className={ind === 0 ? 'users-row first-row' : 'users-row'}>
          <div className='user-col'>
            {user.user_id}
          </div>
          <div className='user-col'>
            {user.name}
          </div>
          <div className='user-col'>
            {user.tier === 5 ? (<>5</>) : (
            <select onChange={e => handleChange(e.target.value, user.user_id,user.name)}>
              {[0,1,2,3,4].map((tier,ind) => (
                <option key={ind} selected={tier === user.tier} value={tier}>{tier}</option>
              ))}
            </select>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ManageUsers;