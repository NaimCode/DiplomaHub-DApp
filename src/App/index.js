import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../Auth";
import CreerEcole from "../CreerEcole";
import Home from "../Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/creerEcole" element={<CreerEcole />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
