import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import Homepage from './Homepage.jsx';
import Timecard from './Timecard.jsx';
import Loginpage from './Loginpage.jsx';
import Menu from './Menu.jsx';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInAs, setLoggedInAs] = useState('');

  if (!loggedIn) {
    return (
      <>
        <h2>최고집 포털</h2>
        <Loginpage setLoggedIn={setLoggedIn}/>
      </>
    )
  }

  return (
    <>
      <h2>최고집 포털</h2>
      <Navbar setCurrentPage={setCurrentPage}/>
      {currentPage === 'home' && <Homepage />}
      {currentPage === 'timecard' && <Timecard />}
      {currentPage === 'menu' && <Menu />}
    </>
  );
}

export default App;