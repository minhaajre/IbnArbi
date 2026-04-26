import { useEffect } from "react";
import { PLANET_SYMBOLS, PLANET_HEX_COLORS } from "@/lib/constants";

function createFaviconCanvas(planet: string): string {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  if (!ctx) return "";

  ctx.fillStyle = "#1a1a2e";
  ctx.beginPath();
  ctx.arc(32, 32, 32, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#2a2a4e";
  ctx.beginPath();
  ctx.arc(32, 32, 28, 0, Math.PI * 2);
  ctx.fill();

  const color = PLANET_HEX_COLORS[planet] || "#fcd34d";
  ctx.fillStyle = color;
  ctx.font = "bold 36px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(PLANET_SYMBOLS[planet] || "☉", 32, 34);

  return canvas.toDataURL("image/png");
}

export function useDynamicFavicon(planet: string | null) {
  useEffect(() => {
    if (!planet) return;

    const faviconUrl = createFaviconCanvas(planet);

    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");

    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    link.href = faviconUrl;
  }, [planet]);
}
