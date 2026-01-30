import React from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Title } from '@/components/ui/text'

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

interface Props{
    categories: Category[];
    selectedCategory: string | null;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const CategoryList = ({categories, selectedCategory, setSelectedCategory}: Props) => {
  return (
    <div className="w-full bg-white p-5">
      <Title className="text-base font-semibold mb-4">Product Categories</Title>
      <RadioGroup value={selectedCategory || ""} onValueChange={setSelectedCategory} className="mt-2 space-y-1">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem 
              value={category.slug} 
              id={category.slug} 
              className="rounded-sm"
            />
            <Label 
              htmlFor={category.slug} 
              className={`${selectedCategory === category.slug ? "font-semibold text-revoshop-accent": "font-normal"}`}
            >
              {category.name}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {selectedCategory && (
        <button
          onClick={() => setSelectedCategory(null)}
          className="text-revoshop-accent underline text-sm mt-4 font-medium hover:text-revoshop-accent-hover hoverEffect"
        >
          Reset selection
        </button>
      )}
    </div>
  )
}

export default CategoryList
