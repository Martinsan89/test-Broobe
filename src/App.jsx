import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import CreateIssue from './pages/createIssue/CreateIssue'
import IssueList from './pages/issuesList/IssueList'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import UpdateIssue from './pages/updateIssue/UpdateIssue'
import {TokenProvider} from './context/TokenProvider'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <TokenProvider>
      <BrowserRouter>
        <div className="App">
          <h1>Test React - Broobe</h1>
        </div>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='issueList' element={<IssueList />} />
          <Route path='createIssue' element={<CreateIssue />} />
          <Route path='issue/:id' element={<UpdateIssue />} />
        </Routes>
      </BrowserRouter>
    </TokenProvider>
  )
}

export default App
