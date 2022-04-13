import { Route, Routes, Navigate } from "react-router-dom";
import Page404 from "./pages/404";
import Auth from "./pages/auth";
import Home from "./pages/home";
import Inscription from "./pages/inscription";
import Workspace from "./pages/workspaceMember";
import { useSelector } from "react-redux";
function App() {
  const user_id = useSelector((state) => state.user.id);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/auth"
        element={
          user_id != null ? <Navigate replace to={"/workspace"} /> : <Auth />
        }
      />
      <Route path="/inscription" element={<Inscription />} />
      <Route
        path="/workspace"
        element={
          user_id == null ? <Navigate replace to={"/auth"} /> : <Workspace />
        }
      />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
