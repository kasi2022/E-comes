import React, { useState } from 'react';
import '../component/register.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser(event) {
    event.preventDefault();

    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.user) {
      console.log(data);

      // Storing user ID in local storage
      localStorage.setItem('userId', data.user.id);
      console.log('User ID:', data.user.id);

      // Redirecting to dashboard
      alert('Login successful');
      window.location.href = '/dashboard';
    } else {
      alert('Please check your username and password');
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <div className='cont-form'>
        <form onSubmit={loginUser}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <br />
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
}


export default Login;
