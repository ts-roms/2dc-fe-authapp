import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import AuthProvider from './context/AuthProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <Suspense fallback={`Loading...`}>
      <App />
      </Suspense>
    </AuthProvider>
  </React.StrictMode>,
)
