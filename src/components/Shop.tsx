"use client"
import React, { useState, useEffect } from 'react'
import Container from './Container';
import {SubTitle} from './ui/text';
import CategoryList from './shop/CategoryList';
import PriceList from './shop/PriceList';
import NoProduct from './NoProduct';
import ProductCard from './ProductCard';
import { Loader } from 'lucide-react';


interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt: string;
  updatedAt: string;
}

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

    const fetchProduct = async () => {
      setLoading(true);
      try{
        let query = `https://api.escuelajs.co/api/v1/products`;
        
        if(selectedCategory){
          const category = categories.find(cat => cat.slug === selectedCategory);
          if(category){
            query = `https://api.escuelajs.co/api/v1/categories/${category.id}/products`;
          }
        }
        
        const response = await fetch(query);
        let data = await response.json();
        
        if(selectedPrice){
          const [min, max] = selectedPrice.split("-").map(Number);
          data = data.filter((product: Product) => product.price >= min && product.price <= max);
        }
        
        setProducts(data);
      }catch(error){
        console.log("Error fetching products:", error);
      }finally{
        setLoading(false);
      }
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
                {loading ? (
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
