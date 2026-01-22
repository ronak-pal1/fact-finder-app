import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './Layout'
import AuthLayout from './AuthLayout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
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
