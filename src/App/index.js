import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page404 from "../404";
import Auth from "../auth";

import Home from "../home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
