import React, {useState, useEffect} from 'react';
import axios from 'axios';

const SignUpPage = ({setSigningUp}) => {

  const [idInput, setIdInput] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [pwInput, setPwInput] = useState('');
  const [pwConfInput, setPwConfInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    setIsConfirmed(false);
  },[idInput]);

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
      axios.post('/api/signup', {
        id: id.toLowerCase(), pw, name
      })
      .then(() => {
        setSigningUp(false);
        alert('회원가입이 완료되었습니다.')
      });
    }
  }

  const confirmId = (id) => {
    if (id.length < 4) {
      alert('아이디가 너무 짧습니다.')
    } else if (id.length > 10) {
      alert('아이디가 너무 깁니다.');
    // if id already exists
    } else {
      axios.get(`/api/idExist/?id=${id.toLowerCase()}`)
      .then(({data}) => {
        if (data) {
          alert('아이디가 이미 존재합니다.');
        } else {
          setIsConfirmed(true);
          alert('아이디가 사용 가능합니다.');
        }
      });
    }
  }

  return (
    <div className='login-wrapper'>
      <div>회원가입하기</div>
      <div>
        <div>아이디:</div>
        <input
          value={idInput}
          onChange={e => setIdInput(e.target.value)}
        />
        <button onClick={() => confirmId(idInput)}>중복확인</button>
        <div>비밀번호:</div>
        <input
          type='password'
          value={pwInput}
          onChange={e => setPwInput(e.target.value)}
        />
        <div>비밀번호 확인:</div>
        <input
          type='password'
          value={pwConfInput}
          onChange={e => setPwConfInput(e.target.value)}
        />
        <div>이름:</div>
        <input
          value={nameInput}
          onChange={e => setNameInput(e.target.value)}
        />
        <div>
          <button onClick={() => signUp(idInput, pwInput, pwConfInput, nameInput)}>가입하기</button>
          <button onClick={() => setSigningUp(false)}>가입취소</button>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage;
