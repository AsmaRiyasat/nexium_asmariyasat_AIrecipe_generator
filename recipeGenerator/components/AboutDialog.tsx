"use client";

import { InfoIcon } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function AboutDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <InfoIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>About This App</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
            <strong>About</strong>
          <br />
          <br />
          Welcome to the Recipe Generator AI — your smart kitchen assistant!
          
          This web app uses AI to help you generate delicious recipes in multiple ways:
          <br />
          <br />
          🥕 <strong>By Ingredients</strong>
          <br />
          Just tell the app what ingredients you have — it will create a complete recipe using those items.
          <br />
          <br />
          🍛 <strong>By Recipe Name</strong>
          <br />
          Enter a dish name, and the app will give you a step-by-step recipe to prepare it.
          <br />
          <br />
          ⚖️ <strong>By Quantity</strong>
          <br />
          Need a recipe for a specific number of people or amount? Just mention the quantity, and the app adjusts the recipe accordingly.
          <br />
          <br />
          This app combines the power of AI with smart data handling —
          all designed to save your time and spark your creativity in the kitchen.
        </p>
      </DialogContent>
    </Dialog>
  );
}
