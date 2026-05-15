import Icon from "./Icon.jsx";

function ConfirmDialog({ open, title, description, children, confirmLabel, onCancel, onConfirm, confirmDisabled, isProcessing }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="w-full max-w-xl rounded-3xl bg-surface p-6 shadow-2xl ring-1 ring-black/10">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-on-surface">{title}</h3>
            {description ? <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{description}</p> : null}
          </div>
          <button
            className="rounded-full border border-surface-container-highest bg-surface px-3 py-2 text-on-surface-variant transition hover:bg-surface-container-high"
            type="button"
            onClick={onCancel}
            aria-label="Close dialog"
          >
            <Icon name="close" className="text-base" />
          </button>
        </div>

        <div className="space-y-4">{children}</div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            className="rounded-full border border-surface-container-highest bg-surface px-5 py-3 text-sm font-bold text-on-surface-variant transition hover:bg-surface-container-high"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-bold text-on-primary transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            type="button"
            onClick={onConfirm}
            disabled={confirmDisabled || isProcessing}
          >
            {isProcessing ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-on-primary/20 border-t-on-primary" />
                Shipping...
              </span>
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
