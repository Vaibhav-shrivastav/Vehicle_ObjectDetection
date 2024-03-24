import React from 'react'
import Navbar from './components/Navbar'
import ObjectDetection from './components/ObjectDetection'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <Navbar/>
      <ObjectDetection/>
    </>
  )
}

export default App