import React, { useState } from 'react'; // Import React
import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom'
import '../component/register.css';
function Register() { // Renamed the component to Register
	// const history = useHistory()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:8000/api/register', {
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
			console.log(data)
		}
	}

	return (
		<div>
			<div className='register'>
				<h1>User register</h1>
				<div className='cont-form'>
					{/* <h1>Register</h1> */}
					<form onSubmit={registerUser}>
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							type="text"
							placeholder="Name"
						/>
						<br />
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
						<input type="submit" value="Register" /><br/>
						<Link to='/admin'>Admin?</Link><br/>
						<Link to="/login">login</Link><br/>

					</form>
				</div>
			</div>
		</div>
	)
}

export default Register; // Export the Register component
