"use client";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="py-10 md:py-20 bg-linear-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full space-y-8">
        <div className="relative w-48 h-48 mx-auto">
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Your Cart is Empty!
          </h2>
          <p className="text-gray-600">
            It looks like you haven&apos;t added anything to your cart yet.
            Let&apos;s change that and find some amazing products for you!
          </p>
        </div>

        <div>
          <Link
            href="/"
            className="block bg-revoshop-accent border border-darkColor/20 text-center py-2.5 rounded-full text-sm text-white font-semibold tracking-wide hover:border-darkColor hover:bg-revoshop-accent-hover hover:text-white hoverEffect"
          >
            Discover Our Curated Products!
          </Link>
        </div>
      </div>
    </div>
  );
}