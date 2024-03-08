import React, {useState} from 'react';
import {auth, provider} from './googleSignin/config.js';
import {signInWithPopup} from 'firebase/auth';

export default function Login ({getUser}) {

  const [value, setValue] = useState('');
  const handleClick = function () {

    signInWithPopup(auth, provider)
    .then(data => {
      localStorage.setItem('email', data.user.email);
      getUser(data.user.email);
    })
  }

  return (<button onClick={handleClick}> Sign In with google</button>)
}