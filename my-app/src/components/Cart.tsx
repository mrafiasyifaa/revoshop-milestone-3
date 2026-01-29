import React from 'react'
import Link from 'next/link'
import { ShoppingBag, ShoppingCart } from 'lucide-react'

function Cart() {
  return (
    <Link href={"/cart"} className="group relative">
    <ShoppingCart className="w-5 h-5 hover:text-revoshop-accent-hover hoverEffect"/>
    <span className="absolute -top-1 -right-1 bg-revoshop-navy text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
      0
    </span>
    </Link>
  )
}

export default Cart
