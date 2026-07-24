import { toPng } from "html-to-image";

export async function exportNodeAsPng(
  node: HTMLElement,
  backgroundColor: string
): Promise<string> {
  return toPng(node, { pixelRatio: 2, backgroundColor, cacheBust: true });
}
