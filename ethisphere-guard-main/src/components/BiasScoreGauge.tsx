import { useEffect, useState } from "react";

interface BiasScoreGaugeProps {
  score: number;
  size?: number;
}

export const BiasScoreGauge = ({ score, size = 200 }: BiasScoreGaugeProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (animatedScore / 100) * circumference;
  
  // Color based on score (lower is better)
  const getColor = (score: number) => {
    if (score < 30) return "hsl(var(--chart-yellow))";
    if (score < 60) return "hsl(var(--chart-orange))";
    return "hsl(var(--destructive))";
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r="70"
            stroke="hsl(var(--muted))"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r="70"
            stroke={getColor(animatedScore)}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${getColor(animatedScore)})`,
            }}
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold gradient-text">
            {Math.round(animatedScore)}
          </span>
          <span className="text-sm text-muted-foreground mt-1">Bias Score</span>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {animatedScore < 30 && "Low bias detected"}
          {animatedScore >= 30 && animatedScore < 60 && "Moderate bias detected"}
          {animatedScore >= 60 && "High bias detected"}
        </p>
      </div>
    </div>
  );
};
