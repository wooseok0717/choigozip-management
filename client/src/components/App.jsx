import React, {useState, useEffect} from 'react';
import Navbar from './Navbar.jsx';
import Homepage from './Homepage.jsx';
import Timecard from './Timecard.jsx';
import Loginpage from './Loginpage.jsx';
import Menu from './Menu.jsx';
import ManageUsers from './ManageUsers.jsx';
import Promotion from './Promotion.jsx';
import Sales from './Sales.jsx';
import UserHistory from './UserHistory.jsx';
import TimecardEditor from './TimecardEditor.jsx';
import axios from 'axios';

const App = () => {
  const [currentPage, setCurrentPage] = useState('timecard-edit');
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('user_id'));
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userTier, setUserTier] = useState(0);

  const handleLogOut = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('name');
    localStorage.removeItem('tier');
    setCurrentPage('home');
    setLoggedIn(false);
  };

  useEffect(() => {
    if (localStorage.getItem('user_id')) {
      axios.get(`/api/getCred/?id=${localStorage.getItem('user_id')}`)
      .then(({data}) => {
        localStorage.setItem('name', data.name);
        localStorage.setItem('tier', data.tier);
        setUserName(data.name);
        setUserTier(data.tier);
      });
    }
  },[]);

  useEffect(() => {
    setUserId(localStorage.getItem('user_id'));
    setUserName(localStorage.getItem('name'));
    setUserTier(localStorage.getItem('tier'));
  },[loggedIn]);

  if (!loggedIn) {
    return (
      <>
        <h2 className='title'>최고집 포털</h2>
        <Loginpage setLoggedIn={setLoggedIn}/>
      </>
    )
  } else if (userTier < 1) {
    return (
      <>
        <h2 className='title'>최고집 포털</h2>
        <h1>유저등급이 너무 낮아 사용 하실수없습니다.</h1>
        <button onClick={() => handleLogOut()}>로그아웃</button>
      </>
    )
  }

  return (
    <>
      <h2 className='title'>최고집 포털</h2>
      <div className='current-user'>
        {userName}님으로 접속 되어있습니다. {userTier}등급입니다. <button onClick={() => handleLogOut()}>로그아웃</button>
        {userTier >= 5 && (<button onClick={() => setCurrentPage('users')}>유저 관리하기</button>)}
      </div>
      <Navbar setCurrentPage={setCurrentPage}/>
      {currentPage === 'home' && <Homepage />}
      {currentPage === 'timecard' && <Timecard setCurrentPage={setCurrentPage}/>}
      {currentPage === 'menu' && <Menu />}
      {currentPage === 'users' && <ManageUsers />}
      {currentPage === 'promo' && <Promotion />}
      {currentPage === 'sales' && <Sales />}
      {currentPage === 'history' && <UserHistory />}
      {currentPage === 'timecard-edit' && <TimecardEditor />}
    </>
  );
}

export default App;