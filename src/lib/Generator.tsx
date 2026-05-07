import { ResourceData } from "../types";
// IMPORTANTE: Importamos esta utilidad nativa de React para convertir iconos a texto HTML
import { renderToStaticMarkup } from "react-dom/server"; 

// Importamos todos los iconos Outline que necesitamos (Heroicons)
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineInformationCircle,
  HiOutlineExternalLink,
  HiOutlineChevronRight,
  HiOutlineMail,
  HiOutlineClock,
  HiOutlineAcademicCap,
  HiOutlinePlay,
  HiOutlineDocumentText,
  HiOutlineLink,
  HiOutlineCheck,
  HiOutlineTable,
  HiOutlineLightBulb,
  HiOutlineBadgeCheck,
  HiOutlineFolderOpen,
  HiOutlineArrowRight,
  HiOutlineChatAlt2
} from "react-icons/hi";

export const generarHTML = (data: ResourceData): string => {
  switch (data.type) {
    case "card":
      const cardColors = {
        success: {
          bg: "#e6f4ea",
          border: "#00B050",
          text: "#0d652d",
          icon: renderToStaticMarkup(<HiOutlineCheckCircle size="28" color="#00B050" />),
        },
        danger: {
          bg: "#fdecea",
          border: "#E94C47",
          text: "#b3261e",
          icon: renderToStaticMarkup(<HiOutlineExclamationCircle size="28" color="#E94C47" />),
        },
        info: {
          bg: "#e8f0fe",
          border: "#1a84e8",
          text: "#174ea6",
          icon: renderToStaticMarkup(<HiOutlineInformationCircle size="28" color="#1a84e8" />),
        },
      };
      const config = cardColors[data.color || "info"];
      return `<div style="background-color: ${config.bg}; border-left: 6px solid ${config.border}; padding: 20px; border-radius: 12px; margin: 15px 0; font-family: sans-serif; display: flex; align-items: center; gap: 15px;">
  <div style="display: flex; align-items: center;">${config.icon}</div>
  <div>
    <h4 style="color: ${config.text}; margin: 0 0 5px 0; font-weight: bold; font-size: 18px;">${data.title || "¡Atención!"}</h4>
    <p style="color: #2E3138; margin: 0; line-height: 1.5;">${data.content || "Escribe aquí tu mensaje..."}</p>
  </div>
</div>`;

    case "button":
      const btnIcon = renderToStaticMarkup(<HiOutlineExternalLink size="18" style={{ marginRight: "8px" }} />);
      return `<div style="text-align: center; margin: 25px 0;">
  <a href="${data.buttonUrl || "#"}" target="_blank" style="display: inline-flex; align-items: center; justify-content: center; background-color: ${data.buttonColor || "#E94C47"}; color: white; padding: 14px 28px; text-decoration: none; border-radius: 30px; font-weight: bold; font-family: sans-serif; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    ${btnIcon} ${data.buttonText || "Hacer clic aquí"}
  </a>
</div>`;

    case "accordion":
      const chevronIcon = renderToStaticMarkup(<HiOutlineChevronRight size="18" color="#E94C47" style={{ marginRight: "10px" }} />);
      return `<details style="border: 1px solid #CCC9E7; border-radius: 12px; margin: 15px 0; font-family: sans-serif; background-color: white; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
  <summary style="padding: 18px; cursor: pointer; font-weight: bold; color: #2E3138; background-color: #F8F9FA; outline: none; border-bottom: 1px solid #CCC9E7; list-style: none;">
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <span style="display: flex; align-items: center;">${chevronIcon} ${data.accordionTitle || "Título del Acordeón"}</span>
      <span style="font-size: 18px; color: #6C757D; font-weight: normal;">+</span>
    </div>
  </summary>
  <div style="padding: 20px; color: #2E3138; line-height: 1.6; background-color: white;">
    ${data.accordionContent || "Contenido que se muestra al desplegar..."}
  </div>
</details>`;

    case "profile":
      const mailIcon = renderToStaticMarkup(<HiOutlineMail size="16" color="#E94C47" style={{ marginRight: "6px" }} />);
      const clockIcon = renderToStaticMarkup(<HiOutlineClock size="16" color="#E94C47" style={{ marginRight: "6px" }} />);
      return `<div style="display: flex; align-items: center; gap: 20px; padding: 25px; border: 1px solid #CCC9E7; border-radius: 12px; background-color: white; font-family: sans-serif; margin: 15px 0; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
  <img src="${data.profilePhoto || "https://api.dicebear.com/7.x/avataaars/svg?seed=Docente"}" alt="Docente" style="width: 85px; height: 85px; border-radius: 50%; object-fit: cover; border: 3px solid #E94C47; background-color: #F8F9FA;">
  <div>
    <h4 style="margin: 0; color: #2E3138; font-size: 20px; font-weight: bold;">${data.profileName || "Nombre del Docente"}</h4>
    <p style="margin: 5px 0; color: #E94C47; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Responsable del Curso</p>
    <p style="margin: 3px 0; color: #6C757D; font-size: 14px; display: flex; align-items: center;">${mailIcon} ${data.profileEmail || "correo@ejemplo.com"}</p>
    <p style="margin: 3px 0; color: #6C757D; font-size: 14px; display: flex; align-items: center;">${clockIcon} <b>Horario:</b>&nbsp;${data.profileSchedule || "Lunes a Viernes"}</p>
  </div>
</div>`;

    case "banner":
      const gradIcon = renderToStaticMarkup(<HiOutlineAcademicCap size="48" color="#E94C47" style={{ marginBottom: "15px", opacity: 0.9 }} />);
      return `<div style="background: linear-gradient(135deg, #2E3138 0%, #4a4e59 100%); color: white; padding: 45px 30px; border-radius: 12px; text-align: center; font-family: sans-serif; margin: 25px 0; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  ${gradIcon}
  <h2 style="margin: 0; font-size: 30px; font-weight: 800; letter-spacing: -0.5px;">${data.bannerTitle || "Título del Banner"}</h2>
  <div style="width: 60px; height: 5px; background-color: #E94C47; margin: 18px auto; border-radius: 2px;"></div>
  <p style="margin: 0; font-size: 18px; opacity: 0.9; font-weight: 300;">${data.bannerSubtitle || "Subtítulo o descripción del módulo"}</p>
</div>`;

    case "bibliography":
      const tagColor = data.biblioObligatory === "obligatorio" ? "#E94C47" : "#00B050";
      
      let bibIconComp = <HiOutlineLink size="32" color={tagColor} />;
      if (data.biblioType === "video") bibIconComp = <HiOutlinePlay size="32" color={tagColor} />;
      if (data.biblioType === "pdf") bibIconComp = <HiOutlineDocumentText size="32" color={tagColor} />;
      
      const bibIconHtml = renderToStaticMarkup(bibIconComp);

      return `<div style="padding: 18px; border: 1px solid #E4E5EA; border-left: 5px solid ${tagColor}; border-radius: 8px; font-family: sans-serif; display: flex; align-items: flex-start; gap: 15px; margin: 12px 0; background-color: #F8F9FA;">
  <div style="display: flex; align-items: center; margin-top: 2px;">${bibIconHtml}</div>
  <div style="flex-grow: 1;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
      <h5 style="margin: 0; color: #2E3138; font-size: 16px; font-weight: bold;">${data.biblioTitle || "Título del recurso bibliográfico"}</h5>
      <span style="background-color: ${tagColor}; color: white; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: bold; text-transform: uppercase;">
        ${data.biblioObligatory || "obligatorio"}
      </span>
    </div>
    <p style="margin: 0; color: #6C757D; font-size: 14px; line-height: 1.4;">${data.biblioDesc || "Descripción corta del contenido del recurso..."}</p>
  </div>
</div>`;

    case "timeline":
      const checkIconHtml = renderToStaticMarkup(<HiOutlineCheck size="12" color="#E94C47" />);
      const steps = data.timelineSteps?.map((step, idx) => `
        <div style="position: relative; padding-left: 35px; margin-bottom: 25px;">
          <div style="position: absolute; left: -11px; top: 0; width: 20px; height: 20px; background-color: white; border: 3px solid #E94C47; border-radius: 50%; z-index: 2; box-shadow: 0 2px 4px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center;">
            ${checkIconHtml}
          </div>
          <h6 style="margin: 0 0 6px 0; color: #2E3138; font-weight: bold; font-size: 16px;">${step.title || `Paso ${idx + 1}`}</h6>
          <p style="margin: 0; color: #6C757D; font-size: 14px; line-height: 1.5;">${step.content || "Descripción del paso a seguir."}</p>
        </div>
      `).join("") || "";
      return `<div style="border-left: 3px solid #CCC9E7; margin: 25px 20px; padding-left: 5px; font-family: sans-serif; position: relative;">
  ${steps}
</div>`;

    case "quote":
      const quoteIconHtml = renderToStaticMarkup(<HiOutlineChatAlt2 size="48" color="#CCC9E7" style={{ position: "absolute", top: "10px", left: "15px", opacity: 0.4 }} />);
      return `<div style="padding: 30px; margin: 20px 0; background-color: #F8F9FA; border-left: 8px solid #E94C47; border-radius: 12px; font-family: sans-serif; position: relative; overflow: hidden;">
  ${quoteIconHtml}
  <p style="color: #2E3138; font-style: italic; font-size: 18px; line-height: 1.6; margin-bottom: 15px; position: relative; z-index: 1;">
    "${data.quoteText || "Escribe aquí la cita que quieres destacar en tu curso."}"
  </p>
  <div style="text-align: right; color: #6C757D; font-weight: bold;">
    &mdash; ${data.quoteAuthor || "Autor de la cita"}
  </div>
</div>`;

    case "table":
      const tbIconHtml = renderToStaticMarkup(<HiOutlineTable size="18" color="white" style={{ marginRight: "8px" }} />);
      const tableRows = data.tableRows?.map((row, idx) => `
        <tr style="background-color: ${idx % 2 === 0 ? "white" : "#F8F9FA"};">
          <td style="padding: 12px 15px; border: 1px solid #CCC9E7; color: #2E3138;">${row.col1}</td>
          <td style="padding: 12px 15px; border: 1px solid #CCC9E7; color: #2E3138;">${row.col2}</td>
        </tr>
      `).join("") || "";
      return `<div style="overflow-x: auto; margin: 20px 0;">
  <table style="width: 100%; border-collapse: collapse; font-family: sans-serif; border: 1px solid #CCC9E7; border-radius: 8px; overflow: hidden;">
    <thead>
      <tr style="background-color: #E94C47; color: white; text-align: left;">
        <th style="padding: 15px; border: 1px solid #CCC9E7; font-weight: bold; width: 40%; display: flex; align-items: center;">
          ${tbIconHtml} ${data.tableTitle1 || "Concepto"}
        </th>
        <th style="padding: 15px; border: 1px solid #CCC9E7; font-weight: bold;">${data.tableTitle2 || "Descripción"}</th>
      </tr>
    </thead>
    <tbody>
      ${tableRows}
    </tbody>
  </table>
</div>`;

    case "curiosity":
      const bulbIconHtml = renderToStaticMarkup(<HiOutlineLightBulb size="36" color="#FFD966" />);
      return `<div style="background-color: #FFF9E6; border: 2px dashed #FFD966; border-radius: 12px; padding: 20px; margin: 20px 0; display: flex; align-items: flex-start; gap: 15px; font-family: sans-serif;">
  <div style="flex-shrink: 0;">${bulbIconHtml}</div>
  <div>
    <h5 style="margin: 0 0 8px 0; color: #856404; font-weight: bold; font-size: 17px;">${data.curiosityTitle || "¿Sabías que...?"}</h5>
    <p style="margin: 0; color: #2E3138; font-size: 14px; line-height: 1.6;">${data.curiosityText || "Aquí puedes añadir datos curiosos o lecturas complementarias de interés."}</p>
  </div>
</div>`;

    case "badge":
      const badgeIconHtml = renderToStaticMarkup(<HiOutlineBadgeCheck size="45" color="white" />);
      return `<div style="text-align: center; margin: 30px 0; padding: 40px; border: 2px solid #E4E5EA; border-radius: 24px; background-color: white; font-family: sans-serif; box-shadow: 0 5px 15px rgba(0,0,0,0.05); position: relative;">
  <div style="width: 80px; height: 80px; background-color: #00B050; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 4px 10px rgba(0, 176, 80, 0.3);">
    ${badgeIconHtml}
  </div>
  <h4 style="margin: 0; color: #00B050; font-weight: 800; font-size: 24px; text-transform: uppercase; letter-spacing: 1px;">${data.badgeMessage || "¡Módulo Completado!"}</h4>
  <p style="margin: 10px 0 0 0; color: #6C757D; font-size: 15px;">¡Impresionante trabajo! Has alcanzado un nuevo hito.</p>
</div>`;

    case "grid":
      const folderIconHtml = renderToStaticMarkup(<HiOutlineFolderOpen size="36" color="#E94C47" style={{ marginBottom: "15px" }} />);
      const arrowIconHtml = renderToStaticMarkup(<HiOutlineArrowRight size="14" style={{ marginLeft: "6px" }} />);
      
      const gridItems = data.gridModules?.map((mod) => `
        <div style="flex: 1; min-width: 180px; padding: 25px; background-color: white; border: 1px solid #CCC9E7; border-radius: 12px; text-align: center; box-shadow: 0 2px 5px rgba(0,0,0,0.04);">
          ${folderIconHtml}
          <h6 style="margin: 0 0 12px 0; color: #2E3138; font-weight: bold; font-size: 16px;">${mod.title}</h6>
          <a href="${mod.url}" target="_blank" style="display: inline-flex; align-items: center; justify-content: center; background-color: #E94C47; color: white; text-decoration: none; font-weight: bold; font-size: 12px; padding: 8px 16px; border-radius: 20px;">
            Acceder ${arrowIconHtml}
          </a>
        </div>
      `).join("") || "";
      return `<div style="display: flex; gap: 20px; flex-wrap: wrap; margin: 25px 0; font-family: sans-serif;">
  ${gridItems}
</div>`;

    default:
      return "";
  }
};