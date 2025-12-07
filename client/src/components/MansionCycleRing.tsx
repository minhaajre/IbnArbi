interface MansionCycleRingProps {
  mansionNumber: number;
}

export function MansionCycleRing({ mansionNumber }: MansionCycleRingProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const positions = Array.from({ length: 28 }, (_, i) => i + 1);

  const getPositionStyle = (position: number) => {
    const angle = ((position - 1) / 28) * 360 - 90;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return {
      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
    };
  };

  const isCurrentMansion = (position: number) => position === mansionNumber;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
        Lunar Position
      </div>
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* SVG Circle background */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer ring */}
          <circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-border opacity-30"
          />

          {/* Inner circle for current mansion indicator */}
          <circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary opacity-20"
          />

          {/* Center dot */}
          <circle cx="100" cy="100" r="3" fill="currentColor" className="text-primary" />

          {/* Radial lines for each mansion */}
          {positions.map((position) => {
            const angle = ((position - 1) / 28) * 360 - 90;
            const x1 = 100 + 60 * Math.cos((angle * Math.PI) / 180);
            const y1 = 100 + 60 * Math.sin((angle * Math.PI) / 180);
            const x2 = 100 + 85 * Math.cos((angle * Math.PI) / 180);
            const y2 = 100 + 85 * Math.sin((angle * Math.PI) / 180);
            const isActive = isCurrentMansion(position);

            return (
              <line
                key={`line-${position}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth={isActive ? 2 : 1}
                className={isActive ? "text-primary" : "text-border opacity-20"}
                opacity={isActive ? 1 : 0.5}
              />
            );
          })}

          {/* Current mansion highlight arc */}
          {(() => {
            const startAngle = ((mansionNumber - 1.5) / 28) * 360 - 90;
            const endAngle = ((mansionNumber - 0.5) / 28) * 360 - 90;
            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;

            const x1 = 100 + 75 * Math.cos(startRad);
            const y1 = 100 + 75 * Math.sin(startRad);
            const x2 = 100 + 75 * Math.cos(endRad);
            const y2 = 100 + 75 * Math.sin(endRad);

            const largeArc = 0;
            const sweep = 1;

            return (
              <path
                d={`M ${x1} ${y1} A 75 75 0 ${largeArc} ${sweep} ${x2} ${y2}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary opacity-50"
              />
            );
          })()}
        </svg>

        {/* Number labels positioned around the circle */}
        <div className="absolute inset-0">
          {positions.map((position) => (
            <div
              key={`number-${position}`}
              className="absolute w-5 h-5 flex items-center justify-center text-[9px] font-mono font-semibold"
              style={getPositionStyle(position)}
            >
              <span
                className={`${
                  isCurrentMansion(position)
                    ? "text-primary bg-primary/20 rounded-full w-5 h-5 flex items-center justify-center font-bold"
                    : "text-muted-foreground"
                }`}
              >
                {position}
              </span>
            </div>
          ))}
        </div>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-lg font-bold text-primary">{mansionNumber}</div>
          <div className="text-[10px] text-muted-foreground">/ 28</div>
        </div>
      </div>
    </div>
  );
}
