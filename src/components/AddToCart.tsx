"use client"
import React from 'react'
import Cart from './Cart'
import {cn} from '@/lib/utils'
import { Button } from './ui/button'
import { Product } from '@/src/types/product'
import useStore from '@/store'
import { toast } from 'sonner'
import QuantityButtons from './QuantityButtons'

interface Props {
    product: Product;
    className?: string;
}

const AddToCart = ({product, className}: Props) => {
  const addItem = useStore((state) => state.addItem);
  const itemCount = useStore((state)=>{
    const item = state.items.find(
      (item)=> item.product.id.toString() === product.id.toString()
    );
    return item ? item.quantity : 0;
  })

    const handleAddToCart = () => {
        addItem(product);
        toast.success(`${product?.title?.substring(0, 12)}... added to cart!`, {
          duration: 1500,
        });
    }
    
  return (
    <div>
      {itemCount ? (
        <div className="text-sm w-full">
          <div>
            <span className="text-xs text-revoshop-accent/80">Quantity</span>
            <QuantityButtons product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Subtotal:</span>
            <span className="text-sm font-bold text-revoshop-navy">
              ${product?.price ? (product.price * itemCount).toFixed(2) : "0.00"}
            </span>
          </div>
        </div>
      ) : (
        <Button 
        onClick={handleAddToCart}
        className={cn("flex items-center justify-center space-x-2 bg-revoshop-accent hover:bg-revoshop-accent-hover text-white px-4 py-2 rounded-md hoverEffect w-full", className)}
      >
        <span>Add to Cart</span>
      </Button>)}
    </div>
  )
}

export default AddToCart
