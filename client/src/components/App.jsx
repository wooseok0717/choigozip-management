import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import Login from './Login.jsx';
import Homepage from './Homepage.jsx';
import Timecard from './Timecard.jsx';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <>
      <Login />
      <h1>Choigozip Management Application</h1>
      <Navbar setCurrentPage={setCurrentPage}/>
      {currentPage === 'home' && <Homepage />}
      {currentPage === 'timecard' && <Timecard />}
    </>
  );
}

export default App;