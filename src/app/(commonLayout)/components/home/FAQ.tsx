/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Accordion, AccordionItem } from '@nextui-org/react';
import { useTheme } from 'next-themes';

const faqs = [
  {
    question: "What is the Recipe Sharing Community?",
    answer: "It's a space for sharing, discovering, and organizing recipes, available to food lovers worldwide.",
  },
  {
    question: "How can I join the community?",
    answer: "Sign up on our platform to access recipes, post your own, and connect with others.",
  },
  {
    question: "Do I need a premium subscription?",
    answer: "Basic features are free, but a premium subscription unlocks exclusive recipes and advanced filters.",
  },
  {
    question: "How can I submit my own recipe?",
    answer: "Log in, go to your profile/dashboard, and select 'create Recipe' to share your favorite dishes with the community.",
  },
  {
    question: "What are the payment options for a premium subscription?",
    answer: "We accept payments via Aamarpay for a secure payment experience.",
  },
];

export default function FAQ() {
    const {theme} = useTheme()
  return (
    <section className="py-16 border-b-1 rounded border-gray-400 shadow-divider">
      <div className="text-center mb-12">
        <h2 className={`font-bold  ${
            theme === 'dark' ? "gradient-text" : "text-gray-800"
          } text-4xl`}>Frequently Asked Questions</h2>
        <p className="text-gray-600 dark:text-gray-300">Get answers to your questions about the platform.</p>
      </div>
      <Accordion   motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            height: "auto",
            transition: {
              height: {
                type: "spring",
                stiffness: 500,
                damping: 30,
                duration: 1,
              },
              opacity: {
                easings: "ease",
                duration: 1,
              },
            },
          },
          exit: {
            y: -10,
            opacity: 0,
            height: 0,
            transition: {
              height: {
                easings: "ease",
                duration: 0.25,
              },
              opacity: {
                easings: "ease",
                duration: 0.3,
              },
            },
          },
        },
      }} variant='splitted' className='my-5 max-w-3xl mx-auto'>
        {faqs.map((faq, index) => (
        <AccordionItem key={index + 1} aria-label="Accordion 1" title={faq.question} className='dark:bg-gray-900'>
          {faq.answer}
         </AccordionItem>
        ))}
    </Accordion>
    </section>
  );
}
