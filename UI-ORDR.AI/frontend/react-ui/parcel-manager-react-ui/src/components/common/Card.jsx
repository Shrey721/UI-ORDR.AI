function Card({ children, className = "" }) {
  return <section className={`rounded-2xl border border-surface-container-highest bg-white shadow-sm ${className}`}>{children}</section>;
}

export default Card;
