//app/recipe/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';
import RecipeForm from '@/components/RecipeForm';

export default function RecipePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.push('/login'); // not logged in
      } else {
        setIsAuthenticated(true); // logged in
      }
    };

    checkUser();
  }, [router]);

  if (!isAuthenticated) {
    return null; // you can add a spinner here
  }

  return (
    <div className="min-h-screen text-black p-4">
      <h1 className="text-3xl font-bold text-center text-white mb-6">
        Don&apos;t Know What to Cook? Let AI Decide!!!
      </h1>
      <RecipeForm />
    </div>
  );
}
