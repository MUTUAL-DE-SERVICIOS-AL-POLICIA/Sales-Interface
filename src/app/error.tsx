"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center gap-3 p-6 text-center">
      <h2 className="text-lg font-semibold">
        No se pudo completar la operación.
      </h2>
      <p className="text-sm text-muted">
        Intente nuevamente. Si el problema continúa, vuelva más tarde.
      </p>
      <button
        className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
        onClick={reset}
      >
        Volver a intentar
      </button>
    </div>
  );
}
