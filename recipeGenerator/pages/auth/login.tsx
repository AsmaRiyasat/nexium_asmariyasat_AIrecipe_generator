'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import React from "react";


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Check your email inbox for the login link!');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login with Email</h2>
      <form onSubmit={handleLogin}>
        <input
          className="border px-3 py-2 w-full mb-4"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 w-full rounded"
        >
          Send Magic Link
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </div>
  );
}
