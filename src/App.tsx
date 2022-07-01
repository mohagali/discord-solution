
import { Routes, Route } from "react-router-dom";

import SignIn from './pages/signin'
import Dashboard from './pages/dashboard'
import CreateUser from './pages/create-user'
import EditUser from './pages/edit-user'

import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/create-user" element={<CreateUser />} />
      <Route path="/edit-user/:id" element={<EditUser />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>

  )
}

export default App
