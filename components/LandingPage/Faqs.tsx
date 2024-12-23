"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: "What is DataViz Pro?",
    answer: "DataViz Pro is a comprehensive data visualization and analysis platform designed to help businesses and individuals transform complex data into actionable insights through interactive charts, graphs, and AI-powered analytics."
  },
  {
    question: "How does the AI Assistant work?",
    answer: "Our AI Assistant uses advanced machine learning algorithms to analyze your data, identify patterns, and provide instant insights. It can answer questions about your data in natural language, suggest visualizations, and even predict trends based on historical data."
  },
  {
    question: "Can I collaborate with my team on DataViz Pro?",
    answer: "DataViz Pro offers robust collaboration features. You can share dashboards, work on projects simultaneously with team members, and even set different permission levels for various users. Real-time updates ensure everyone stays on the same page."
  },
  {
    question: "What types of data can I upload to DataViz Pro?",
    answer: "DataViz Pro supports a wide range of data formats including CSV, JSON, Excel files, and SQL databases. You can also connect to various APIs to import data directly from other platforms and services."
  },
  {
    question: "Is my data secure on DataViz Pro?",
    answer: "We take data security very seriously. All data is encrypted both in transit and at rest. We use industry-standard security protocols and regularly undergo third-party security audits to ensure your data remains protected."
  }
]

export default function FAQ() {
  return (
    <section className="py-16 ">
      <h2 className="text-3xl font-bold text-center mb-12 text-muted-foreground">Frequently <span className='text-primary'>Asked Questions</span></h2>    
        <div className="max-w-[75vw] mx-auto">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
    </section>
  )
}
