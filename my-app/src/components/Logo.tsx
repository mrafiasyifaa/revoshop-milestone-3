import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

function Logo({className, spanDesign}:{className?: string, spanDesign?: string}) {
  return (
    <Link href={"/"} className="inline-flex">
        <h2 className={cn(
            "text-2xl  text-black font-black tracking-wider uppercase hover:text-neutral-400 hoverEffect group",
            className
            )}
            >
                Revo<span className={cn("text-revoshop-accent group-hover:text-revoshop-accent-hover hoverEffect", spanDesign)}>Shop</span>
                </h2>

    </Link>
  )
}

export default Logo
