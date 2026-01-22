import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './Layout'
import AuthLayout from './AuthLayout'
import Login from './pages/Login'
import Courses from './pages/Courses'
import AddCourse from './pages/AddCourse'
import Videos from './pages/Videos'
import Bookings from './pages/Bookings'

function App() {

  return (
    <BrowserRouter>
      <Routes>


        <Route path='/login' element={<Login />} />

        <Route element={<AuthLayout />}>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/courses/add' element={<AddCourse />} />
            <Route path='/videos' element={<Videos />} />
            <Route path='/bookings' element={<Bookings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
