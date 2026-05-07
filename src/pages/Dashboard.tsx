import { useSelector } from "react-redux";
import { RootState } from "../slices/store";
import Topbar from "../components/ui/Topbar";
import CardApp from "../components/ui/CardApp";
import "../css/Dashboard.css";
import {
  HiOutlinePencilAlt,
  HiOutlineUserGroup,
  HiOutlineChatAlt,
  HiOutlineCalculator,
  HiOutlineClipboardList,
  HiOutlineDocumentText,
  HiOutlineViewGridAdd,
} from "react-icons/hi";

const Dashboard = () => {
  const query = useSelector(
    (state: RootState) => state.gift.searchQuery,
  ).toLowerCase();

  const apps = [
    {
      id: "gift",
      title: "Generador de Banco Preguntas",
      description:
        "Crea archivos de preguntas GIFT para importar directamente en bancos de preguntas de Moodle de forma visual.",
      icon: HiOutlinePencilAlt,
      isActive: true,
      route: "/gift",
    },
    {
      id: "tags",
      title: "Recursos Visuales HTML",
      description:
        "Genera bloques interactivos y elementos gráficos al instante para enriquecer tu curso en Moodle.",
      icon: HiOutlineViewGridAdd,
      isActive: true,
      route: "/tags",
    },
    {
      id: "mentor",
      title: "MentorIA",
      description:
        "Genera prompts educativos personalizados según los criterios, objetivos y necesidades que indiques.",
      icon: HiOutlineChatAlt,
      isActive: true,
      route: "/mentorIa",
    },
    {
      id: "calc",
      title: "Calculadora de Notas",
      description:
        "Convierte porcentajes a escalas específicas de calificación según tu normativa universitaria.",
      icon: HiOutlineCalculator,
      isActive: false,
    },
    {
      id: "rubric",
      title: "Armador de Rúbricas",
      description:
        "Diseña rúbricas de evaluación complejas y expórtalas en formatos compatibles con LMS.",
      icon: HiOutlineDocumentText,
      isActive: false,
    },
    {
      id: "checklist",
      title: "Generador de Checklists",
      description:
        "Crea listas de verificación para seguimiento de actividades y tareas de tus estudiantes.",
      icon: HiOutlineClipboardList,
      isActive: false,
    },
  ];

  const filteredApps = apps.filter(
    (app) =>
      app.title.toLowerCase().includes(query) ||
      app.description.toLowerCase().includes(query),
  );

  return (
    <div>
      <Topbar />
      <div className="container">
        <div className="row mt-4">
          <div className="col-12 text-center mb-4">
            <h1 className="fw-bold display-6">Selecciona una herramienta</h1>
            <p className="text-muted">
              Potencia tu docencia en Moodle con micro-utilidades modernas.
            </p>
          </div>
        </div>
        <div className="grid-apps py-0">
          {filteredApps.map((app) => (
            <CardApp
              key={app.id}
              title={app.title}
              description={app.description}
              icon={app.icon}
              isActive={app.isActive}
              route={app.route}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
