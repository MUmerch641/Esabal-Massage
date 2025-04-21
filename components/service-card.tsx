"use client"

import Image from "next/image"
import { Clock } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ServiceCardProps {
  title: string
  description: string
  price: string
  duration: string
  imageSrc: string
  onBook?: () => void
}

export default function ServiceCard({ title, description, price, duration, imageSrc, onBook }: ServiceCardProps) {
  return (
    <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden transition-all hover:shadow-md border-red-200">
        <div className="aspect-video relative">
          <Image
            src={imageSrc || "/placeholder.svg?height=300&width=500"}
            alt={title}
            width={500}
            height={300}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
        <CardContent className="p-6">
          <h3 className="font-serif text-xl font-semibold text-red-800">{title}</h3>
          <p className="mt-2 text-sm text-red-600">{description}</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-red-500">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-semibold text-red-700">{price}</span>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="sm" className="bg-red-700 hover:bg-red-800" onClick={onBook}>
                Book Now
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
