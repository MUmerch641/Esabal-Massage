"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Leaf, Gift, MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react"
import { motion, useAnimation, useInView } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import BookingForm from "@/components/booking-form"
import TestimonialSlider from "@/components/testimonial-slider"
import MobileMenu from "@/components/mobile-menu"
import TreatmentMenu from "@/components/treatment-menu"
import ImageGallery from "@/components/image-gallery"

// Add FontAwesome icons to the library
import { library } from "@fortawesome/fontawesome-svg-core"
library.add(faWhatsapp)

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedService, setSelectedService] = useState("")

  const bookingRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const handleBookService = (serviceId: string, serviceName: string) => {
    setSelectedService(serviceId)
    scrollToSection("booking")
    // Optional: Show a message that the service was selected
    alert(`${serviceName} selected! Please complete the booking form.`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-10 w-10 overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/details-Y4KH5fMcksOdRtI3QRn53J9biqjDqF.jpeg"
                  alt="Esabal Day Spa Logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <span className="hidden font-serif text-xl font-medium text-red-800 sm:inline-block">Esabal Day Spa</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("home")}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("treatments")}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Treatment Menu
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Contact
            </button>
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={() => scrollToSection("booking")}>
              <Button variant="default" size="sm" className="hidden sm:flex bg-red-700 hover:bg-red-800">
                Book Now
              </Button>
            </button>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
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
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} onNavigate={scrollToSection} />

      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="relative overflow-hidden">
          <div className="absolute inset-0 z-0 bg-amber-50">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-100/70 to-red-50/70" />
          </div>
          <div className="container relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 py-16 md:py-24">
            <motion.div
              className="flex flex-col justify-center space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block rounded-full bg-red-100 px-4 py-1 text-sm font-medium text-red-800">
                Welcome to Esabal Day Spa
              </div>
              <h1 className="font-serif text-4xl font-bold tracking-tight text-red-800 sm:text-5xl md:text-6xl">
                RELAX YOUR <span className="block text-red-600">BODY, MIND</span>
              </h1>
              <p className="text-xl text-red-700">Experience Ultimate Relaxation</p>
              <p className="max-w-md text-red-600">
                Indulge in the ultimate relaxation experience at Esabal Day Spa. Our signature treatments combine
                aromatherapy, massage, and facial for complete rejuvenation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="rounded-full bg-red-700 hover:bg-red-800"
                  onClick={() => scrollToSection("booking")}
                >
                  Book Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-red-300 text-red-700 hover:bg-red-50"
                  onClick={() => scrollToSection("treatments")}
                >
                  View Treatments
                </Button>
              </div>
            </motion.div>
            <motion.div
              className="relative rounded-full overflow-hidden aspect-square max-w-md mx-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 to-red-100/30 rounded-full" />
              <Image
                src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=500&h=500&auto=format&fit=crop&q=80"
                alt="Spa treatment"
                width={500}
                height={500}
                className="object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Featured Services */}
        <AnimatedSection>
          <section id="services" className="py-16 bg-white">
            <div className="container">
              <div className="mx-auto max-w-2xl text-center mb-12">
                <h2 className="font-serif text-3xl font-bold tracking-tight text-red-800 sm:text-4xl">
                  Our Featured Services
                </h2>
                <div className="mt-4 text-xl text-red-600">Discover Our Most Popular Treatments</div>
              </div>
              <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
                <motion.div whileHover={{ y: -10, transition: { duration: 0.3 } }} className="group">
                  <Card className="overflow-hidden border-red-200 transition-all duration-300 group-hover:shadow-lg">
                    <div className="aspect-video relative">
                      <Image
                        src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&h=300&auto=format&fit=crop&q=80"
                        alt="Deep Tissue Massage"
                        width={500}
                        height={300}
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-serif text-xl font-semibold">Deep Tissue Massage</h3>
                        <p className="text-white/80">60 minutes of bliss</p>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <ul className="mt-4 space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <Leaf className="h-4 w-4 text-red-500" />
                          <span>Relieves chronic muscle tension</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Leaf className="h-4 w-4 text-red-500" />
                          <span>Targets deeper muscle layers</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Leaf className="h-4 w-4 text-red-500" />
                          <span>Improves circulation</span>
                        </li>
                      </ul>
                      <div className="mt-6 flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-red-700">R600</span>
                      </div>
                      <Button
                        className="mt-4 w-full bg-red-700 hover:bg-red-800"
                        onClick={() => handleBookService("deep-tissue", "Deep Tissue Massage")}
                      >
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ y: -10, transition: { duration: 0.3 } }} className="group">
                  <Card className="overflow-hidden border-red-200 bg-gradient-to-b from-red-50 to-white shadow-md transition-all duration-300 group-hover:shadow-lg">
                    <div className="absolute right-4 top-4 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-medium text-white">
                      Most Popular
                    </div>
                    <div className="aspect-video relative">
                      <Image
                        src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=500&h=300&auto=format&fit=crop&q=80"
                        alt="Hot Stone Full Body"
                        width={500}
                        height={300}
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-serif text-xl font-semibold">Hot Stone Full Body</h3>
                        <p className="text-white/80">60 minutes of luxury</p>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <ul className="mt-4 space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <Leaf className="h-4 w-4 text-red-500" />
                          <span>Heated stones for deep relaxation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Leaf className="h-4 w-4 text-red-500" />
                          <span>Relieves muscle tension</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Leaf className="h-4 w-4 text-red-500" />
                          <span>Improves circulation</span>
                        </li>
                      </ul>
                      <div className="mt-6 flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-red-700">R600</span>
                      </div>
                      <Button
                        className="mt-4 w-full bg-red-700 hover:bg-red-800"
                        onClick={() => handleBookService("hot-stone", "Hot Stone Full Body")}
                      >
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ y: -10, transition: { duration: 0.3 } }} className="group">
                  <Card className="overflow-hidden border-red-200 transition-all duration-300 group-hover:shadow-lg">
                    <div className="aspect-video relative">
                      <Image
                        src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500&h=300&auto=format&fit=crop&q=80"
                        alt="Full Body Scrub"
                        width={500}
                        height={300}
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-serif text-xl font-semibold">Full Body Scrub</h3>
                        <p className="text-white/80">30 minutes of exfoliation</p>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <ul className="mt-4 space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <Leaf className="h-4 w-4 text-red-500" />
                          <span>Exfoliates dead skin cells</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Leaf className="h-4 w-4 text-red-500" />
                          <span>Improves skin texture</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Leaf className="h-4 w-4 text-red-500" />
                          <span>Enhances circulation</span>
                        </li>
                      </ul>
                      <div className="mt-6 flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-red-700">R400</span>
                      </div>
                      <Button
                        className="mt-4 w-full bg-red-700 hover:bg-red-800"
                        onClick={() => handleBookService("body-scrub", "Full Body Scrub")}
                      >
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Treatment Menu Section */}
        <AnimatedSection>
          <section id="treatments" className="py-16 bg-amber-50">
            <div className="container">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-serif text-3xl font-bold tracking-tight text-red-800 sm:text-4xl">
                  Treatment Menu
                </h2>
                <p className="mt-4 text-lg text-red-600">
                  Discover our range of treatments designed to relax, rejuvenate, and restore.
                </p>
              </div>
              <div className="mx-auto mt-12 max-w-6xl">
                <TreatmentMenu onBookService={handleBookService} />
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* About Section */}
        <AnimatedSection>
          <section id="about" className="py-16 bg-white">
            <div className="container">
              <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
                <motion.div
                  className="relative aspect-square overflow-hidden rounded-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&h=500&auto=format&fit=crop&q=80"
                    alt="Our spa"
                    width={500}
                    height={500}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 to-red-100/30 rounded-full" />
                </motion.div>
                <div className="space-y-6">
                  <h2 className="font-serif text-3xl font-bold tracking-tight text-red-800 sm:text-4xl">
                    About Esabal Day Spa
                  </h2>
                  <p className="text-lg text-red-700">
                    At Esabal Day Spa, we believe in the power of relaxation and rejuvenation. Our mission is to provide
                    a sanctuary where you can escape the stresses of everyday life and focus on your wellbeing.
                  </p>
                  <p className="text-red-600">
                    Our spa has grown to become a premier destination for those seeking high-quality treatments in a
                    tranquil environment. Our team of certified therapists is dedicated to providing personalized care
                    that addresses your specific needs.
                  </p>
                  <p className="text-red-600">
                    We use only premium, natural products that are kind to your skin and to the environment. Our
                    treatments combine traditional techniques with modern approaches to deliver the best results.
                  </p>
                  <div className="pt-4">
                    <Button
                      variant="outline"
                      className="rounded-full border-red-300 text-red-700 hover:bg-red-50"
                      onClick={() => alert("More information about our spa will be available soon!")}
                    >
                      Learn More About Us
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Gallery Section */}
        <AnimatedSection>
          <section className="py-16 bg-amber-50">
            <div className="container">
              <div className="mx-auto max-w-2xl text-center mb-10">
                <h2 className="font-serif text-3xl font-bold tracking-tight text-red-800 sm:text-4xl">
                  Our Spa Gallery
                </h2>
                <p className="mt-4 text-lg text-red-600">Take a visual tour of our facilities and treatments</p>
              </div>
              <div className="mx-auto max-w-6xl">
                <ImageGallery />
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Testimonials */}
        <AnimatedSection>
          <section className="bg-white py-16">
            <div className="container">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-serif text-3xl font-bold tracking-tight text-red-800 sm:text-4xl">
                  What Our Clients Say
                </h2>
                <p className="mt-4 text-lg text-red-600">
                  Don't just take our word for it. Here's what our clients have to say about their experiences.
                </p>
              </div>
              <div className="mx-auto mt-12 max-w-5xl">
                <TestimonialSlider />
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Booking Section */}
        <AnimatedSection>
          <section id="booking" className="py-16 bg-amber-50" ref={bookingRef}>
            <div className="container">
              <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
                <div className="space-y-6">
                  <h2 className="font-serif text-3xl font-bold tracking-tight text-red-800 sm:text-4xl">
                    Book Your Appointment
                  </h2>
                  <p className="text-lg text-red-700">
                    Ready to experience the ultimate in relaxation? Book your appointment today and take the first step
                    towards a more balanced you.
                  </p>
                  <div className="space-y-4 pt-4">
                    <motion.div
                      className="flex items-center gap-4"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                        <Phone className="h-5 w-5 text-red-700" />
                      </div>
                      <div>
                        <p className="font-medium text-red-800">Call Us</p>
                        <a href="tel:+27640084864" className="text-red-600 hover:text-red-800">
                          064 008 4864
                        </a>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-4"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                        <Mail className="h-5 w-5 text-red-700" />
                      </div>
                      <div>
                        <p className="font-medium text-red-800">Email Us</p>
                        <a href="mailto:Esabel247@gmail.com" className="text-red-600 hover:text-red-800">
                          Esabel247@gmail.com{" "}
                        </a>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-4"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                        <MapPin className="h-5 w-5 text-red-700" />
                      </div>
                      <div>
                        <p className="font-medium text-red-800">Visit Us</p>
                        <a
                          href="https://maps.google.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 hover:text-red-800"
                        >
                          2 Hartbees St, Reyno Ridge, eMalahleni, 1035
                        </a>
                      </div>
                    </motion.div>
                  </div>
                  <div className="pt-4">
                    <p className="font-medium text-red-800">Opening Hours</p>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-red-600">
                      <div>Monday(Family Day Hours Might Differ) - Friday</div>
                      <div>9:00 AM - 7:00 PM</div>
                      <div>Saturday</div>
                      <div>9:00 AM - 4:00 PM</div>
                      <div>Sunday</div>
                      <div>9:00 AM - 4:30 PM</div>
                    </div>
                  </div>
                </div>
                <div>
                  <BookingForm selectedService={selectedService} />
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection>
          <section className="bg-gradient-to-r from-amber-100 to-red-50 py-16">
            <div className="container">
              <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="relative"
                >
                  <div className="absolute inset-0 rounded-full bg-white/50 blur-xl"></div>
                  <Gift className="h-16 w-16 text-red-700 relative z-10" />
                </motion.div>
                <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-red-800 sm:text-4xl">
                  Give the Gift of Relaxation
                </h2>
                <p className="mt-4 max-w-2xl text-lg text-red-700">
                  Our gift cards make the perfect present for birthdays, anniversaries, or just because. Available in
                  any denomination and delivered instantly via email or beautifully packaged for in-person giving.
                </p>
                <Button
                  size="lg"
                  className="mt-8 rounded-full bg-red-700 hover:bg-red-800"
                  onClick={() => alert("Gift card purchase will be available soon!")}
                >
                  Purchase a Gift Card
                </Button>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </main>

      {/* Footer */}
      <footer id="contact" className="border-t bg-white">
        <div className="container py-12">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-5">
            <div>
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/details-Y4KH5fMcksOdRtI3QRn53J9biqjDqF.jpeg"
                    alt="Esabal Day Spa Logo"
                    width={32}
                    height={32}
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <span className="font-serif text-lg font-medium text-red-800">Esabal Day Spa</span>
              </div>
              <p className="mt-4 text-sm text-red-600">
                A sanctuary of peace and tranquility where your journey to wellness begins.
              </p>
              <div className="mt-6 flex gap-4">
                <motion.a
                  href="https://www.facebook.com/share/1HMP4vJr3o/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-800"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/esabel_day_spa?igsh=azBkbXNyM3dhMW8x"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-800"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </motion.a>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-red-800">Quick Links</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <button onClick={() => scrollToSection("home")} className="text-red-600 hover:text-red-800">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("services")} className="text-red-600 hover:text-red-800">
                    Services
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("treatments")} className="text-red-600 hover:text-red-800">
                    Treatment Menu
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("about")} className="text-red-600 hover:text-red-800">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("contact")} className="text-red-600 hover:text-red-800">
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-red-800">Services</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <button onClick={() => scrollToSection("treatments")} className="text-red-600 hover:text-red-800">
                    Massages
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("treatments")} className="text-red-600 hover:text-red-800">
                    Exfoliation
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("treatments")} className="text-red-600 hover:text-red-800">
                    Hands & Feet
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("treatments")} className="text-red-600 hover:text-red-800">
                    Wax & Tints
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("treatments")} className="text-red-600 hover:text-red-800">
                    Kids Treatments
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-red-800">Contact Us</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-red-600" />
                  <span className="text-red-600">
                    2 Hartbees St, Reyno Ridge
                    <br />
                    eMalahleni, 1035
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-red-600" />
                  <a href="tel:+27640084864" className="text-red-600 hover:text-red-800">
                    064 008 4864
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-red-600" />
                  <a href="mailto:Esabel247@gmail.com" className="text-red-600 hover:text-red-800">
                    Esabel247@gmail.com{" "}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-red-800">Banking Details</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="text-red-600">
                  <span className="font-medium">Account Name:</span> Esabe beauty
                </li>
                <li className="text-red-600">
                  <span className="font-medium">Bank:</span> FNB
                </li>
                <li className="text-red-600">
                  <span className="font-medium">Account Number:</span> 62888520329
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-6 text-center text-sm text-red-600">
            <p>
              © {new Date().getFullYear()} Esabal Day Spa. All rights reserved.Created by
              <a href="https://www.linkedin.com/in/umer-ch-203b0b337/">Umer</a>
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/27640084864"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <FontAwesomeIcon icon={faWhatsapp} size="lg" className="text-2xl" />
        <span className="sr-only">Contact via WhatsApp</span>
      </motion.a>
    </div>
  )
}

// Animated Section Component
function AnimatedSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
      }}
    >
      {children}
    </motion.div>
  )
}
