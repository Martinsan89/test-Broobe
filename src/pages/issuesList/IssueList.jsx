import React, {useEffect, useContext, useState, useLayoutEffect} from 'react'
import { TokenContext } from '../../context/TokenContext';
import { Navigate, NavLink } from 'react-router-dom'
import axios from 'axios';


const IssueList = () => {
  // Authorization headers with token
  const {token} = useContext(TokenContext)
  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  // issue List
  const [issuesList, setIssuesList] = useState([])
  // Delete issue
  const [deleteDone, setDeleteDone] = useState('') 
  const deleteIssue = (id) => {
    const acceptDelete = prompt('Write "accept" to delete the issue' );
    acceptDelete == 'accept' &&
    authAxios.delete('https://challenge.broobe.net/api/v1/issues/'+`${id}`)
    .then(resp => setDeleteDone(resp.data))
  } 

  
  
  useEffect(()=>{
    authAxios.get('https://challenge.broobe.net/api/v1/issues')
    .then(resp => setIssuesList(resp.data))
  },[deleteDone])
  // Priority options 
  const [priorityOptions, setPriorityOptions] = useState([])
    useLayoutEffect(()=>{
      authAxios.get('https://challenge.broobe.net/api/v1/priorities')
      .then(resp => setPriorityOptions(resp.data))
    },[])


  return (
    <div>
      <div>
        <NavLink to='/'>Log out</NavLink>
      </div>
      <h1>Issue List</h1>
      { token ?
        <div>
          <div style={{margin: '1rem 0 '}}>
            <h4>Create a issue request</h4>
            <NavLink to='/createIssue'>Create issue</NavLink>
          </div>
          <div style={{display:'flex', gap:'1rem'}}>
            {issuesList.length != 0 ? 
              issuesList.map((issue) => (
                <div key={issue.id} style={{border:'white 1px solid', width:'40%'}}>
                  <h4>Name: {issue.name}</h4>
                  <h4>Description: {issue.description}</h4>
                  {priorityOptions.map((priority) => (
                    priority.id == issue.priority_id &&
                    <h4 key={priority.id}>Priority: {priority.type}</h4>
                  ))
                  }
                  
                  <div>
                    <NavLink to={'/issue/' + issue.id}>Update issue</NavLink>
                  </div>
                  <button onClick={()=>{deleteIssue(issue.id)}}>Delete issue</button>
                </div>
              )) :
              <h2 style={{color:'yellow', margin:'auto'}}>Don't have any issue</h2>
            }
          </div>
        </div>
        : <Navigate to='/'/>
      }
    </div>
  )
}

export default IssueList
