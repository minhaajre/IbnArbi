import { useEffect } from "react";

const PLANET_SYMBOLS: Record<string, string> = {
  Sun: "☉",
  Moon: "☾",
  Mars: "♂",
  Mercury: "☿",
  Jupiter: "♃",
  Venus: "♀",
  Saturn: "♄"
};

const PLANET_COLORS: Record<string, string> = {
  Sun: "#f59e0b",
  Moon: "#94a3b8",
  Mars: "#dc2626",
  Mercury: "#10b981",
  Jupiter: "#f97316",
  Venus: "#ec4899",
  Saturn: "#6366f1"
};

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

  const color = PLANET_COLORS[planet] || "#fcd34d";
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

    document.title = `${PLANET_SYMBOLS[planet]} Hour of ${planet} | Al-Falak`;
  }, [planet]);
}
