import React from 'react'
import Container from '@/components/Container'
import Question from '@/components/Question'
import { FAQs } from '@/src/config/questions'
import { Title, SubText } from '@/components/ui/text'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ - RevoShop',
  description: 'Find answers to common questions about RevoShop. Browse our frequently asked questions.',
}

export const dynamic = 'force-static'
export const revalidate = false

async function getFAQs() {
  return FAQs
}

const FAQPage = async () => {
  const data = await getFAQs()
  return (
    <Container className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text- mb-12 space-y-4">
          <Title className="text-3xl md:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </Title>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-revoshop-navy/10 overflow-hidden">
          {data.map((faq) => (
            <Question key={faq.id} data={faq} />
          ))}
        </div>
      </div>
    </Container>
  )
}

export default FAQPage