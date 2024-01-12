import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import ShakeGame from './pages/ShakeGame'
import Home from './pages/Home'
import RepeatGame from './pages/RepeatGame'
import DotGame from './pages/DotGame'
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="/shakegame" element={<ShakeGame />} />
          <Route path="/repeat" element={<RepeatGame />} />
          <Route path="/dotgame" element={<DotGame />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
