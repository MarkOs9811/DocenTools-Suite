import Topbar from "../components/ui/Topbar";
import "../css/AppGeneradorGIFT.css";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const AppMentoria = () => {
  const navigate = useNavigate();

  return (
    <div className="vh-100 d-flex flex-column">
      <Topbar />

      <div className="px-4 py-2 border-bottom bg-white d-flex align-items-center justify-content-between">
        <button
          onClick={() => navigate("/")}
          className="btn btn-link text-dark text-decoration-none d-flex align-items-center gap-1 p-0 fw-bold"
        >
          <HiOutlineChevronLeft /> Volver al Dashboard
        </button>
        <span className="small  text-dark fw-bold p-2 fs-5">Mentor IA</span>
      </div>

      <div className="container-fluid flex-grow-1 overflow-hidden p-0 d-flex flex-column">
        <iframe
          src="https://mentoria.uarm.edu.pe/"
          className="w-100 flex-grow-1 border-0"
          title="Mentoría UARM"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default AppMentoria;
