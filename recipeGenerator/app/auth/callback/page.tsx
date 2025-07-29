'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleSessionRestore = async () => {
      console.log('⏳ Checking session...');

      // Let Supabase handle parsing the hash URL
      const { data: sessionData } = await supabase.auth.getSession();

      if (sessionData.session) {
        console.log('✅ Session restored:', sessionData.session);
        //router.push('/recipe');
        router.push('/dashboard');
      } else {
        console.warn('❌ No session found.');
        router.push('/login');
      }
    };

    // Wait just a bit so Supabase can parse the URL first
    setTimeout(() => {
      handleSessionRestore();
    }, 200); // ⏳ short delay is important

  }, [router]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Restoring session...</h1>
    </div>
  );
}
