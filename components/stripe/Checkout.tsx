// components/CheckoutButton.tsx
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const CheckoutButton = ({ productId, buttonText, className }: { productId: string, buttonText: string, className: string }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ productId }), 
      });

      if (!res.ok) {
        const errorData = await res.text(); 
        console.error("Checkout API Error:", errorData);
        return;
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; 
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
    setLoading(false);
  };

  return (
    <Button 
      onClick={handleCheckout} 
      disabled={loading}
      className={className}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          処理中...
        </>
      ) : (
        buttonText
      )}
    </Button>
  );
};

export default CheckoutButton;