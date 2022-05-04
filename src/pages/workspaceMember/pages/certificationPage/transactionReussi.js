import MyLottie from "../../../../Components/MyLottie";

import * as dataAnimation from "../../../../../public/animations/validated.json";
import { HomeTwoTone, NavigateBefore } from "@mui/icons-material";
import { Alert, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
const TransactionEnvoye = ({ demande }) => {
  const hash = useParams();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center text-center px-2">
      <MyLottie data={dataAnimation} size="w-[20vw]" />
      <div className="max-w-xl">
        <p>
          La transaction a été effectuée. L'étudiant sera notifé par son email.
          Et enfin voici le hash:
        </p>
        <Alert className="my-4">
          <strong>{hash.hash}</strong>
        </Alert>
        <div className="w-full flex justify-center">
          <QRCodeSVG value={hash.hash} />
        </div>
        <hr className="my-4" />
        <Button
          variant="outlined"
          color="primary"
          startIcon={<NavigateBefore />}
          onClick={() => navigate("/workspace/etudiants/3", { replace: true })}
        >
          retour
        </Button>
      </div>
    </div>
  );
};

export default TransactionEnvoye;
