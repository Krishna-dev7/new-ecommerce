import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Cart from './pages/Cart'
import Order from './pages/Order'
import Contact from './pages/Contact'
import Login from './components/Login'
import Home from './pages/home.jsx'
import Signup from './components/Signup.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

// const touter = createBrowserRouter({
    
// })

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Navbar/>
    <App/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order" element={<Order />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    <Footer/>
    </BrowserRouter>
)
