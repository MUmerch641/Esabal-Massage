"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&h=400&auto=format&fit=crop&q=80",
    alt: "Massage treatment",
    caption: "Relaxing massage therapy",
  },
  {
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&auto=format&fit=crop&q=80",
    alt: "Hot stone massage",
    caption: "Hot stone therapy",
  },
  {
    src: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&h=400&auto=format&fit=crop&q=80",
    alt: "Facial treatment",
    caption: "Rejuvenating facial",
  },
  {
    src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=400&auto=format&fit=crop&q=80",
    alt: "Body scrub",
    caption: "Exfoliating body scrub",
  },
  {
    src: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&h=400&auto=format&fit=crop&q=80",
    alt: "Spa ambiance",
    caption: "Tranquil spa environment",
  },
  {
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=400&auto=format&fit=crop&q=80",
    alt: "Spa facilities",
    caption: "Our premium facilities",
  },
  {
    src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&auto=format&fit=crop&q=80",
    alt: "Facial massage",
    caption: "Relaxing facial massage",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1661274102571-b58fab96be9d?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Foot treatment",
    caption: "Foot reflexology",
  },
]

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "auto"
  }

  const nextImage = () => {
    if (selectedImage === null) return
    setSelectedImage((selectedImage + 1) % galleryImages.length)
  }

  const prevImage = () => {
    if (selectedImage === null) return
    setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((image, index) => (
          <motion.div
            key={index}
            className="relative aspect-[4/3] overflow-hidden rounded-md cursor-pointer group"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
              <p className="text-white text-sm font-medium">{image.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 text-white bg-black/20 rounded-full p-2 hover:bg-black/40 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation()
                closeLightbox()
              }}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/20 rounded-full p-2 hover:bg-black/40 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span className="sr-only">Previous image</span>
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/20 rounded-full p-2 hover:bg-black/40 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
              <span className="sr-only">Next image</span>
            </button>

            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl max-h-[80vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-auto max-h-[70vh] overflow-hidden">
                <Image
                  src={galleryImages[selectedImage].src || "/placeholder.svg"}
                  alt={galleryImages[selectedImage].alt}
                  width={1200}
                  height={800}
                  className="object-contain w-full h-auto max-h-[70vh]"
                />
              </div>
              <div className="mt-4 text-white text-center">
                <p className="text-lg font-medium">{galleryImages[selectedImage].caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
