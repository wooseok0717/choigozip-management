import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Loginpage = ({setLoggedIn}) => {

  const [signingUp, setSigningUp] = useState(false);
  const [idInput, setIdInput] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [pwInput, setPwInput] = useState('');
  const [pwConfInput, setPwConfInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    setIsConfirmed(false);
  },[idInput]);

  useEffect(() => {
    resetInput();
  },[signingUp]);

  const resetInput = () => {
    setIdInput('');
    setIsConfirmed(false);
    setPwInput('');
    setPwConfInput('');
    setNameInput('');
  };

  const handleLogin = () => {
    if (idInput === '') {
      alert('아이디를 입력해주세요.');
    } else if (pwInput === '') {
      alert('비밀번호를 입력해주세요.');
    } else {
      axios.get(`/api/checkCred`, {
        params: {
          id: idInput,
          pw: pwInput
        }
      })
      .then(({data}) => {
        if (data === true) {
          setLoggedIn(true);
        } else {
          alert(data);
        }
      });
    }
  }

  const signUp = (id, pw, pw_conf, name) => {
    if (!isConfirmed) {
      alert('아이디를 확인해주세요.');
    } if (pw.length < 4) {
      alert('비밀번호가 너무 짧습니다.');
    } else if (pw.length > 10) {
      alert('비밀번호가 너무 깁니다.');
    } else if (pw_conf !== pw) {
      alert('비밀번호가 다릅니다.');
    } else if (name.length < 2) {
      alert('이름이 너무 짧습니다.');
    } else if (name.length > 15) {
      alert('이름이 너무 깁니다.');
    } else {
      alert('회원가입이 성공적으로 완료 되었습니다.');
      axios.post('/api/signup')
    }
  }

  const confirmId = (id) => {
    if (id.length < 4) {
      alert('아이디가 너무 짧습니다.')
    } else if (id.length > 10) {
      alert('아이디가 너무 깁니다.');
    // if id already exists
    } else {
      axios.get(`/api/idExist/?id=${id}`)
      .then(({data}) => console.log(data));
    }
  }

  if (signingUp) {
    return (
      <div className='login-wrapper'>
        <div>회원가입하기</div>
        <div>
          <div>아이디:</div>
          <input value={idInput} onChange={e => setIdInput(e.target.value)} />
          <button onClick={() => confirmId(idInput)}>중복확인</button>
          <div>비밀번호:</div>
          <input type='password' value={pwInput} onChange={e => setPwInput(e.target.value)}/>
          <div>비밀번호 확인:</div>
          <input type='password' value={pwConfInput} onChange={e => setPwConfInput(e.target.value)} />
          <div>이름:</div>
          <input value={nameInput} onChange={e => setNameInput(e.target.value)} />
          <div>
            <button onClick={() => signUp(idInput, pwInput, pwConfInput, nameInput)}>가입하기</button>
            <button onClick={() => setSigningUp(false)}>가입취소</button>
          </div>
        </div>
      </div>
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