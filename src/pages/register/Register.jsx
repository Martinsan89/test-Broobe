import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import axios from 'axios'


const Register = () => {

    // Inputs value
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    // Set error
    const [error, setError] = useState(false)
    // Set confirm 
    const [confirm, setConfirm] = useState(false)

    const submitForm = (e) => {
        e.preventDefault();
        setConfirm(false);
        setError(false)
        name != '' && email !='' && password != '' && password  == confirmPass ?
        axios.post('https://challenge.broobe.net/api/v1/users', {
            id: 3,
            name: name,
            email: email,
            password: password,
            created: new Date()
        }).then(resp=> console.log(resp)) & 
        setConfirm(true) 
        : setError(true) 
    }

  return (
    <div>
        <h1>Register</h1>
        {error && <h4 style={{color:'red'}}>Please check if the form is complete or if the password match with the confirm password</h4>}
        {confirm && <h4 style={{color:'green'}}>User created, now you can login</h4>}
        <Form className='m-5' onSubmit={submitForm}>
            <Form.Group className="mb-5" controlId="formBasicEmail">
                <Form.Label>User name</Form.Label>
                <Form.Control type="text"  onChange={(e)=>{setName(e.target.value)}} placeholder="Enter user name" required />
            </Form.Group>
            <Form.Group className="mb-5" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter email" required/>
            </Form.Group>
            <Form.Group className="mt-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" required/>
            </Form.Group>
            <Form.Group className="mt-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" onChange={(e)=>{setConfirmPass(e.target.value)}} placeholder="Password" required/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>  
        </Form>
        <div>
            <h4>Back to Login</h4>
            <NavLink to={'/'}>Login</NavLink>
        </div>
    </div>
  )
}

export default Register
