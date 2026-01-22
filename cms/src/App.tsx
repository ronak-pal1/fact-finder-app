import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './Layout'
import AuthLayout from './AuthLayout'
import Login from './pages/Login'

function App() {

  return (
    <BrowserRouter>
      <Routes>


        <Route path='/login' element={<Login />} />

        <Route element={<AuthLayout />}>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
