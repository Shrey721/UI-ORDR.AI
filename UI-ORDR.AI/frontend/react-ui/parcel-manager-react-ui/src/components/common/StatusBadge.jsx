function StatusBadge({ children, tone = "neutral" }) {
  const tones = {
    neutral: "bg-surface-container-high text-on-surface-variant",
    success: "bg-green-100 text-green-800",
    warning: "bg-orange-100 text-orange-800",
    danger: "bg-red-100 text-red-800",
    primary: "bg-primary-container text-primary"
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${tones[tone] || tones.neutral}`}>
      {children}
    </span>
  );
}

export default StatusBadge;
