import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import './styles.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPasword] = useState('');

  const navigate = useNavigate();

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await api.post('admin/login', data);

      localStorage.setItem('email', email);
      localStorage.setItem('acessToken', response.data);

      navigate('/categories');
    } catch (error) {
      alert('Login faild! try again!');
    }
  }

  return (
    <div className='login-container'>
      <section>
        <h1>Login</h1>
        <form onSubmit={login} action="">
          <h2>Acess your Account</h2>
          <input
            type="text"
            placeholder='email'
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder='password'
            onChange={e => setPasword(e.target.value)}
          />
          <button className='button'>Login</button>
        </form>
      </section>

    </div>
  );
}

export { Login };

