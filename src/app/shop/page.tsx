import React from 'react'
import Shop from '@/components/Shop'

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

interface Props{
  searchParams: Promise<{
    category?: string;
    price?: string}>;
}

const ShopPage = async ({searchParams}: Props) => {
  const params = await searchParams;
  
  const response = await fetch('https://api.escuelajs.co/api/v1/categories')
  const categories: Category[] = await response.json()

  return (
    <Shop 
      categories={categories} 
      initialCategory={params.category || null}
      initialPrice={params.price || null}
    />
  )
}

export default ShopPage
