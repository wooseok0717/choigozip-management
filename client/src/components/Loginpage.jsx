import React, {useState} from 'react';
import axios from 'axios';
import SignUpPage from './SignUpPage.jsx';

const Loginpage = ({setLoggedIn}) => {

  const [signingUp, setSigningUp] = useState(false);
  const [idInput, setIdInput] = useState('');
  const [pwInput, setPwInput] = useState('');

  const handleLogin = () => {
    if (idInput === '') {
      alert('아이디를 입력해주세요.');
    } else if (pwInput === '') {
      alert('비밀번호를 입력해주세요.');
    } else {
      axios.get(`/api/checkCred`, {
        params: {
          id: idInput.toLowerCase(),
          pw: pwInput
        }
      })
      .then(({data}) => {
        if (typeof data === 'object') {
          localStorage.setItem('id', data.id);
          localStorage.setItem('name', data.name);
          localStorage.setItem('tier', data.tier);
          setLoggedIn(true);
        } else {
          alert(data);
        }
      });
    }
  }

  if (signingUp) {
    return (
      <>
        <SignUpPage setSigningUp={setSigningUp} />
      </>
    )
  }

  return (
    <div className='login-wrapper'>
      <div>페이지를 이용하시려면 로그인 해주세요.</div>
      <div>
        <div>아이디:</div>
        <input value={idInput} onChange={e => setIdInput(e.target.value)} />
        <div>비밀번호:</div>
        <input type='password' value={pwInput} onChange={e => setPwInput(e.target.value)} />
        <div>
          <button onClick={() => handleLogin()}>로그인</button>
        </div>
      </div>
      <div>계정이 없으신가요?</div>
      <button onClick={() => setSigningUp(true)}>회원가입</button>
    </div>
  )
}

export default Loginpage;