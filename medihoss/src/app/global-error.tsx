import React from 'react';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fff', color: '#b00020' }}>
      <h1 style={{ fontSize: 48, marginBottom: 16 }}>500 - Something went wrong</h1>
      <p style={{ fontSize: 18, marginBottom: 24 }}>{error.message || 'An unexpected error occurred.'}</p>
      <button onClick={reset} style={{ padding: '8px 24px', fontSize: 16, background: '#0070f3', color: '#fff', border: 'none', borderRadius: 4 }}>Try Again</button>
    </main>
  );
}
