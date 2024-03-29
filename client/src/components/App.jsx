import React, {useState, useEffect} from 'react';
import Navbar from './Navbar.jsx';
import Homepage from './Homepage.jsx';
import Timecard from './Timecard.jsx';
import Loginpage from './Loginpage.jsx';
import Menu from './Menu.jsx';
import axios from 'axios';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('id'));
  const [loggedInAs, setLoggedInAs] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userTier, setUserTier] = useState('');

  const handleLogOut = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('tier');
    setLoggedIn(false);
  };

  useEffect(() => {
    if (localStorage.getItem('id')) {
      axios.get(`/api/getCred/?id=${localStorage.getItem('id')}`)
      .then(({data}) => {
        localStorage.setItem('name', data.name);
        localStorage.setItem('tier', data.tier);
        setUserName(data.name);
        setUserTier(data.tier);
      });
    }
  },[]);

  useEffect(() => {
    setUserId(localStorage.getItem('id'));
    setUserName(localStorage.getItem('name'));
    setUserTier(localStorage.getItem('tier'));
  },[loggedIn]);

  if (!loggedIn) {
    return (
      <>
        <h2>최고집 포털</h2>
        <Loginpage setLoggedIn={setLoggedIn}/>
      </>
    )
  } else if (userTier === 0) {
    return (
      <>
        <h2>최고집 포털</h2>
        <h1>유저등급이 너무 낮아 사용 하실수없습니다.</h1>
        <button onClick={() => handleLogOut()}>로그아웃</button>
      </>
    )
  }

  return (
    <>
      <h2>최고집 포털</h2>
      <div>
        {userName}님으로 접속 되어있습니다. {userTier}등급입니다. <button onClick={() => handleLogOut()}>로그아웃</button>
      </div>
      <Navbar setCurrentPage={setCurrentPage}/>
      {currentPage === 'home' && <Homepage />}
      {currentPage === 'timecard' && <Timecard />}
      {currentPage === 'menu' && <Menu />}
    </>
  );
}

export default App;