

'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error.message);
      }

      const user = data?.user;

      if (!user) {
        router.push('/login');
      } else {
        setUserEmail(user.email || '');
      }
    };

    getUser();
  }, [router]);

  return (
    <main
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage: 'url("/your-background-image-path.png")', // replace with actual path
      }}
    >
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-extrabold text-white text-center flex items-center justify-center gap-2">
           Dashboard
        </h1>
        <p className="mt-2 text-center text-white">
          Welcome, <span className="font-medium">{userEmail}</span>!
        </p>

        <div className="mt-6 flex flex-col gap-4">
          <Link
            href="/recipe"
            className="w-full bg-gray-800 text-white py-3 rounded-lg text-center font-semibold hover:bg-gray-700 transition"
          >
            🍽️ Generate Recipe
          </Link>
          <Link
            href="/history"
            className="w-full bg-gray-800 text-white py-3 rounded-lg text-center font-semibold hover:bg-gray-700 transition"
          >
            📜 History
          </Link>
        </div>
      </div>
    </main>
  );
}
