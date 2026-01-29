import React from 'react'
import { Title } from './ui/text'
import {cn} from '@/lib/utils'
import Image from 'next/image'
import banner from '@/src/images/banner/banner_electronic.webp'

const Banner = () => {
  return (
    <div className="py-16 md:py-0 bg-revoshop-complement/80 rounded-lg px-10 lg:px-24 flex item-center justify-between overflow-hidden h-[250px]">
    <div className="flex items-center space-y-5">
        <Title className="text-white mb-5">Enjoy 50% Off Electronics!<br></br>Use Promo Code: "SAWIT"</Title>
    </div>
    <div className="relative w-64 h-full">
      <Image src={banner} alt="Electronics Banner Promo" className="hidden md:inline-flex object-cover object-top" fill></Image>
    </div>
    </div>
  )
}

export default Banner
