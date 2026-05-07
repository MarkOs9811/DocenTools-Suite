export type ResourceType =
  | "card"
  | "button"
  | "accordion"
  | "profile"
  | "banner"
  | "bibliography"
  | "timeline"
  | "quote"
  | "table"
  | "curiosity"
  | "badge"
  | "grid";

export type AlertColor = "success" | "danger" | "info";
export type BiblioType = "video" | "pdf" | "link";
export type ObligatoryType = "obligatorio" | "complementario";

export interface TimelineStep {
  id: string;
  title: string;
  content: string;
}

export interface TableRow {
  id: string;
  col1: string;
  col2: string;
}

export interface GridModule {
  id: string;
  title: string;
  url: string;
}

export interface ResourceData {
  type: ResourceType;
  // Common
  title?: string;
  content?: string;
  url?: string;
  // Card
  color?: AlertColor;
  // Button
  buttonText?: string;
  buttonUrl?: string;
  buttonColor?: string;
  // Accordion
  accordionTitle?: string;
  accordionContent?: string;
  // Profile
  profilePhoto?: string;
  profileName?: string;
  profileEmail?: string;
  profileSchedule?: string;
  // Banner
  bannerTitle?: string;
  bannerSubtitle?: string;
  // Bibliography
  biblioType?: BiblioType;
  biblioObligatory?: ObligatoryType;
  biblioTitle?: string;
  biblioDesc?: string;
  // Timeline
  timelineSteps?: TimelineStep[];
  // Quote
  quoteText?: string;
  quoteAuthor?: string;
  // Table
  tableTitle1?: string;
  tableTitle2?: string;
  tableRows?: TableRow[];
  // Curiosity
  curiosityTitle?: string;
  curiosityText?: string;
  // Badge
  badgeMessage?: string;
  // Grid
  gridModules?: GridModule[];
}
