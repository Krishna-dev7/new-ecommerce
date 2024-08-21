import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Cart from './pages/Cart'
import Order from './pages/Order'
import Contact from './pages/Contact'
import Login from './components/Login'
import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddProduct from './components/AddProduct.jsx'

const router = createBrowserRouter([
  {
    path:  "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path:  "/order",
        element: <Order />
      },
      {
        path:  "/add-product",
        element: <AddProduct />

      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider> 
)