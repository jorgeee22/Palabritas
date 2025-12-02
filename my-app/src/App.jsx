/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
 */


import "./styles/global.css";


import Login from "./pages/Login";
import GameClassic from "./pages/GameClassic"; 
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import GameThematic from "./pages/GameThematic";
import MainMenu from "./pages/MainMenu";
import TematicoHub from "./components/TematicoHub";
import Achievements from "./pages/Achievements";
import GameHistory from "./pages/GameHistory";
import HistoriaHub from "./pages/HistoryHub";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  
 return (
    <Router>
      <Routes>
        <Route path="/" element={<GameClassic />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/GameThematic" element={<TematicoHub />} />
        <Route path="/GameThematic/:tema" element={<GameThematic />} />
         <Route path="/MainMenu" element={<MainMenu/>} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/historia" element={<HistoriaHub/>} />
           <Route path="/historia/:id" element={<GameHistory/>} />
  
      </Routes>
    </Router>
  );
}


export default App
