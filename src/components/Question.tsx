"use client"

import React, { useState } from 'react'
import { FAQ } from '@/src/config/questions'
import { ChevronDown } from 'lucide-react'
import { SubTitle, SubText } from './ui/text'

interface QuestionProps {
  data: FAQ;
}

function Question({ data }: QuestionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-revoshop-navy/10 last:border-b-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between gap-8 items-start w-full text-left py-6 hover:bg-revoshop-accent/5 px-4 rounded-md hoverEffect group"
      >
        <SubTitle className="text-base md:text-lg group-hover:text-revoshop-accent hoverEffect">
          {data.question}
        </SubTitle>
        <ChevronDown 
          className={`w-5 h-5 shrink-0 text-revoshop-accent transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <SubText className="text-sm md:text-base px-4 pb-6 text-gray-600">
          {data.answer}
        </SubText>
      </div>
    </div>
  )
}

export default Question