import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import {NextUIProvider} from '@nextui-org/react'


import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </StrictMode>,
)
