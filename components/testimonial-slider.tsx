"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "eMalahleni",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&auto=format&fit=crop&q=80",
    rating: 5,
    text: "The Hot Stone massage at Esabal Day Spa was absolutely divine! The therapist was professional and attentive. My muscles felt so relaxed afterward. I'll definitely be back for more treatments!",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Reyno Ridge",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&auto=format&fit=crop&q=80",
    rating: 5,
    text: "My wife and I tried the Swedish massages, and it was the perfect way to celebrate our anniversary. The ambiance was so peaceful, and the staff was friendly and accommodating. Highly recommend!",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "eMalahleni",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&auto=format&fit=crop&q=80",
    rating: 4,
    text: "I've been to many spas, but Esabal Day Spa stands out for their attention to detail. The full body scrub was exactly what I needed after a stressful week. The ambiance is so peaceful and calming.",
  },
  {
    id: 4,
    name: "David Thompson",
    location: "Witbank",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&auto=format&fit=crop&q=80",
    rating: 5,
    text: "I was gifted a pedicure for my birthday, and it was the best present ever! The staff was friendly and professional, and my feet have never looked better. I've already booked my next appointment!",
  },
]

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      nextTestimonial()
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, currentIndex])

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-red-200 bg-white shadow-sm">
            <CardContent className="flex flex-col items-center p-4 md:p-6 text-center">
              <motion.div
                className="relative h-12 w-12 md:h-16 md:w-16 overflow-hidden rounded-full border-2 border-red-200"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Image
                  src={testimonials[currentIndex].image || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  fill
                  className="object-cover"
                />
              </motion.div>
              <motion.div
                className="mt-3 md:mt-4 flex"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 md:h-4 md:w-4 ${
                      i < testimonials[currentIndex].rating ? "fill-amber-400 text-amber-400" : "text-red-300"
                    }`}
                  />
                ))}
              </motion.div>
              <motion.blockquote
                className="mt-3 md:mt-4 max-w-2xl text-sm md:text-lg italic text-red-700"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                "{testimonials[currentIndex].text}"
              </motion.blockquote>
              <motion.div
                className="mt-3 md:mt-4 font-medium text-red-800"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {testimonials[currentIndex].name}
              </motion.div>
              <motion.div
                className="text-xs md:text-sm text-red-600"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                {testimonials[currentIndex].location}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 h-8 w-8 md:h-10 md:w-10"
        onClick={() => {
          prevTestimonial()
          setAutoplay(false)
        }}
      >
        <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
        <span className="sr-only">Previous testimonial</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 h-8 w-8 md:h-10 md:w-10"
        onClick={() => {
          nextTestimonial()
          setAutoplay(false)
        }}
      >
        <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
        <span className="sr-only">Next testimonial</span>
      </Button>

      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-red-600 w-4" : "bg-red-200"
            }`}
            onClick={() => {
              setCurrentIndex(index)
              setAutoplay(false)
            }}
          >
            <span className="sr-only">Go to testimonial {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
