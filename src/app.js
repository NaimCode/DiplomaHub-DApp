import { Route, Routes, Navigate, Router } from "react-router-dom";
import Page404 from "./pages/404";
import Auth from "./pages/auth";
import Home from "./pages/home";
import Inscription from "./pages/inscription";
import Workspace from "./pages/workspaceMember";
import { useSelector } from "react-redux";
import EnDeveloppement, {
  EnDeveloppementMini,
} from "./Components/EnDeveloppement";
import Compte from "./pages/workspaceMember/pages/compte";
import MembresPage from "./pages/workspaceMember/pages/membres";
import Parametre from "./pages/workspaceMember/pages/parametre";
import axios from "axios";
import { useEffect } from "react";
import { SERVER_URL } from "./Data/serveur";
import { useDispatch } from "react-redux";
import { update } from "./redux/userSlice";
import Etablissement from "./pages/workspaceMember/pages/etablissement";
import Test from "./pages/test";
import MySnackbar from "./Components/MySnackbar";
import Etudiants from "./pages/workspaceMember/pages/etudiants";
import Certification from "./pages/workspaceMember/pages/etudiants/importation";
import EnAttente from "./pages/workspaceMember/pages/etudiants/enAttente";
import Certifies from "./pages/workspaceMember/pages/etudiants/certifies";
import CertificationPage from "./pages/workspaceMember/pages/certificationPage";
import TransactionEnvoye from "./pages/workspaceMember/pages/certificationPage/transactionReussi";
import Verification from "./pages/verification";
import MonEspace from "./pages/monEspace";
function App() {
  const user = useSelector((state) => state.user.data);
  const isMembre = useSelector((state) => state.user.isMembre);

  return (
    <>
      <MySnackbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/transaction/envoye/:hash"
          element={<TransactionEnvoye />}
        />
        <Route
          path="/auth"
          element={
            user ? (
              <Navigate replace to={isMembre ? "/workspace" : "/monEspace"} />
            ) : (
              <Auth />
            )
          }
        />
        <Route
          path="/monEspace"
          element={
            user === null ? <Navigate replace to={"/auth"} /> : <MonEspace />
          }
        />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/verification" element={<Verification />} />
        <Route
          path="/workspace"
          element={
            user === null ? <Navigate replace to={"/auth"} /> : <Workspace />
          }
        >
          <Route index element={<Navigate replace to={"compte"} />} />
          {<Route path="etablissement" element={<Etablissement />} />}
          <Route path="compte" element={<Compte />} />
          <Route path="certification/:id" element={<CertificationPage />} />
          <Route path="etudiants" element={<Etudiants />}>
            <Route index element={<Navigate replace to={"1"} />} />
            <Route path="1" element={<Certification />} />
            <Route path="2" element={<EnAttente />} />
            <Route path="3" element={<Certifies />} />
          </Route>
          <Route path="membres" element={<MembresPage />} />
          <Route path="parametre" element={<Parametre />} />

          <Route path="*" element={<Navigate to={"compte"} />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
