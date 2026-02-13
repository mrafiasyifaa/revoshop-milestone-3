import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SubText, SubTitle } from './ui/text'
import AddToCart from './AddToCart'
import {Product} from '@/src/types/product'

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="text-sm border border-revoshop-navy/20 rounded-md bg-white group flex flex-col h-full">
      <Link href={`/product/${product.slug}/${product.id}`} className="relative group overflow-hidden bg-neutral-100">
        {product?.images && product.images.length > 0 && (
          <img 
            src={product.images[0]} 
            alt={product.title || "Product Image"} 
            loading="lazy" 
            width={700} 
            height={700}
            className="w-full h-64 object-fill overflow-hidden transition-transform bg-white hoverEffect group-hover:scale-105"
          />
        )}
      </Link>
      <div className="p-3 flex flex-col gap-2 flex-1">
        {product?.category && (
          <SubText className="text-xs text-gray-500">{product.category.name}</SubText>
        )}
        <SubTitle className="text-sm line-clamp-2">{product?.title}</SubTitle>
        <SubText className="line-clamp-2 text-gray-600">
          {product?.description ? product.description : ""}
        </SubText>
        <div className="mt-auto space-y-2">
          <SubTitle className="text-lg font-bold text-revoshop-navy">
            ${product?.price ? product.price : "0"}
          </SubTitle>
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  )
}

export default ProductCard
