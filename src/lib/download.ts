/**
 * Trigger a browser download for a same-origin file without navigating away.
 */
export function downloadFile(url: string, filename?: string): void {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename ?? url.split("/").pop() ?? "document.pdf";
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}
