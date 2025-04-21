"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"

import { Button } from "@/components/ui/button"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (section: string) => void
}

export default function MobileMenu({ isOpen, onClose, onNavigate }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-white"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex h-16 items-center justify-between px-6">
            <div className="text-xl font-medium text-red-800">Esabal Day Spa</div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="px-6 py-8">
            <nav className="flex flex-col space-y-6">
              <motion.button
                className="flex w-full justify-start text-lg font-medium text-red-700"
                onClick={() => onNavigate("home")}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                Home
              </motion.button>
              <motion.button
                className="flex w-full justify-start text-lg font-medium text-red-700"
                onClick={() => onNavigate("services")}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                Services
              </motion.button>
              <motion.button
                className="flex w-full justify-start text-lg font-medium text-red-700"
                onClick={() => onNavigate("treatments")}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                Treatment Menu
              </motion.button>
              <motion.button
                className="flex w-full justify-start text-lg font-medium text-red-700"
                onClick={() => onNavigate("about")}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                About Us
              </motion.button>
              <motion.button
                className="flex w-full justify-start text-lg font-medium text-red-700"
                onClick={() => onNavigate("contact")}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                Contact
              </motion.button>
              <motion.button
                className="mt-4 flex w-full justify-start text-lg font-medium text-red-700"
                onClick={() => onNavigate("booking")}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <Button className="w-full bg-red-700 hover:bg-red-800">Book Now</Button>
              </motion.button>
              <motion.a
                href="https://wa.me/27640084864"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-start gap-2 text-lg font-medium text-green-600"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <FontAwesomeIcon icon={faWhatsapp} className="h-5 w-5" />
                WhatsApp Us
              </motion.a>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
