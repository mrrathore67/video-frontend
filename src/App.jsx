import { Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import Upload from './pages/Upload'
import Profile from './pages/Profile'
import VideoPlayer from './pages/VideoPlayer'

function App() {


  return (
    <>
      <Navbar />
      {/* <Router> */}

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/video/:id" element={<VideoPlayer />} />
        </Routes>
      </div>
      {/* </Router> */}
    </>
  )
}

export default App
