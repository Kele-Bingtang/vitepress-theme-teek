export interface VpContainerProps {
  type?: "info" | "tip" | "warning" | "danger";
  title?: string;
  text?: string;
  textHtml?: string;
}
