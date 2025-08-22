"use client";
import React, { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
    setUrl(null);
    setError(null);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setError(null);
    setUrl(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setUrl(data.url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
      <h2>Upload Media File</h2>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.rar,.7z,.json,.xml,.html,.md,.js,.ts,.tsx,.py,.java,.c,.cpp,.h,.hpp,.rb,.go,.php,.sh,.bat,.ps1,.rtf,.odt,.ods,.odp,.pages,.numbers,.key"
          onChange={handleFileChange}
        />
        <button type="submit" disabled={!file || loading} style={{ marginLeft: 8 }}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {url && (
        <div style={{ marginTop: 16 }}>
          <div>Uploaded URL:</div>
          <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
          <div style={{ marginTop: 8 }}>
            {(() => {
              if (url.match(/\.(mp4|webm|ogg)$/i)) {
                return <video src={url} controls style={{ width: '100%' }} />;
              } else if (url.match(/\.(mp3|wav|aac|flac|m4a|ogg)$/i)) {
                return <audio src={url} controls style={{ width: '100%' }} />;
              } else if (url.match(/\.(jpe?g|png|gif|bmp|svg|webp|avif)$/i)) {
                return <img src={url} alt="Uploaded" style={{ width: '100%' }} />;
              } else {
                return <div><a href={url} download style={{ color: '#0070f3' }}>Download file</a></div>;
              }
            })()}
          </div>
        </div>
      )}
      {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
    </div>
  );
}
