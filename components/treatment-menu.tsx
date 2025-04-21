"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Treatment {
  id: string
  name: string
  minutes: number
  price: string
}

interface TreatmentMenuProps {
  onBookService?: (serviceId: string, serviceName: string) => void
}

// Mobile-optimized treatment card component
const TreatmentCard = ({
  treatment,
  onBookService,
}: {
  treatment: Treatment
  onBookService: (serviceId: string, serviceName: string) => void
}) => {
  return (
    <motion.div
      className="p-3 border border-red-100 rounded-lg bg-white shadow-sm mb-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-medium text-sm sm:text-base">{treatment.name}</h4>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <span>{treatment.minutes} min</span>
            <span className="mx-2">•</span>
            <span className="font-semibold">{treatment.price}</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-600 hover:text-red-800 p-1 h-auto"
          onClick={() => onBookService(treatment.id, treatment.name)}
        >
          <span className="sr-only">Book {treatment.name}</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}

// Desktop-optimized treatment table component
const TreatmentTable = ({
  treatments,
  onBookService,
}: {
  treatments: Treatment[]
  onBookService: (serviceId: string, serviceName: string) => void
}) => {
  return (
    <div className="rounded-lg shadow-sm border border-red-100 overflow-hidden hidden md:block">
      <table className="w-full table-auto">
        <thead className="bg-red-50">
          <tr>
            <th className="text-left py-3 px-4 text-red-700 font-medium">Treatment</th>
            <th className="text-center py-3 px-4 text-red-700 font-medium">Minutes</th>
            <th className="text-right py-3 px-4 text-red-700 font-medium">Price</th>
            <th className="text-right py-3 px-4 text-red-700 font-medium w-16">
              <span className="sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {treatments.map((treatment, index) => (
            <motion.tr
              key={index}
              className="border-t border-red-100 hover:bg-red-50 transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <td className="py-3 px-4 font-medium">{treatment.name}</td>
              <td className="text-center py-3 px-4">{treatment.minutes}</td>
              <td className="text-right py-3 px-4 font-semibold">{treatment.price}</td>
              <td className="text-right py-3 px-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-800 p-1 h-auto"
                  onClick={() => onBookService(treatment.id, treatment.name)}
                >
                  <span className="sr-only">Book {treatment.name}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function TreatmentMenu({ onBookService }: TreatmentMenuProps) {
  const [activeTab, setActiveTab] = useState("massages")

  // Treatment data organized by category
  const treatmentData = {
    massages: [
      { id: "deep-tissue", name: "Deep tissue", minutes: 60, price: "R600" },
      { id: "pregnancy", name: "Pregnancy", minutes: 60, price: "R500" },
      { id: "swedish", name: "Swedish full body", minutes: 60, price: "R500" },
      { id: "back-neck", name: "Back & neck Swedish", minutes: 30, price: "R300" },
      { id: "hot-stone", name: "Hot stone full body", minutes: 60, price: "R600" },
      { id: "back-neck-hot", name: "Back & neck hot stone", minutes: 30, price: "R380" },
    ],
    exfoliation: [
      { id: "body-scrub", name: "Full body scrub", minutes: 30, price: "R400" },
      { id: "aloe-facial", name: "Aloe facial", minutes: 30, price: "R300" },
    ],
    handsFeet: [
      { id: "pedicure", name: "Pedicure", minutes: 60, price: "R350" },
      { id: "express-pedicure", name: "Express pedicure", minutes: 30, price: "R200" },
      { id: "manicure", name: "Manicure", minutes: 60, price: "R300" },
      { id: "express-manicure", name: "Express manicure", minutes: 30, price: "R180" },
    ],
    waxTints: [
      { id: "brow-shape", name: "Eye Brow shape", minutes: 30, price: "R100" },
      { id: "brow-tint", name: "Brow tint", minutes: 30, price: "R130" },
      { id: "brow-tint-shape", name: "Eye Brow tint & shape", minutes: 45, price: "R180" },
      { id: "lip-wax", name: "Lip wax", minutes: 20, price: "R100" },
      { id: "full-face", name: "Full face", minutes: 40, price: "R200" },
    ],
    ladies: [
      { id: "under-arm", name: "Under arm", minutes: 20, price: "R120" },
      { id: "bikini", name: "Bikini", minutes: 30, price: "R200" },
      { id: "full-leg", name: "Full leg", minutes: 45, price: "R300" },
      { id: "full-arm", name: "Full arm", minutes: 45, price: "R250" },
      { id: "stomach", name: "Stomach", minutes: 20, price: "R130" },
      { id: "hands-fingers", name: "Hands and fingers", minutes: 20, price: "R100" },
    ],
    mens: [
      { id: "chest", name: "Chest", minutes: 40, price: "R200" },
      { id: "stomach-men", name: "Stomach", minutes: 40, price: "R200" },
      { id: "full-back", name: "Full back", minutes: 60, price: "R300" },
    ],
    // Simplified kids section with just one entry
    kids: [{ id: "kids-treatment", name: "Any kids treatment", minutes: 30, price: "R300" }],
  }

  // Tab configuration with Kids tab
  const tabs = [
    { id: "massages", label: "Massages", title: "MASSAGES" },
    { id: "exfoliation", label: "Exfoliation", title: "EXFOLIATION" },
    { id: "handsFeet", label: "Hands & Feet", title: "HANDS & FEET" },
    { id: "waxTints", label: "Wax & Tints", title: "WAX AND TINTS" },
    { id: "ladies", label: "Ladies Wax", title: "LADIES WAX" },
    { id: "mens", label: "Men's Wax", title: "MEN'S WAX" },
    { id: "kids", label: "Kids", title: "KIDS" },
  ]

  // Default handler if none provided
  const handleBookService = (serviceId: string, serviceName: string) => {
    if (onBookService) {
      onBookService(serviceId, serviceName)
    } else {
      // Fallback if no handler provided
      const bookingSection = document.getElementById("booking")
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth" })
      }
      alert(`${serviceName} selected! Please complete the booking form.`)
    }
  }

  return (
    <Card className="border-red-200 shadow-md w-full max-w-full overflow-hidden">
      <CardContent className="p-3 sm:p-4 md:p-6">
        <Tabs defaultValue="massages" value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Fixed: Properly using TabsList for TabsTrigger components */}
          <div className="relative mb-4 overflow-x-auto pb-1 -mx-3 px-3">
            <TabsList className="w-max min-w-full h-auto bg-transparent p-0">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={cn(
                    "text-xs whitespace-nowrap py-1.5 px-2.5 data-[state=active]:bg-red-100 data-[state=active]:text-red-800 data-[state=active]:shadow",
                    "rounded-md mr-1 last:mr-0",
                  )}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab content with animations */}
          <AnimatePresence mode="wait">
            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-2 focus-visible:outline-none focus-visible:ring-0">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-red-800 mb-3">{tab.title}</h3>

                  {/* Kids tab special layout */}
                  {tab.id === "kids" ? (
                    <motion.div
                      className="p-4 bg-red-50 rounded-lg border border-red-100 shadow-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <div>
                          <p className="text-red-700 font-medium text-sm sm:text-base mb-1">
                            Any treatments for kids is R300
                          </p>
                          <p className="text-gray-600 text-sm">Approximately 30 minutes</p>
                        </div>
                        <Button
                          className="bg-red-700 hover:bg-red-800 w-full sm:w-auto mt-2 sm:mt-0"
                          onClick={() => handleBookService("kids-treatment", "Kids Treatment")}
                        >
                          Book Kids Treatment
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <>
                      {/* Mobile view: Cards */}
                      <div className="md:hidden">
                        {treatmentData[tab.id].map((treatment, index) => (
                          <TreatmentCard key={treatment.id} treatment={treatment} onBookService={handleBookService} />
                        ))}
                      </div>

                      {/* Desktop view: Table */}
                      <TreatmentTable treatments={treatmentData[tab.id]} onBookService={handleBookService} />
                    </>
                  )}
                </motion.div>
              </TabsContent>
            ))}
          </AnimatePresence>

          {/* Book now button */}
          <div className="mt-6 sm:mt-8 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-700 hover:bg-red-800 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium shadow-lg transition-colors"
              onClick={() => {
                const bookingSection = document.getElementById("booking")
                if (bookingSection) {
                  bookingSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              BOOK NOW
            </motion.button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
