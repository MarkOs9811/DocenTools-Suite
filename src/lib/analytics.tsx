import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID); // 👈 reemplaza con tu ID real
};

export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
