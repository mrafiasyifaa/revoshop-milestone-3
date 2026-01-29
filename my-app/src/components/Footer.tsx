import React from 'react'
import Container from './Container'
import Logo from './Logo'
import { SubTitle, SubText } from './ui/text'
import { quickLinks } from '../config/quicklinks'
import Link from 'next/link'
import { Input } from './ui/input'
import { Button } from './ui/button'

const Footer = async () => {
  const response = await fetch('https://api.escuelajs.co/api/v1/categories', {
    next: { revalidate: 3600 }
  })
  const categories = await response.json()

  return (
    <footer className="bg-white border">
      <Container>
      <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
        <Logo />
        <SubText>Discover curated product collections based on your previous purchases and visits, blending affordable price with high quality service only in RevoShop.</SubText>
        </div>
        <div>
        <SubTitle>Quick Links</SubTitle>
        <ul className="space-y-3 mt-4">{quickLinks?.map((item)=>(
          <li key={item?.title} className="text-neutral-800 text-sm font-poppins">
            <Link href={item?.href} className="hover:text-revoshop-accent-hover hoverEffect">
              {item?.title}
            </Link>
          </li>
        ))}</ul>
        </div>
        <div>
        <SubTitle>Categories</SubTitle>
        <ul className="space-y-3 mt-4">{categories?.map((item: any)=>(
          <li key={item?.id} className="text-neutral-800 text-sm font-poppins">
            <Link href={`/category/${item?.slug}`} className="hover:text-revoshop-accent-hover hoverEffect">
              {item?.name}
            </Link>
          </li>
        ))}</ul>
        </div>
        <div className="space-y-4 mt-2">
          <SubTitle>Newsletter</SubTitle>
          <SubText>Subscribe to our newsletter to receive updates on our exclusive offers!</SubText>
          <form>
            <Input placeholder="youremail@example.com" type="email" required></Input>
            <Button className="w-full">Subscribe</Button>
          </form>
        </div>
      </div>
      <div className="py-6 border-t text-center text-sm text-neutral-800">
        <div>
          © {new Date().getFullYear()}{" "}
          <Logo className="text-sm" />. All rights reserved.
        </div>
      </div>
      </Container>
    </footer>
  )
}

export default Footer