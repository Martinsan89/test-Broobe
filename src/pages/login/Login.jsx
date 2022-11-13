import React, {useState, useContext} from 'react'
import { TokenContext } from '../../context/TokenContext'
import {Form, Button} from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import Eye from '../../assets/Eye.svg'
import EyeClose from '../../assets/EyeClose.svg'
import styles from '../login/Login.module.css'
import axios from 'axios'

const Login = () => {
    // Call token context
    const {setToken} = useContext(TokenContext)

    // Email value
    const [email, setEmail] = useState('')
    // Password value 
	const [passwordInput, setPasswordInput] = useState("");

    //Set toggle password eye  
    const [passwordType, setPasswordType] = useState("password");
    // Set password onChange
    const handlePasswordChange =(evnt)=>{
        setPasswordInput(evnt.target.value);
    }
    // Toogle password eye 
    const togglePassword =()=>{
        if(passwordType==="password")
        {
        setPasswordType("text")
        return;
        }
        setPasswordType("password")
    }

    // Set error 
    const [error, setError] = useState(false)

    // Set useNavigate
    const navigate = useNavigate()

    
    // Handle submit form
    const submitForm = async (e) => {
        e.preventDefault();
        await axios.post(' https://challenge.broobe.net/api/v1/login', {
            email: email,
            password: passwordInput
        }).then(resp => {setToken(resp.data.token) & navigate('issueList')})
        .catch(err => setError(true));

         
    }

    return (
        <div>
            <h1>Login</h1>
            {error && <h4 style={{color:'red'}}>Invalid email or password. Don't forget to register if you don't have an account</h4>}
            <div>
            <Form onSubmit={submitForm}>
                <Form.Group className="mb-5" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" onChange={(e)=> {setEmail(e.target.value)}}      placeholder="Enter email" required />
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className={`${styles.passDiv}`}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={handlePasswordChange} type={passwordType} value={passwordInput} placeholder="Enter your password" name="password" className={`${styles.passInput}`} required/>
                    <button type='button' onClick={togglePassword} className={`${styles.passEye}`}>
                        {passwordType === 'password' ? <img src={EyeClose} alt="eye close"/> : <img src={Eye} alt="eye"/>}
                    </button>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>  
            </Form>
            </div>
            <div >
                <h4>Don't have an account?</h4>
                <NavLink to={'register'}>
                    Register
                </NavLink>
            </div>
        </div>
  )
}

export default Login
