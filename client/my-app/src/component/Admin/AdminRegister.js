import React, { useState } from 'react';
import '../register.css';
import { Link } from 'react-router-dom';
function AdminRegister() {
    const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:8000/api/adminregister', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		})
		const data = await response.json();
		console.log(data)
		if (data.status === 'ok') {
			// history.push('/login')
		}
	}

	return (
		<div>
			<div className='register'>
				<div className='cont-form'>
					{/* <h1>Register</h1> */}
					<form onSubmit={registerUser}>
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							type="text"
							placeholder="AdminName"
						/>
						<br />
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							placeholder="AdminEmail"
						/>
						<br />
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							placeholder="AdminPassword"
						/>
						<br />
						<input type="submit" value="Register"/><br/>
                        <Link to="/adminlogin">Adminlogin</Link>
					</form>
				</div>
			</div>
		</div>)
}

export default AdminRegister

