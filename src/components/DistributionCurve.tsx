import React from 'react';
import { DistributionPlotData } from '../types/stats';
import { roundTo } from '../utils/statCalculations';

interface Props {
  data: DistributionPlotData;
  width?: number;
  height?: number;
  interactive?: boolean;
}

export const DistributionCurve: React.FC<Props> = ({
  data,
  width = 640,
  height = 240,
}) => {
  const { distribution, criticalValues, calculatedStatistic, tailed, isRejected } = data;

  // Coordinate math
  const paddingX = 45;
  const paddingBottom = 40;
  const paddingTop = 25;
  const plotW = width - paddingX * 2;
  const plotH = height - paddingTop - paddingBottom;

  // Determine x domain based on distribution
  let minX = -4;
  let maxX = 4;
  if (distribution === 'f_distribution') {
    minX = 0;
    maxX = Math.max(7, (criticalValues[0] || 4) + 2.5, calculatedStatistic + 1.5);
  } else if (distribution === 'chi_square') {
    minX = 0;
    const df = data.df1 || 4;
    maxX = Math.max(df * 3, (criticalValues[0] || 10) + 4, calculatedStatistic + 3);
  } else {
    // Normal or Student's t
    const extreme = Math.max(4, Math.abs(calculatedStatistic) + 0.8, Math.abs(criticalValues[0] || 2) + 1);
    minX = -extreme;
    maxX = extreme;
  }

  // Density functions
  const pdfNormal = (x: number) => {
    return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
  };

  const pdfStudentT = (x: number, df: number = 10) => {
    // simplified scaled approximation for visual accuracy
    const factor = 1 / Math.sqrt(Math.PI * df);
    return factor * Math.pow(1 + (x * x) / df, -(df + 1) / 2) * 2.3;
  };

  const pdfF = (x: number, df1: number = 3, df2: number = 12) => {
    if (x <= 0) return 0;
    const d1 = df1;
    const d2 = df2;
    const num = Math.pow(d1 * x, d1 / 2) * Math.pow(d2, d2 / 2);
    const den = Math.pow(d1 * x + d2, (d1 + d2) / 2);
    return (num / den) * 0.7; // normalized visual height
  };

  const pdfChiSquare = (x: number, df: number = 4) => {
    if (x <= 0) return 0;
    const k = df;
    return (Math.pow(x, k / 2 - 1) * Math.exp(-x / 2)) * 0.4;
  };

  const getPDF = (x: number) => {
    if (distribution === 'student_t') return pdfStudentT(x, data.df1 || 10);
    if (distribution === 'f_distribution') return pdfF(x, data.df1 || 2, data.df2 || 12);
    if (distribution === 'chi_square') return pdfChiSquare(x, data.df1 || 4);
    return pdfNormal(x);
  };

  // Sample points
  const numSteps = 160;
  const points: { x: number; y: number }[] = [];
  let maxY = 0.001;

  for (let i = 0; i <= numSteps; i++) {
    const xVal = minX + (i / numSteps) * (maxX - minX);
    const yVal = Math.max(0, getPDF(xVal));
    if (yVal > maxY) maxY = yVal;
    points.push({ x: xVal, y: yVal });
  }

  // Map to SVG coordinates
  const scaleX = (x: number) => paddingX + ((x - minX) / (maxX - minX)) * plotW;
  const scaleY = (y: number) => paddingTop + plotH - (y / maxY) * (plotH * 0.9);

  // SVG path for overall curve
  const curvePath = points
    .map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${scaleX(pt.x).toFixed(1)} ${scaleY(pt.y).toFixed(1)}`)
    .join(' ');

  // Base line
  const baseY = paddingTop + plotH;

  // Rejection & Acceptance regions shading
  const renderShadedRegions = () => {
    if (distribution === 'f_distribution' || distribution === 'chi_square' || tailed === 'right_tailed') {
      const crit = criticalValues[criticalValues.length - 1];
      const critPoints = points.filter(p => p.x >= crit);
      if (critPoints.length === 0) return null;
      const pathD = `M ${scaleX(crit).toFixed(1)} ${baseY} ` +
        `L ${scaleX(crit).toFixed(1)} ${scaleY(getPDF(crit)).toFixed(1)} ` +
        critPoints.map(p => `L ${scaleX(p.x).toFixed(1)} ${scaleY(p.y).toFixed(1)}`).join(' ') +
        ` L ${scaleX(maxX).toFixed(1)} ${baseY} Z`;
      return <path d={pathD} className="fill-rose-500/30 stroke-rose-400/50" />;
    }

    if (tailed === 'two_tailed' && criticalValues.length >= 2) {
      const leftCrit = criticalValues[0];
      const rightCrit = criticalValues[1];

      const leftPoints = points.filter(p => p.x <= leftCrit);
      const rightPoints = points.filter(p => p.x >= rightCrit);
      const centerPoints = points.filter(p => p.x >= leftCrit && p.x <= rightCrit);

      const leftPath = leftPoints.length > 0
        ? `M ${scaleX(minX).toFixed(1)} ${baseY} ` +
          leftPoints.map(p => `L ${scaleX(p.x).toFixed(1)} ${scaleY(p.y).toFixed(1)}`).join(' ') +
          ` L ${scaleX(leftCrit).toFixed(1)} ${scaleY(getPDF(leftCrit)).toFixed(1)} ` +
          `L ${scaleX(leftCrit).toFixed(1)} ${baseY} Z`
        : '';

      const rightPath = rightPoints.length > 0
        ? `M ${scaleX(rightCrit).toFixed(1)} ${baseY} ` +
          `L ${scaleX(rightCrit).toFixed(1)} ${scaleY(getPDF(rightCrit)).toFixed(1)} ` +
          rightPoints.map(p => `L ${scaleX(p.x).toFixed(1)} ${scaleY(p.y).toFixed(1)}`).join(' ') +
          ` L ${scaleX(maxX).toFixed(1)} ${baseY} Z`
        : '';

      const centerPath = centerPoints.length > 0
        ? `M ${scaleX(leftCrit).toFixed(1)} ${baseY} ` +
          `L ${scaleX(leftCrit).toFixed(1)} ${scaleY(getPDF(leftCrit)).toFixed(1)} ` +
          centerPoints.map(p => `L ${scaleX(p.x).toFixed(1)} ${scaleY(p.y).toFixed(1)}`).join(' ') +
          ` L ${scaleX(rightCrit).toFixed(1)} ${scaleY(getPDF(rightCrit)).toFixed(1)} ` +
          `L ${scaleX(rightCrit).toFixed(1)} ${baseY} Z`
        : '';

      return (
        <>
          {centerPath && <path d={centerPath} className="fill-emerald-500/10 stroke-emerald-500/20" />}
          {leftPath && <path d={leftPath} className="fill-rose-500/35 stroke-rose-400/50" />}
          {rightPath && <path d={rightPath} className="fill-rose-500/35 stroke-rose-400/50" />}
        </>
      );
    }

    if (tailed === 'left_tailed' && criticalValues.length >= 1) {
      const leftCrit = criticalValues[0];
      const leftPoints = points.filter(p => p.x <= leftCrit);
      const leftPath = `M ${scaleX(minX).toFixed(1)} ${baseY} ` +
        leftPoints.map(p => `L ${scaleX(p.x).toFixed(1)} ${scaleY(p.y).toFixed(1)}`).join(' ') +
        ` L ${scaleX(leftCrit).toFixed(1)} ${scaleY(getPDF(leftCrit)).toFixed(1)} ` +
        `L ${scaleX(leftCrit).toFixed(1)} ${baseY} Z`;
      return <path d={leftPath} className="fill-rose-500/35 stroke-rose-400/50" />;
    }

    return null;
  };

  // Stat position
  const clampedStat = Math.max(minX, Math.min(maxX, calculatedStatistic));
  const statX = scaleX(clampedStat);
  const statY = scaleY(getPDF(clampedStat));

  return (
    <div className="w-full bg-slate-900/90 rounded-xl border border-slate-800 p-4 flex flex-col items-center">
      <div className="w-full flex items-center justify-between text-xs mb-2">
        <div className="flex items-center gap-2 text-slate-400 font-medium">
          <span className="capitalize">{distribution.replace('_', ' ')} Curve</span>
          <span className="text-slate-600">·</span>
          <span>α = {data.alpha}</span>
          {data.df1 && (
            <>
              <span className="text-slate-600">·</span>
              <span>df₁ = {data.df1}</span>
            </>
          )}
          {data.df2 && (
            <>
              <span className="text-slate-600">·</span>
              <span>df₂ = {data.df2}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="w-2.5 h-2.5 rounded-sm bg-rose-500/40 border border-rose-500 inline-block" />
            <span className="text-slate-300">Rejection Zone (α)</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500/30 border border-indigo-400 inline-block" />
            <span className="text-slate-300">Acceptance Zone</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="w-full overflow-x-auto flex justify-center">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full max-w-[680px] h-auto select-none"
        >
          {/* Grid lines and base axis */}
          <line
            x1={paddingX}
            y1={baseY}
            x2={width - paddingX}
            y2={baseY}
            stroke="#475569"
            strokeWidth="1.5"
          />

          {/* Shaded Rejection Regions */}
          {renderShadedRegions()}

          {/* Main Distribution Bell Curve */}
          <path
            d={curvePath}
            fill="none"
            stroke="#818cf8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* In-Canvas Explanatory Zone Banners (Two-Tailed) */}
          {tailed === 'two_tailed' && criticalValues.length >= 2 && (
            <g className="select-none pointer-events-none">
              {/* Safe Center Zone Badge */}
              <rect
                x={scaleX(0) - 80}
                y={baseY - 72}
                width="160"
                height="32"
                rx="6"
                className="fill-emerald-950/80 stroke-emerald-500/40"
                strokeWidth="1"
              />
              <text
                x={scaleX(0)}
                y={baseY - 56}
                textAnchor="middle"
                className="fill-emerald-300 font-bold text-[10px] tracking-wide"
              >
                SAFE ACCEPTANCE ZONE (95%)
              </text>
              <text
                x={scaleX(0)}
                y={baseY - 44}
                textAnchor="middle"
                className="fill-emerald-400/80 text-[8px] font-sans"
              >
                Fail to Reject H₀ · Normal Luck Margin
              </text>

              {/* Right Rejection Tail Label */}
              <text
                x={scaleX(Math.min(maxX - 0.7, criticalValues[1] + 0.85))}
                y={baseY - 48}
                textAnchor="middle"
                className="fill-rose-400 font-black text-[9px]"
              >
                REJECTION
              </text>
              <text
                x={scaleX(Math.min(maxX - 0.7, criticalValues[1] + 0.85))}
                y={baseY - 36}
                textAnchor="middle"
                className="fill-rose-300/80 text-[8px]"
              >
                Reject H₀ (2.5%)
              </text>

              {/* Left Rejection Tail Label */}
              <text
                x={scaleX(Math.max(minX + 0.7, criticalValues[0] - 0.85))}
                y={baseY - 48}
                textAnchor="middle"
                className="fill-rose-400 font-black text-[9px]"
              >
                REJECTION
              </text>
              <text
                x={scaleX(Math.max(minX + 0.7, criticalValues[0] - 0.85))}
                y={baseY - 36}
                textAnchor="middle"
                className="fill-rose-300/80 text-[8px]"
              >
                Reject H₀ (2.5%)
              </text>
            </g>
          )}

          {/* Critical Value Threshold Markers */}
          {criticalValues.map((crit, idx) => {
            const cx = scaleX(crit);
            const cy = scaleY(getPDF(crit));
            return (
              <g key={idx}>
                <line
                  x1={cx}
                  y1={baseY}
                  x2={cx}
                  y2={cy}
                  stroke="#fb7185"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                <circle cx={cx} cy={baseY} r={3.5} fill="#fb7185" />
                <rect
                  x={cx - 28}
                  y={baseY + 4}
                  width="56"
                  height="26"
                  rx="4"
                  className="fill-rose-950/90 stroke-rose-500/50"
                  strokeWidth="1"
                />
                <text
                  x={cx}
                  y={baseY + 16}
                  textAnchor="middle"
                  className="fill-rose-300 text-[10px] font-mono font-bold"
                >
                  {crit > 0 ? `+${crit}` : crit}
                </text>
                <text
                  x={cx}
                  y={baseY + 26}
                  textAnchor="middle"
                  className="fill-rose-400 text-[8px] uppercase tracking-wider font-semibold"
                >
                  Cutoff
                </text>
              </g>
            );
          })}

          {/* Prominent Calculated Statistic 'YOU ARE HERE' Pin */}
          <g>
            {/* Vertical needle */}
            <line
              x1={statX}
              y1={baseY}
              x2={statX}
              y2={Math.min(statY, baseY - 24)}
              stroke={isRejected ? '#f43f5e' : '#34d399'}
              strokeWidth="3"
            />
            {/* Center target circle */}
            <circle
              cx={statX}
              cy={Math.min(statY, baseY - 24)}
              r={6}
              fill={isRejected ? '#f43f5e' : '#34d399'}
              stroke="#0f172a"
              strokeWidth="2"
            />

            {/* Floating 'YOU ARE HERE' Callout Badge */}
            {(() => {
              const badgeW = 120;
              const badgeH = 34;
              const badgeX = Math.max(paddingX + 2, Math.min(width - paddingX - badgeW - 2, statX - badgeW / 2));
              const badgeY = Math.max(8, statY - 48);

              return (
                <g>
                  <rect
                    x={badgeX}
                    y={badgeY}
                    width={badgeW}
                    height={badgeH}
                    rx="6"
                    className={
                      isRejected
                        ? 'fill-rose-950 stroke-rose-400 shadow-lg'
                        : 'fill-slate-950 stroke-emerald-400 shadow-lg'
                    }
                    strokeWidth="1.5"
                  />
                  <text
                    x={badgeX + badgeW / 2}
                    y={badgeY + 14}
                    textAnchor="middle"
                    className={`text-[10px] font-mono font-black ${
                      isRejected ? 'fill-rose-200' : 'fill-emerald-300'
                    }`}
                  >
                    📍 Z = {calculatedStatistic}
                  </text>
                  <text
                    x={badgeX + badgeW / 2}
                    y={badgeY + 26}
                    textAnchor="middle"
                    className={`text-[8px] font-sans font-bold tracking-wide ${
                      isRejected ? 'fill-rose-400' : 'fill-emerald-400'
                    }`}
                  >
                    {isRejected ? '✗ IN REJECTION ZONE' : '✓ IN SAFE ZONE'}
                  </text>
                </g>
              );
            })()}
          </g>

          {/* Center 0 label if normal or t */}
          {(distribution === 'normal' || distribution === 'student_t') && (
            <g>
              <line
                x1={scaleX(0)}
                y1={baseY}
                x2={scaleX(0)}
                y2={scaleY(getPDF(0))}
                stroke="#475569"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <text
                x={scaleX(0)}
                y={baseY + 16}
                textAnchor="middle"
                className="fill-slate-400 text-[10px] font-mono font-semibold"
              >
                0 (Mean)
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Decision Summary bar */}
      <div className="w-full mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Statistical Decision:</span>
          <span
            className={`font-semibold px-2 py-0.5 rounded text-xs ${
              isRejected
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            }`}
          >
            {isRejected ? 'Reject Null Hypothesis H₀' : 'Fail to Reject Null Hypothesis H₀'}
          </span>
        </div>
        <div className="text-slate-400 font-mono text-[11px]">
          Stat: {calculatedStatistic} | Crit: {criticalValues.join(', ')}
        </div>
      </div>
    </div>
  );
};
