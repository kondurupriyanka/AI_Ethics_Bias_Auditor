import { useEffect, useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

interface EthicsRadarProps {
  data: {
    fairness: number;
    transparency: number;
    privacy: number;
    accountability: number;
    safety: number;
  };
}

export const EthicsRadar = ({ data }: EthicsRadarProps) => {
  const [animatedData, setAnimatedData] = useState([
    { subject: 'Fairness', value: 0, fullMark: 100 },
    { subject: 'Transparency', value: 0, fullMark: 100 },
    { subject: 'Privacy', value: 0, fullMark: 100 },
    { subject: 'Accountability', value: 0, fullMark: 100 },
    { subject: 'Safety', value: 0, fullMark: 100 },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData([
        { subject: 'Fairness', value: data.fairness, fullMark: 100 },
        { subject: 'Transparency', value: data.transparency, fullMark: 100 },
        { subject: 'Privacy', value: data.privacy, fullMark: 100 },
        { subject: 'Accountability', value: data.accountability, fullMark: 100 },
        { subject: 'Safety', value: data.safety, fullMark: 100 },
      ]);
    }, 100);
    return () => clearTimeout(timer);
  }, [data]);

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={animatedData}>
          <PolarGrid 
            stroke="hsl(var(--border))" 
            strokeWidth={1}
          />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
          />
          <Radar
            name="Ethics Score"
            dataKey="value"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.6}
            strokeWidth={2}
            animationDuration={1000}
            animationEasing="ease-out"
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
