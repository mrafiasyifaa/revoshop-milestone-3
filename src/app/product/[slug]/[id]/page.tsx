import React from 'react'
import Container from '@/src/components/Container'
import ImageView from '@/src/components/ImageView'
import AddToCart from '@/src/components/AddToCart'
import { Product } from '@/src/types/product'
import { notFound } from 'next/navigation'

const SingleProductPage = async ({params}:{params: Promise<{slug: string; id: string}>}) => {
    const {id} = await params;

    try{
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
        if(!response.ok){
            notFound();
    }
    
    const product: Product = await response.json();
        
        if(!product|| !product.id){
            notFound();
        }

  return (
    <Container className="flex flex-col md:flex-row gap-10 py-10">
        {product?.images && <ImageView images={product?.images}/>}
        <div className="w-full md:w-1/2 flex flex-col gap-5">
            <div>
                <h2 className="text-2xl font-semibold">{product?.title}</h2>
                <p className="text-sm text-gray-600 tracking-wide">
                    {product?.description}
                </p>
            </div>
            <div>
                <p className="text-lg font-bold text-revoshop-navy">
            ${product?.price ? product.price : "0"}
          </p>
            </div>
            <div>
                <AddToCart product={product} />
            </div>
        </div>
    </Container>
  )
    }catch(error){
        console.error("Error fetching product:", error);
        notFound();
        }
}
export default SingleProductPage