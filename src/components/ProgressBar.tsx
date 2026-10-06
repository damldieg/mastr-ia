interface ProgressBarProps {
  value: number;
  label?: string;
  ariaLabel: string;
}

export function ProgressBar({ value, label, ariaLabel }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="progress">
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel}
      >
        <div className="progress-bar__fill" style={{ width: `${String(clamped)}%` }} />
      </div>
      {label !== undefined && <span className="progress__label">{label}</span>}
    </div>
  );
}
