import { exportNodeAsPng } from "@/infrastructure/export/htmlToImageAdapter";

export async function exportarLayout(
  node: HTMLElement,
  filename = `landing-layout-${Date.now()}.png`
): Promise<void> {
  const dataUrl = await exportNodeAsPng(node, "#0A0A0A");
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}
