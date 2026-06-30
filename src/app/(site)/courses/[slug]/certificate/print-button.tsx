"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintCertificateButton() {
  return (
    <Button onClick={() => window.print()} className="print:hidden">
      <Printer />
      Download / Print
    </Button>
  );
}
