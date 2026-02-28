'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('WealthSignal UI error boundary caught:', error);
  }, [error]);

  return (
    <main className="mx-auto mt-20 max-w-xl rounded border bg-white p-6 text-center">
      <h2 className="text-xl font-bold">Something went wrong</h2>
      <p className="mt-2 text-sm text-slate-600">The event has been logged. Please retry.</p>
      <button className="mt-4 rounded bg-brand px-4 py-2 text-white" onClick={reset}>Try again</button>
    </main>
  );
}
