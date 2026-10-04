import React from 'react';
import { FrequencyInterval } from '../utils/statCalculations';

interface HistogramProps {
  intervals: FrequencyInterval[];
  dataMean?: number;
  dataMedian?: number;
  width?: number;
  height?: number;
}

export const HistogramChart: React.FC<HistogramProps> = ({
  intervals,
  dataMean,
  dataMedian,
  width = 600,
  height = 240,
}) => {
  const padLeft = 45;
  const padRight = 30;
  const padBottom = 45;
  const padTop = 25;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const maxFreq = Math.max(...intervals.map(i => i.frequency), 1);
  const barWidth = plotW / intervals.length;

  const scaleY = (f: number) => padTop + plotH - (f / maxFreq) * (plotH * 0.9);

  // Polygon points connecting bin midpoints
  const polygonPoints = intervals.map((interval, i) => {
    const cx = padLeft + i * barWidth + barWidth / 2;
    const cy = scaleY(interval.frequency);
    return `${cx},${cy}`;
  });

  return (
    <div className="w-full bg-slate-900/90 rounded-xl border border-slate-800 p-4">
      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-200">Frequency Histogram & Polygon</span>
          <span className="text-slate-600">·</span>
          <span>{intervals.length} Class Intervals</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs text-indigo-300">
            <span className="w-3 h-2 bg-indigo-600/70 inline-block rounded-xs"></span>
            Frequency
          </span>
          <span className="flex items-center gap-1.5 text-xs text-amber-300">
            <span className="w-3 h-0.5 bg-amber-400 inline-block"></span>
            Freq Polygon
          </span>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
        {/* Y Axis ticks */}
        {[0, Math.ceil(maxFreq / 2), maxFreq].map((tickVal, idx) => {
          const y = scaleY(tickVal);
          return (
            <g key={idx}>
              <line x1={padLeft} y1={y} x2={width - padRight} y2={y} stroke="#334155" strokeDasharray="3 3" />
              <text x={padLeft - 8} y={y + 3} textAnchor="end" className="fill-slate-500 text-[10px] font-mono">
                {tickVal}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {intervals.map((interval, i) => {
          const x = padLeft + i * barWidth;
          const y = scaleY(interval.frequency);
          const h = padTop + plotH - y;
          return (
            <g key={i}>
              <rect
                x={x + 2}
                y={y}
                width={barWidth - 4}
                height={Math.max(0, h)}
                className="fill-indigo-600/60 hover:fill-indigo-500/80 stroke-indigo-400 transition-colors"
                strokeWidth="1"
                rx="2"
              />
              {/* Frequency count above bar */}
              {interval.frequency > 0 && (
                <text
                  x={x + barWidth / 2}
                  y={y - 5}
                  textAnchor="middle"
                  className="fill-indigo-200 text-[10px] font-mono font-medium"
                >
                  {interval.frequency}
                </text>
              )}
              {/* Class label */}
              <text
                x={x + barWidth / 2}
                y={padTop + plotH + 18}
                textAnchor="middle"
                className="fill-slate-400 text-[9px] font-mono"
              >
                {interval.label}
              </text>
            </g>
          );
        })}

        {/* Frequency Polygon line */}
        <polyline
          points={polygonPoints.join(' ')}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {intervals.map((interval, i) => {
          const cx = padLeft + i * barWidth + barWidth / 2;
          const cy = scaleY(interval.frequency);
          return <circle key={i} cx={cx} cy={cy} r={3.5} fill="#f59e0b" stroke="#0f172a" strokeWidth="1" />;
        })}

        {/* X axis base */}
        <line
          x1={padLeft}
          y1={padTop + plotH}
          x2={width - padRight}
          y2={padTop + plotH}
          stroke="#64748b"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};

interface OgiveProps {
  intervals: FrequencyInterval[];
  medianVal?: number;
  width?: number;
  height?: number;
}

export const OgiveChart: React.FC<OgiveProps> = ({
  intervals,
  medianVal,
  width = 600,
  height = 240,
}) => {
  const padLeft = 45;
  const padRight = 35;
  const padBottom = 40;
  const padTop = 25;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const totalN = intervals[intervals.length - 1].cumulativeLess;
  const scaleY = (cum: number) => padTop + plotH - (cum / totalN) * (plotH * 0.9);

  // Less than points: starting at (interval[0].lower, 0) then each upper boundary
  const lessPoints = [
    { x: intervals[0].lower, y: 0 },
    ...intervals.map(it => ({ x: it.upper, y: it.cumulativeLess })),
  ];

  // More than points: starting at (interval[0].lower, totalN) then decreasing
  const morePoints = [
    { x: intervals[0].lower, y: totalN },
    ...intervals.map(it => ({ x: it.upper, y: it.cumulativeMore })),
  ];

  const minX = intervals[0].lower;
  const maxX = intervals[intervals.length - 1].upper;
  const scaleX = (x: number) => padLeft + ((x - minX) / (maxX - minX)) * plotW;

  const lessPath = lessPoints
    .map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${scaleX(pt.x).toFixed(1)} ${scaleY(pt.y).toFixed(1)}`)
    .join(' ');

  const morePath = morePoints
    .map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${scaleX(pt.x).toFixed(1)} ${scaleY(pt.y).toFixed(1)}`)
    .join(' ');

  const nOver2 = totalN / 2;
  const medianY = scaleY(nOver2);
  const medianX = medianVal ? scaleX(medianVal) : padLeft + plotW / 2;

  return (
    <div className="w-full bg-slate-900/90 rounded-xl border border-slate-800 p-4">
      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-200">Cumulative Frequency Ogives</span>
          <span className="text-slate-600">·</span>
          <span>N = {totalN}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs text-emerald-400">
            <span className="w-3 h-0.5 bg-emerald-400 inline-block"></span>
            Less-Than Ogive
          </span>
          <span className="flex items-center gap-1.5 text-xs text-cyan-400">
            <span className="w-3 h-0.5 bg-cyan-400 inline-block"></span>
            More-Than Ogive
          </span>
          <span className="flex items-center gap-1.5 text-xs text-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
            Median (N/2)
          </span>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
        {/* Horizontal grid & N/2 marker */}
        <line
          x1={padLeft}
          y1={medianY}
          x2={width - padRight}
          y2={medianY}
          stroke="#f59e0b"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <text x={padLeft - 6} y={medianY + 3} textAnchor="end" className="fill-amber-400 text-[9px] font-mono">
          N/2={nOver2}
        </text>

        {/* Less-than ogive curve */}
        <path d={lessPath} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
        {lessPoints.map((pt, i) => (
          <circle key={`l-${i}`} cx={scaleX(pt.x)} cy={scaleY(pt.y)} r={3} fill="#10b981" />
        ))}

        {/* More-than ogive curve */}
        <path d={morePath} fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />
        {morePoints.map((pt, i) => (
          <circle key={`m-${i}`} cx={scaleX(pt.x)} cy={scaleY(pt.y)} r={3} fill="#06b6d4" />
        ))}

        {/* Median Intersection marker */}
        <line
          x1={medianX}
          y1={medianY}
          x2={medianX}
          y2={padTop + plotH}
          stroke="#f59e0b"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <circle cx={medianX} cy={medianY} r={5} fill="#f59e0b" stroke="#0f172a" strokeWidth="1.5" />
        <text
          x={medianX}
          y={padTop + plotH + 16}
          textAnchor="middle"
          className="fill-amber-300 text-[10px] font-mono font-bold"
        >
          Median ≈ {medianVal || 'intersec'}
        </text>

        {/* Base axis */}
        <line
          x1={padLeft}
          y1={padTop + plotH}
          x2={width - padRight}
          y2={padTop + plotH}
          stroke="#64748b"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};

interface ScatterRegressionProps {
  x: number[];
  y: number[];
  pearsonR: number;
  b_yx: number;
  intercept: number;
  width?: number;
  height?: number;
}

export const ScatterRegressionChart: React.FC<ScatterRegressionProps> = ({
  x,
  y,
  pearsonR,
  b_yx,
  intercept,
  width = 600,
  height = 240,
}) => {
  const padLeft = 45;
  const padRight = 35;
  const padBottom = 40;
  const padTop = 25;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const minX = Math.min(...x) * 0.9;
  const maxX = Math.max(...x) * 1.1;
  const minY = Math.min(...y) * 0.9;
  const maxY = Math.max(...y) * 1.1;

  const scaleX = (val: number) => padLeft + ((val - minX) / (maxX - minX)) * plotW;
  const scaleY = (val: number) => padTop + plotH - ((val - minY) / (maxY - minY)) * plotH;

  const lineStart = { x: minX, y: b_yx * minX + intercept };
  const lineEnd = { x: maxX, y: b_yx * maxX + intercept };

  return (
    <div className="w-full bg-slate-900/90 rounded-xl border border-slate-800 p-4">
      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-200">Scatter Plot & Linear Regression</span>
          <span className="text-slate-600">·</span>
          <span>Pearson r = <strong className="text-indigo-300 font-mono">{pearsonR}</strong></span>
        </div>
        <div className="text-xs font-mono text-cyan-300">
          Fit: Y = {b_yx}X {intercept >= 0 ? `+ ${intercept}` : `- ${Math.abs(intercept)}`}
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
        {/* Regression trendline */}
        <line
          x1={scaleX(lineStart.x)}
          y1={scaleY(lineStart.y)}
          x2={scaleX(lineEnd.x)}
          y2={scaleY(lineEnd.y)}
          stroke="#06b6d4"
          strokeWidth="2"
        />

        {/* Data points */}
        {x.map((xv, i) => {
          const cx = scaleX(xv);
          const cy = scaleY(y[i]);
          return (
            <g key={i}>
              <circle
                cx={cx}
                cy={cy}
                r={4.5}
                className="fill-indigo-400 hover:fill-indigo-300 stroke-slate-900 transition-transform"
                strokeWidth="1.5"
              />
              <text x={cx + 6} y={cy - 4} className="fill-slate-400 text-[8px] font-mono">
                ({xv}, {y[i]})
              </text>
            </g>
          );
        })}

        {/* Axes */}
        <line x1={padLeft} y1={padTop + plotH} x2={width - padRight} y2={padTop + plotH} stroke="#64748b" strokeWidth="1.5" />
        <line x1={padLeft} y1={padTop} x2={padLeft} y2={padTop + plotH} stroke="#64748b" strokeWidth="1.5" />
        <text x={width - padRight} y={padTop + plotH + 20} textAnchor="end" className="fill-slate-400 text-[9px] font-mono">
          X (Independent Variable)
        </text>
        <text x={padLeft} y={padTop - 8} textAnchor="start" className="fill-slate-400 text-[9px] font-mono">
          Y (Dependent Variable)
        </text>
      </svg>
    </div>
  );
};

interface AnovaGroupBarProps {
  groups: number[][];
  groupLabels: string[];
  width?: number;
  height?: number;
}

export const AnovaGroupBarChart: React.FC<AnovaGroupBarProps> = ({
  groups,
  groupLabels,
  width = 600,
  height = 240,
}) => {
  const padLeft = 45;
  const padRight = 35;
  const padBottom = 40;
  const padTop = 25;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const means = groups.map(g => g.reduce((a, b) => a + b, 0) / g.length);
  const maxMean = Math.max(...means, ...groups.flat()) * 1.15;
  const barWidth = plotW / groups.length;

  const scaleY = (v: number) => padTop + plotH - (v / maxMean) * plotH;

  return (
    <div className="w-full bg-slate-900/90 rounded-xl border border-slate-800 p-4">
      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-200">ANOVA Treatment Means Comparison</span>
          <span className="text-slate-600">·</span>
          <span>Between-Group Variance Visualization</span>
        </div>
        <div className="text-xs text-indigo-300 font-mono">
          k = {groups.length} Treatments
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
        {groups.map((group, idx) => {
          const mean = means[idx];
          const x = padLeft + idx * barWidth;
          const barX = x + barWidth * 0.2;
          const barW = barWidth * 0.6;
          const barY = scaleY(mean);
          const barH = padTop + plotH - barY;

          return (
            <g key={idx}>
              {/* Group Mean Bar */}
              <rect
                x={barX}
                y={barY}
                width={barW}
                height={Math.max(0, barH)}
                className="fill-indigo-600/50 hover:fill-indigo-500/70 stroke-indigo-400 transition-colors"
                strokeWidth="1.5"
                rx="3"
              />

              {/* Data points inside group */}
              {group.map((val, pIdx) => {
                const py = scaleY(val);
                const px = barX + (pIdx + 1) * (barW / (group.length + 1));
                return (
                  <circle
                    key={pIdx}
                    cx={px}
                    cy={py}
                    r={3}
                    fill="#38bdf8"
                    stroke="#0f172a"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Mean Value Label */}
              <text
                x={barX + barW / 2}
                y={barY - 8}
                textAnchor="middle"
                className="fill-indigo-200 text-[11px] font-mono font-bold"
              >
                x̄ = {mean.toFixed(2)}
              </text>

              {/* Label */}
              <text
                x={barX + barW / 2}
                y={padTop + plotH + 18}
                textAnchor="middle"
                className="fill-slate-300 text-[10px] font-medium"
              >
                {groupLabels[idx] || `Group ${idx + 1}`}
              </text>
            </g>
          );
        })}

        {/* Base line */}
        <line
          x1={padLeft}
          y1={padTop + plotH}
          x2={width - padRight}
          y2={padTop + plotH}
          stroke="#64748b"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};
