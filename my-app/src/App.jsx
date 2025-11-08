/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
 */

import Login from "./pages/Login";
import GameClassic from "./pages/GameClassic"; 
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import GameThematic from "./pages/GameThematic";


    

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  
 return (
    <Router>
      <Routes>
        <Route path="/" element={<GameClassic />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/gameThematic" element={<GameThematic />} />
      </Routes>
    </Router>
  );
}


export default App
