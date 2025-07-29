"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MailIcon, XIcon } from "lucide-react";
import { supabase } from "@/utils/supabaseClient";

export default function MagicLogin() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage("Failed to send magic link");
      console.error(error);
    } else {
      setMessage("Magic link sent! Check your email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-3xl min-h-[320px] bg-white/10 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl">
        <CardContent className="p-10 sm:p-12 text-white">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold">Login</h2>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <XIcon className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="email" className="flex items-center gap-2 text-white text-base">
                Email <MailIcon className="w-5 h-5" />
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                className="mt-2 bg-white/20 border border-white/30 text-white placeholder-white/70"
              />
            </div>

            <Button
              className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-2 text-base"
              onClick={handleLogin}
            >
              Send Magic Link
            </Button>

            {message && (
              <p className="text-sm text-center text-white/90">{message}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
