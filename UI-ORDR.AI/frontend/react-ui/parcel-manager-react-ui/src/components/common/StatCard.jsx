function StatCard({ label, value, helper, icon }) {
  return (
    <section className="rounded-2xl border border-surface-container-highest bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant/60">{label}</p>
          <p className="mt-2 font-headline text-3xl font-black text-on-surface">{value}</p>
          {helper ? <p className="mt-1 text-sm text-on-surface-variant">{helper}</p> : null}
        </div>
        {icon ? <div className="rounded-full bg-primary-container p-3 text-primary">{icon}</div> : null}
      </div>
    </section>
  );
}

export default StatCard;
