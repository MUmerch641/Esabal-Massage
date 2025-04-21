"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Define all available services
const allServices = [
  // Massages
  { id: "deep-tissue", name: "Deep Tissue Massage (60 min)", category: "Massages", price: "R600" },
  { id: "pregnancy", name: "Pregnancy Massage (60 min)", category: "Massages", price: "R500" },
  { id: "swedish", name: "Swedish Full Body (60 min)", category: "Massages", price: "R500" },
  { id: "back-neck", name: "Back & Neck Swedish (30 min)", category: "Massages", price: "R300" },
  { id: "hot-stone", name: "Hot Stone Full Body (60 min)", category: "Massages", price: "R600" },
  { id: "back-neck-hot", name: "Back & Neck Hot Stone (30 min)", category: "Massages", price: "R380" },

  // Exfoliation
  { id: "body-scrub", name: "Full Body Scrub (30 min)", category: "Exfoliation", price: "R400" },
  { id: "aloe-facial", name: "Aloe Facial (30 min)", category: "Exfoliation", price: "R300" },

  // Hands & Feet
  { id: "pedicure", name: "Pedicure (60 min)", category: "Hands & Feet", price: "R350" },
  { id: "express-pedicure", name: "Express Pedicure (30 min)", category: "Hands & Feet", price: "R200" },
  { id: "manicure", name: "Manicure (60 min)", category: "Hands & Feet", price: "R300" },
  { id: "express-manicure", name: "Express Manicure (30 min)", category: "Hands & Feet", price: "R180" },

  // Wax and Tints
  { id: "brow-shape", name: "Eye Brow Shape (30 min)", category: "Wax & Tints", price: "R100" },
  { id: "brow-tint", name: "Brow Tint (30 min)", category: "Wax & Tints", price: "R130" },
  { id: "brow-tint-shape", name: "Eye Brow Tint & Shape (45 min)", category: "Wax & Tints", price: "R180" },
  { id: "lip-wax", name: "Lip Wax (20 min)", category: "Wax & Tints", price: "R100" },
  { id: "full-face", name: "Full Face (40 min)", category: "Wax & Tints", price: "R200" },

  // Ladies Wax
  { id: "under-arm", name: "Under Arm (20 min)", category: "Ladies Wax", price: "R120" },
  { id: "bikini", name: "Bikini (30 min)", category: "Ladies Wax", price: "R200" },
  { id: "full-leg", name: "Full Leg (45 min)", category: "Ladies Wax", price: "R300" },
  { id: "full-arm", name: "Full Arm (45 min)", category: "Ladies Wax", price: "R250" },
  { id: "stomach", name: "Stomach (20 min)", category: "Ladies Wax", price: "R130" },
  { id: "hands-fingers", name: "Hands and Fingers (20 min)", category: "Ladies Wax", price: "R100" },

  // Men's Wax
  { id: "chest", name: "Chest (40 min)", category: "Men's Wax", price: "R200" },
  { id: "stomach-men", name: "Stomach - Men (40 min)", category: "Men's Wax", price: "R200" },
  { id: "full-back", name: "Full Back (60 min)", category: "Men's Wax", price: "R300" },

  // Kids
  { id: "kids-treatment", name: "Kids Treatment", category: "Kids", price: "R300" },
]

interface BookingFormProps {
  selectedService?: string
}

export default function BookingForm({ selectedService = "" }: BookingFormProps) {
  // Form state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [service, setService] = useState(selectedService)
  const [date, setDate] = useState<Date | undefined>()
  const [time, setTime] = useState("")
  const [notes, setNotes] = useState("")

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  // Set service when prop changes
  if (selectedService && selectedService !== service) {
    setService(selectedService)
  }

  // Get the service name based on ID
  const getServiceName = (serviceId: string) => {
    const foundService = allServices.find((s) => s.id === serviceId)
    return foundService ? `${foundService.name} - ${foundService.price}` : serviceId
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")

    // Format the date properly for the email
    const formattedDate = date ? format(date, "EEEE, MMMM do, yyyy") : "No date selected"

    // Find the full service name and price
    const serviceName = getServiceName(service)

    // Form data for Formspree
    const formData = {
      name,
      email,
      phone,
      service: serviceName,
      date: formattedDate,
      time: time ? `${time.includes(":") ? time : time + ":00"}` : "No time selected",
      notes: notes || "No special requests",
    }

    try {
      // Replace "YOUR_FORMSPREE_ID" with your actual Formspree form ID
      const response = await fetch("https://formspree.io/f/xrbpnjpr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSuccess(true)
        // Reset form
        setName("")
        setEmail("")
        setPhone("")
        setService("")
        setDate(undefined)
        setTime("")
        setNotes("")

        // Show success message
        setTimeout(() => {
          setIsSuccess(false)
        }, 5000)
      } else {
        const data = await response.json()
        throw new Error(data.message || "Something went wrong. Please try again.")
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      className="rounded-lg border border-red-200 bg-white p-6 shadow-sm"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="mb-6 text-xl font-semibold text-red-800">Book Your Appointment</h3>

      {isSuccess && (
        <div className="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-800">
          Thank you! Your booking request has been submitted successfully. We'll contact you shortly to confirm your
          appointment.
        </div>
      )}

      {errorMessage && <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-800">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-red-700">
            Full Name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-red-200 focus:border-red-400 focus:ring-red-400"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-red-700">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-red-200 focus:border-red-400 focus:ring-red-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-red-700">
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              placeholder="064 008 4864"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border-red-200 focus:border-red-400 focus:ring-red-400"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="service" className="text-red-700">
            Service
          </Label>
          <input type="hidden" name="service" value={getServiceName(service)} />
          <Select value={service} onValueChange={setService}>
            <SelectTrigger id="service" className="border-red-200 focus:ring-red-400">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              <div className="p-2 text-sm font-medium text-red-800 border-b">Massages</div>
              {allServices
                .filter((s) => s.category === "Massages")
                .map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name} - {service.price}
                  </SelectItem>
                ))}

              <div className="p-2 text-sm font-medium text-red-800 border-b border-t">Exfoliation</div>
              {allServices
                .filter((s) => s.category === "Exfoliation")
                .map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name} - {service.price}
                  </SelectItem>
                ))}

              <div className="p-2 text-sm font-medium text-red-800 border-b border-t">Hands & Feet</div>
              {allServices
                .filter((s) => s.category === "Hands & Feet")
                .map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name} - {service.price}
                  </SelectItem>
                ))}

              <div className="p-2 text-sm font-medium text-red-800 border-b border-t">Wax & Tints</div>
              {allServices
                .filter((s) => s.category === "Wax & Tints")
                .map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name} - {service.price}
                  </SelectItem>
                ))}

              <div className="p-2 text-sm font-medium text-red-800 border-b border-t">Ladies Wax</div>
              {allServices
                .filter((s) => s.category === "Ladies Wax")
                .map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name} - {service.price}
                  </SelectItem>
                ))}

              <div className="p-2 text-sm font-medium text-red-800 border-b border-t">Men's Wax</div>
              {allServices
                .filter((s) => s.category === "Men's Wax")
                .map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name} - {service.price}
                  </SelectItem>
                ))}

              <div className="p-2 text-sm font-medium text-red-800 border-b border-t">Kids</div>
              {allServices
                .filter((s) => s.category === "Kids")
                .map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name} - {service.price}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="date" className="text-red-700">
              Date
            </Label>
            <input type="hidden" name="date" value={date ? format(date, "EEEE, MMMM do, yyyy") : "No date selected"} />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn("w-full pl-3 text-left font-normal border-red-200", !date && "text-muted-foreground")}
                >
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time" className="text-red-700">
              Time
            </Label>
            <input type="hidden" name="time" value={time} />
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger id="time" className="border-red-200 focus:ring-red-400">
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="9:00">9:00 AM</SelectItem>
                <SelectItem value="10:00">10:00 AM</SelectItem>
                <SelectItem value="11:00">11:00 AM</SelectItem>
                <SelectItem value="12:00">12:00 PM</SelectItem>
                <SelectItem value="13:00">1:00 PM</SelectItem>
                <SelectItem value="14:00">2:00 PM</SelectItem>
                <SelectItem value="15:00">3:00 PM</SelectItem>
                <SelectItem value="16:00">4:00 PM</SelectItem>
                <SelectItem value="17:00">5:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes" className="text-red-700">
            Special Requests
          </Label>
          <Textarea
            id="notes"
            name="notes"
            placeholder="Any special requests or notes for your appointment"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="resize-none border-red-200 focus:border-red-400 focus:ring-red-400"
          />
        </div>

        {/* Hidden field for subject line of the email */}
        <input type="hidden" name="_subject" value="New Booking Request" />

        {/* Redirect to your site after submission - optional */}
        {/* <input type="hidden" name="_next" value="https://your-website.com/thank-you" /> */}

        {/* Honeypot field to prevent spam */}
        <input type="text" name="_gotcha" style={{ display: "none" }} />

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button type="submit" className="w-full bg-red-700 hover:bg-red-800" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : isSuccess ? "Booked!" : "Book Appointment"}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  )
}
