import React, {useState, useContext, useEffect} from 'react'
import { TokenContext } from '../../context/TokenContext'
import axios from 'axios'
import {Form, Button} from 'react-bootstrap'
import { NavLink, useParams, Navigate } from 'react-router-dom'

const updateIssue = () => {
     // Inputs value
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

     const issue = useParams()
 
     const submitForm = (e) => {
     e.preventDefault();
     setError(false);
     setConfirm(false);
     priority ?
     authAxios.patch('https://challenge.broobe.net/api/v1/issues/' + `${issue.id}` ,{
        priority_id: priority
     }).then(resp=> setConfirm(true))
     .catch(err => setError(true)) & 
     setConfirm(true) 
     : setError(true) 
     }

     // Priority options 
  const [priorityOptions, setPriorityOptions] = useState([])
  useEffect(()=>{
      authAxios.get('https://challenge.broobe.net/api/v1/priorities')
      .then(resp => setPriorityOptions(resp.data))
  },[])
  return (
    <div>
        <h3>Update issue</h3>
        {token ? <>
        {confirm && <h4 style={{color:'green'}}>Issue updated</h4>}
        {error && <h4 style={{color:'red'}}>Verify the priority</h4>}
        <Form className='m-5' onSubmit={submitForm}>
        <Form.Group className="mt-3" controlId="formBasicPassword">
                <Form.Label>Priority</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e)=>{setPriority(e.target.value)}}>
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
            <NavLink to='/issueList'>back to issue List</NavLink>
        </div>
        </> : <Navigate to='/'/>}
      
    </div>
  )
}

export default updateIssue
