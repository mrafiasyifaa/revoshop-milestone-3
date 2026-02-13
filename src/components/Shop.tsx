"use client"
import React, { useState, useEffect } from 'react'
import Container from './Container';
import {SubTitle} from './ui/text';
import CategoryList from './shop/CategoryList';
import PriceList from './shop/PriceList';
import NoProduct from './NoProduct';
import ProductCard from './ProductCard';
import { Loader } from 'lucide-react';
import { Product, Category } from '@/src/types/product'
import { Button } from './ui/button';

interface Props{
    categories: Category[];
    initialCategory?: string | null;
    initialPrice?: string | null;
}

const Shop = ({categories, initialCategory, initialPrice}: Props) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory || null);
    const [selectedPrice, setSelectedPrice] = useState<string | null>(initialPrice || null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try{
        let query = `https://api.escuelajs.co/api/v1/products`;
        
        if(selectedCategory){
          const category = categories.find(cat => cat.slug === selectedCategory);
          if(category){
            query = `https://api.escuelajs.co/api/v1/categories/${category.id}/products`;
          }
        }
        
        const response = await fetch(query);

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }

        let data = await response.json();
        
        if(selectedPrice){
          const [min, max] = selectedPrice.split("-").map(Number);
          data = data.filter((product: Product) => product.price >= min && product.price <= max);
        }
        
        setProducts(data);
      }catch(err){
        const errorMessage = err instanceof Error ? err.message : "Failed to load products";
        setError(errorMessage);
        console.error("Error fetching products:", err);
      }finally{
        setLoading(false);
      }
    }

    const handleRetry = () => {
      fetchProduct();
    }

    useEffect(() => {
      fetchProduct();
    }, [selectedCategory, selectedPrice]);
return (
    <div className="border-t">
      <Container className="mt-5">
        <div className="sticky top-0 z-10 mb-5">
            <div className="flex items-center justify-between">
                <SubTitle className="text-lg capitalize tracking-wide font-poppins">Grab your products as you scroll</SubTitle>
                <button 
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedPrice(null);
                  }}
                  className="text-revoshop-accent underline text-sm mt-2 font-medium hover:text-revoshop-accent-hover hoverEffect"
                >
                    Reset Filters
                </button>
            </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 border-t border-t-revoshop-navy/50">
            <div className="md-sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto md:min-w-64 pb-5 border-right border-r-revoshop-navy/50 scrollbar-hide">
              <CategoryList 
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
              <PriceList 
                selectedPrice={selectedPrice}
                setSelectedPrice={setSelectedPrice}
              />
            </div>
            <div className="flex-1 pt-5">
              <div className="h-[calc(100vh-160px)] overflow-y-auto scrollbar-hide pr-2">
                {error ? (
                  <div className="p-20 flex flex-col gap-4 items-center justify-center bg-white rounded-lg border border-red-200">
                    <div className="text-center space-y-2">
                      <p className="text-red-600 font-semibold text-lg">Error Loading Products</p>
                      <p className="text-gray-600 text-sm">{error}</p>
                    </div>
                    <Button 
                      onClick={handleRetry}
                      className="bg-revoshop-accent hover:bg-revoshop-accent-hover"
                    >
                      Retry
                    </Button>
                  </div>
                ) : loading ? (
                  <div className="p-20 flex flex-col gap-2 items-center justify-center bg-white">
                    <Loader className="w-10 h-10 text-blue-600/50 animate-spin"/>
                    <p className="font-semibold tracking wide text-base text-blue-600/50">Loading products...</p>
                  </div>
                ) : (
                  products?.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                      {products.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                      ))}
                    </div>
                  ) : (
                    <NoProduct className="bg-white mt-0"/>
                  )
                )}
              </div>
            </div>
        </div>
      </Container>
    </div>
  )
}

export default Shop
