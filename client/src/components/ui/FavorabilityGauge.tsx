// Compact half-circle speedometer showing current favourability (0–100).
// Three arc zones correspond to the classical five-level ahkam framework:
//   Red   (0–33)  → avoid / makruh
//   Amber (34–66) → neutral / proceed with awareness
//   Green (67–100)→ favourable / optimal

interface FavorabilityGaugeProps {
  score: number; // 0–100
  size?: "sm" | "md";
}

// Arc helpers — all angles measured from the LEFT end of a 180° sweep
function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 180) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const s = polarToCartesian(cx, cy, r, startDeg);
  const e = polarToCartesian(cx, cy, r, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
}

export function FavorabilityGauge({ score, size = "sm" }: FavorabilityGaugeProps) {
  const clamped = Math.max(0, Math.min(100, score));

  // SVG viewport — half circle sitting on its flat edge
  const W = size === "sm" ? 52 : 68;
  const H = size === "sm" ? 30 : 40;
  const cx = W / 2;
  const cy = H - 2; // pivot sits just above the bottom edge
  const r = size === "sm" ? 22 : 30;
  const stroke = size === "sm" ? 5 : 6;

  // Needle angle: 0° = fully left (score 0), 180° = fully right (score 100)
  const needleAngle = (clamped / 100) * 180; // degrees within the 180° sweep
  const needleLen = r - stroke / 2 - 2;
  const tip = polarToCartesian(cx, cy, needleLen, needleAngle);

  // Zone arc paths
  const redPath   = arcPath(cx, cy, r, 0,   60);  // 0–33
  const amberPath = arcPath(cx, cy, r, 60,  120); // 34–66
  const greenPath = arcPath(cx, cy, r, 120, 180); // 67–100

  // Needle colour follows the zone
  const needleColor = clamped === 0
    ? "#6b7280"                          // grey — hard interdiction
    : clamped <= 33
      ? "#ef4444"                        // red
      : clamped <= 66
        ? "#f59e0b"                      // amber
        : "#22c55e";                     // green

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      aria-label={`Favourability: ${clamped} out of 100`}
      role="img"
    >
      {/* Background track */}
      <path
        d={arcPath(cx, cy, r, 0, 180)}
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.1}
        strokeWidth={stroke}
        strokeLinecap="round"
      />
      {/* Red zone */}
      <path d={redPath}   fill="none" stroke="#ef4444" strokeWidth={stroke} strokeLinecap="butt" opacity={0.55} />
      {/* Amber zone */}
      <path d={amberPath} fill="none" stroke="#f59e0b" strokeWidth={stroke} strokeLinecap="butt" opacity={0.55} />
      {/* Green zone */}
      <path d={greenPath} fill="none" stroke="#22c55e" strokeWidth={stroke} strokeLinecap="butt" opacity={0.55} />

      {/* Needle */}
      <line
        x1={cx}
        y1={cy}
        x2={tip.x}
        y2={tip.y}
        stroke={needleColor}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* Pivot dot */}
      <circle cx={cx} cy={cy} r={2} fill={needleColor} />
    </svg>
  );
}
