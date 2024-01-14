import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import DrawingComponent from './pages/Canvas'
import './App.css'
import ShakeGame from './pages/ShakeGame'
import Home from './pages/Home'
import RepeatGame from './pages/RepeatGame'
import DotGame from './pages/DotGame'
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  // const [count, setCount] = useState(0)

  return (
    // <>
    //   <div>
    //     <a href="https://vitejs.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shakegame" element={<ShakeGame />} />
        <Route path="/repeat" element={<RepeatGame />} />
        <Route path="/dotgame" element={<DotGame />} />
        <Route path="/drawing" element={<DrawingComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
