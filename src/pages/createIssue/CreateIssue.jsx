import React, {useState, useContext, useEffect} from 'react'
import styles from '../createIssue/CreateIssue.module.css'
import axios from 'axios'
import {Form, Button} from 'react-bootstrap'
import {NavLink, Navigate} from 'react-router-dom'
import { TokenContext } from '../../context/TokenContext';


const CreatIssue = () => {
    // Inputs value
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('')
    // Set error
    const [error, setError] = useState(false)
    // Set confirm 
    const [confirm, setConfirm] = useState(false)
    // Authorization headers
    const {token} = useContext(TokenContext)
    const authAxios = axios.create({
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
    
    const submitForm = (e) => {
    e.preventDefault();
    setError(false);
    setConfirm(false);
    name && description && priority ?
    authAxios.post('https://challenge.broobe.net/api/v1/issues',{
        name: name,
        description: description,
        priority_id: priority
    }).then(resp=> console.log(resp)) & 
    setConfirm(true) 
    : setError(true) 
    }

    const [priorityOptions, setPriorityOptions] = useState([])

    useEffect(()=>{
        authAxios.get('https://challenge.broobe.net/api/v1/priorities')
        .then(resp => setPriorityOptions(resp.data))
    },[])

 
  return (
    <div>
        <h1>Create Issue</h1>
        {token ? <>
        {error && <h4 className={`${styles.error}`}>Please check if the form is complete.</h4>}
        {confirm && <h4 className={`${styles.confirm}`}>Issue created</h4>}
        <Form className='m-5' onSubmit={submitForm}>
            <Form.Group className="mb-5" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" onChange={(e)=>{setName(e.target.value)}} required />
            </Form.Group>
            <Form.Group className="mt-3" controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control as='textarea' onChange={(e)=>{setDescription(e.target.value)}} required />
            </Form.Group>
            <Form.Group className="mt-3" controlId="formBasicPassword">
                <Form.Label>Priority</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e)=>{setPriority(e.target.value)}} required>
                    <option >Select priority</option>
                    {priorityOptions.map((i) => (
                        <option key={i.id} value={i.id}>{i.type}</option>
                    ))
                    }
                </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>  
        </Form>
        <div>
            <h4>Back to issue List</h4>
            <NavLink to='/issueList'>Issue List</NavLink>
        </div>
        </>
        : <Navigate to='/'/>
    }
    </div>
  )
}

export default CreatIssue
