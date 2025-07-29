
'use client';

import './globals.css';
import { AuthProvider } from '@/context/AuthProvider';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';
import { AboutDialog } from "@/components/AboutDialog";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const isLoginOrSignupPage = pathname === '/login' || pathname === '/signup';

  return (
    <html lang="en">
      <body className="relative min-h-screen bg-[url('/chocolate-4455840_1280.jpg')] bg-cover bg-center bg-no-repeat text-white">
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="relative z-10">
          <AuthProvider>
            {/* 🧭 NAVIGATION BAR */}
            <nav className="w-full bg-transparent backdrop-blur-lg px-6 py-4 flex justify-between items-center border-b border-white/20">
              <div className="text-2xl font-bold">
                <Link href="/">Recipe Generator</Link>
              </div>

              <div className="flex items-center gap-4 text-sm sm:text-base">
                <Link href="/recipe" className="hover:underline">Generate Recipes</Link>
                <Link href="/history" className="hover:underline">History</Link>
                <AboutDialog />
                {isLoggedIn && !isLoginOrSignupPage && (
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm transition"
                  >
                    Logout
                  </button>
                )}
              </div>
            </nav>

            {/* MAIN APP CONTENT */}
            <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6 items-center justify-start min-h-screen">
              {children}
            </main>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
