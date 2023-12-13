import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login.tsx'
import { Provider } from 'react-redux'
import { store } from './store.ts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path : '/login',
    element : <Login/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>

    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
