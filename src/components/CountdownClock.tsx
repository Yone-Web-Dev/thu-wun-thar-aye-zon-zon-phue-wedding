import React, { useState, useEffect } from 'react';
import { getTimeUntilWedding } from '../utils/weddingData';
import { ThemeMode } from '../types/wedding';

interface CountdownClockProps {
  theme: ThemeMode;
  className?: string;
}

export const CountdownClock: React.FC<CountdownClockProps> = ({
  theme,
  className = ''
}) => {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilWedding());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilWedding());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <div className={`text-center space-y-2 select-none ${className}`}>
      <p className="text-[10px] sm:text-xs font-sans tracking-[0.25em] uppercase text-amber-700/80 font-medium">
        Counting Down to Our Vows
      </p>

      <div className="flex items-center justify-center gap-2 sm:gap-3.5">
        {timeUnits.map((unit, idx) => (
          <React.Fragment key={unit.label}>
            <div className="flex flex-col items-center">
              <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-white/90 border border-amber-300/60 shadow-xs flex items-center justify-center">
                <span className="font-serif text-xl sm:text-2xl font-light text-stone-900 tabular-nums">
                  {String(unit.value).padStart(2, '0')}
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-sans tracking-wider uppercase text-stone-500 mt-1">
                {unit.label}
              </span>
            </div>
            {idx < timeUnits.length - 1 && (
              <span className="font-serif text-lg text-amber-500/70 -mt-4">:</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
