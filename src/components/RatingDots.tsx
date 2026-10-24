import React from 'react';
import { HoldLevel, HOLD_LABELS, ShineLevel, SHINE_LABELS } from '../data/products';

interface RatingDotsProps {
  type: 'hold' | 'shine';
  level: HoldLevel | ShineLevel;
  compact?: boolean;
}

export const RatingDots: React.FC<RatingDotsProps> = ({ type, level, compact = false }) => {
  const isHold = type === 'hold';
  const label = isHold ? 'Fixação' : 'Brilho';
  const desc = isHold ? HOLD_LABELS[level as HoldLevel] : SHINE_LABELS[level as ShineLevel];

  if (compact) {
    return (
      <div 
        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#04172B]/80 backdrop-blur-xs border border-white/10 text-xs text-[#F5F8FC]"
        title={`${label}: Nível ${level} de 4 (${desc})`}
      >
        <span className="text-[11px] font-medium text-[#AAB8CA]">{label}</span>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4].map((dot) => (
            <span
              key={dot}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                dot <= level
                  ? isHold
                    ? 'bg-[#42C8FF] shadow-[0_0_6px_#42C8FF]'
                    : 'bg-[#F5F8FC] shadow-[0_0_6px_#F5F8FC]'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-[#04172B]/60 border border-white/5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#AAB8CA]">
          {label}
        </span>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4].map((dot) => (
            <span
              key={dot}
              className={`w-2 h-2 rounded-full transition-all ${
                dot <= level
                  ? isHold
                    ? 'bg-[#42C8FF] shadow-[0_0_8px_#42C8FF]'
                    : 'bg-[#F5F8FC] shadow-[0_0_8px_#F5F8FC]'
                  : 'bg-white/15'
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-xs text-[#F5F8FC] font-medium">
        Nível {level} de 4 — <span className="text-[#42C8FF]">{desc}</span>
      </p>
    </div>
  );
};
