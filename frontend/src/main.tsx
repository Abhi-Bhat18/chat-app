import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login.tsx'
import { Provider } from 'react-redux'
import { store } from './app/api/store.ts'
import Message from './pages/Message.tsx'
import { ThemeProvider } from '@mui/material'
import theme from './utils/theme.ts'
import MainLayout from './layouts/MainLayout.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <App />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/message',
    element: <Message />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
