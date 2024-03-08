import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import Login from './Login.jsx';

const App = () => {
  const [currentPage, setCurrentPage] = useState('Home');

  return (
    <>
      <Login />
      <h1>Choigozip Management Application</h1>
      <Navbar setCurrentPage={setCurrentPage}/>
    </>
  );
}

export default App;