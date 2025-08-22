import React from 'react';

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fff', color: '#333' }}>
      <h1 style={{ fontSize: 48, marginBottom: 16 }}>404 - Page Not Found</h1>
      <p style={{ fontSize: 18 }}>Sorry, the page you are looking for does not exist.</p>
    </main>
  );
}
