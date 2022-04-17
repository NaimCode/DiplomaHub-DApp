import { Route, Routes, Navigate } from "react-router-dom";
import Page404 from "./pages/404";
import Auth from "./pages/auth";
import Home from "./pages/home";
import Inscription from "./pages/inscription";
import Workspace from "./pages/workspaceMember";
import { useSelector } from "react-redux";
import { EnDeveloppementMini } from "./Components/EnDeveloppement";
import Compte from "./pages/workspaceMember/pages/compte";
import MembresPage from "./pages/workspaceMember/pages/membres";
import Parametre from "./pages/workspaceMember/pages/parametre";
function App() {
  const user = useSelector((state) => state.user.data);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/auth"
        element={
          user !== null ? <Navigate replace to={"/workspace"} /> : <Auth />
        }
      />
      <Route path="/inscription" element={<Inscription />} />
      <Route
        path="/workspace"
        element={
          user === null ? <Navigate replace to={"/auth"} /> : <Workspace />
        }
      >
        <Route index element={<Navigate replace to={"etablissement"} />} />
        <Route path="compte" element={<Compte />} />
        <Route path="membres" element={<MembresPage />} />
        <Route path="parametre" element={<Parametre />} />
        <Route path="*" element={<EnDeveloppementMini />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
