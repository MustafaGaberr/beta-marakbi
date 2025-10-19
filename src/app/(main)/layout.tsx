import DynamicHero from "@/components/main/DynamicHero";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <DynamicHero />
      {children}
    </div>
  );
}
