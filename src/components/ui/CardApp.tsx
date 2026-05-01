import React from "react";
import "../../css/CardApp.css";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface CardAppProps {
  title: string;
  description: string;
  icon: IconType;
  isActive?: boolean;
  route?: string;
}

const CardApp: React.FC<CardAppProps> = ({
  title,
  description,
  icon: Icon,
  isActive = false,
  route = "#",
}) => {
  const content = (
    <div
      className={`modern-card p-4 h-100 ${!isActive ? "opacity-75" : ""}`}
      style={{ cursor: isActive ? "pointer" : "default" }}
    >
      <Icon className="card-icon" />
      <h3 className="h5 fw-bold mb-2">{title}</h3>
      <p className="text-muted small mb-3">{description}</p>
      {!isActive && (
        <span className="badge-status badge-pending">PRÓXIMAMENTE</span>
      )}
      {isActive && <span className="badge-status badge-success">ACTIVA</span>}
    </div>
  );

  if (isActive) {
    return (
      <Link to={route} style={{ textDecoration: "none", color: "inherit" }}>
        {content}
      </Link>
    );
  }

  return <div>{content}</div>;
};

export default CardApp;
