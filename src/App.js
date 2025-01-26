import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navtab from "./Components/navbar/Nav";
import Hero from "./Components/hero/Hero";
import Chat from "./Components/chat/Chat";

function App() {
  return (
    <div>
      <Router>
        <Navtab />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="Chat" element={<Chat/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
