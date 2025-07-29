'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { v4 as uuidv4 } from 'uuid';

export default function RecipeForm() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    const id = uuidv4();
    setSessionId(id);
  }, []);

  const generateRecipe = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://perfectrecepieapp.app.n8n.cloud/webhook/4d16a609-cfd9-401c-8759-5057205ba57d/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatInput: ingredients, sessionId })
      });

      const data = await res.json();
      const finalResult = data.output || data.text || data.result || data.message || 'No recipe found.';

      setRecipe(finalResult);

      await fetch('/api/saveRecipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredients,
          recipe: finalResult,
          sessionId
        }),
      });

    } catch (err) {
      console.error("❌ Failed to fetch recipe:", err);
      setRecipe("Failed to fetch recipe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center px-4 py-8">
      <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl text-black/90 ring-1 ring-white/10">
        <CardContent className="p-6 space-y-6">
          <Textarea
            placeholder="Enter ingredients (e.g., eggs, onion, tomato)..."
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-black placeholder:text-black/60 rounded-lg w-full"
            rows={4}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <Button
            onClick={generateRecipe}
            disabled={loading}
            className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-black font-semibold transition rounded-lg"
          >
            {loading ? 'Generating...' : 'Generate Recipe'}
          </Button>
          {recipe && (
            <div className="bg-white/10 backdrop-blur-sm text-black rounded-xl p-4 border border-white/20 whitespace-pre-line">
              {recipe}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
