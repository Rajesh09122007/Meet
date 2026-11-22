'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react';

function ClassroomHome() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [roomName, setRoomName] = useState('');
  const [accessError, setAccessError] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('AccessDenied')) {
      setAccessError(true);
    }
  }, []);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName.trim()) return;
    router.push(`/rooms/${encodeURIComponent(roomName.trim())}`);
  };

  if (status === 'loading') {
    return (
      <main style={{ display: 'grid', placeItems: 'center', height: '100vh', color: 'white' }}>
        <p>Checking MVSR credentials...</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '16px', padding: '20px', textAlign: 'center', color: 'white' }}>
        <h1>MVSR Virtual Classroom</h1>
        <p>Sign in with your official <strong>@mvsrec.edu.in</strong> Google account to join or host classes.</p>
        {accessError && (
          <p style={{ color: '#ff6b6b', background: '#2b1111', padding: '10px 16px', borderRadius: '8px' }}>
            Access Denied: Only @mvsrec.edu.in email accounts are allowed.
          </p>
        )}
        <button
          onClick={() => signIn('google')}
          style={{ padding: '12px 24px', fontSize: '16px', borderRadius: '8px', background: '#2563eb', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Sign in with @mvsrec.edu.in
        </button>
      </main>
    );
  }

  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '16px', padding: '20px', color: 'white' }}>
      <h1>MVSR Virtual Classroom</h1>
      <p>Logged in as: <strong>{session.user?.email}</strong></p>
      <form onSubmit={handleJoin} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Enter Class Code (e.g. CSE-A)"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          required
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #444', background: '#111', color: 'white', minWidth: '240px' }}
        />
        <button
          type="submit"
          style={{ padding: '12px 24px', borderRadius: '8px', background: '#16a34a', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Join / Start Class
        </button>
      </form>
      <button
        onClick={() => signOut()}
        style={{ marginTop: '20px', background: 'transparent', color: '#9ca3af', border: '1px solid #444', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}
      >
        Sign Out
      </button>
    </main>
  );
}

export default function Page() {
  return (
    <SessionProvider>
      <ClassroomHome />
    </SessionProvider>
  );
}
