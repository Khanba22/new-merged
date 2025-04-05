"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Receipt,
  FileText,
  Calculator,
  CreditCard,
  BarChart4,
  PieChart,
  Percent,
  Building2,
  FileCheck,
  IndianRupee,
} from "lucide-react"
import CursorSpotlight from "./cursor-spotlght"

// Define the tax term type
interface TaxTerm {
  id: number
  term: string
  definition: string
  icon: JSX.Element
}

// Indian tax terms data
const taxTerms: TaxTerm[] = [
  {
    id: 1,
    term: "GSTR-1",
    definition:
      "A monthly or quarterly return that needs to be filed by registered taxpayers detailing all outward supplies (sales) made during the tax period.",
    icon: <FileText className="h-8 w-8 text-purple-300" />,
  },
  {
    id: 2,
    term: "Input Tax Credit (ITC)",
    definition:
      "The credit of GST paid on purchases that a business can claim to offset against the GST liability on sales.",
    icon: <CreditCard className="h-8 w-8 text-purple-300" />,
  },
  {
    id: 3,
    term: "Composition Scheme",
    definition:
      "A simplified tax scheme for small businesses with annual turnover up to ₹1.5 crore, allowing them to pay GST at a flat rate without input tax credits.",
    icon: <Calculator className="h-8 w-8 text-purple-300" />,
  },
  {
    id: 4,
    term: "E-way Bill",
    definition:
      "An electronic document required for the movement of goods worth more than ₹50,000, generated on the GST portal.",
    icon: <Receipt className="h-8 w-8 text-purple-300" />,
  },
  {
    id: 5,
    term: "HSN Code",
    definition:
      "Harmonized System of Nomenclature - a 6-digit code used to classify goods under GST for uniform classification across the country.",
    icon: <BarChart4 className="h-8 w-8 text-purple-300" />,
  },
  {
    id: 6,
    term: "Reverse Charge Mechanism",
    definition: "A system where the recipient of goods or services is liable to pay GST instead of the supplier.",
    icon: <PieChart className="h-8 w-8 text-purple-300" />,
  },
  {
    id: 7,
    term: "CGST",
    definition:
      "Central Goods and Services Tax - collected by the Central Government on intra-state supply of goods and services.",
    icon: <Building2 className="h-8 w-8 text-purple-300" />,
  },
  {
    id: 8,
    term: "SGST",
    definition:
      "State Goods and Services Tax - collected by the State Government on intra-state supply of goods and services.",
    icon: <Building2 className="h-8 w-8 text-purple-300" />,
  },
  {
    id: 9,
    term: "IGST",
    definition:
      "Integrated Goods and Services Tax - collected on inter-state supply of goods and services, and on imports.",
    icon: <IndianRupee className="h-8 w-8 text-purple-300" />,
  },
  {
    id: 10,
    term: "TDS under GST",
    definition:
      "Tax Deducted at Source under GST - applicable when specified entities make payments to suppliers above ₹2.5 lakh, where 2% of the payment is deducted as GST.",
    icon: <Percent className="h-8 w-8 text-purple-300" />,
  },
  {
    id: 11,
    term: "Form 16",
    definition:
      "A certificate issued by employers to employees containing details of TDS (Tax Deducted at Source) on salary income.",
    icon: <FileCheck className="h-8 w-8 text-purple-300" />,
  },
  {
    id: 12,
    term: "Section 80C",
    definition:
      "A section of the Income Tax Act that allows deductions up to ₹1.5 lakh for investments in specified instruments like PPF, ELSS, etc.",
    icon: <FileText className="h-8 w-8 text-purple-300" />,
  },
]

export default function TaxTermOfTheDay() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [currentTerm, setCurrentTerm] = useState<TaxTerm>(taxTerms[0])

  // Function to get a random tax term
  const getRandomTerm = () => {
    const randomIndex = Math.floor(Math.random() * taxTerms.length)
    setCurrentTerm(taxTerms[randomIndex])
    setIsFlipped(false)
  }

  // Set a random term when the component mounts
  useEffect(() => {
    getRandomTerm()
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 flex flex-col items-center justify-center p-4">
      <CursorSpotlight />

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute text-white/10"
          initial={{ x: "10%", y: "10%" }}
          animate={{ x: "15%", y: "15%" }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
        >
          <Receipt size={80} />
        </motion.div>
        <motion.div
          className="absolute text-white/10 right-[20%] top-[20%]"
          initial={{ x: "0%", y: "0%" }}
          animate={{ x: "-10%", y: "5%" }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
        >
          <Calculator size={100} />
        </motion.div>
        <motion.div
          className="absolute text-white/10 left-[15%] bottom-[15%]"
          initial={{ x: "0%", y: "0%" }}
          animate={{ x: "10%", y: "-10%" }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
        >
          <IndianRupee size={120} />
        </motion.div>
        <motion.div
          className="absolute text-white/10 right-[15%] bottom-[20%]"
          initial={{ x: "0%", y: "0%" }}
          animate={{ x: "-5%", y: "-5%" }}
          transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
        >
          <FileText size={90} />
        </motion.div>
      </div>

      <div className="z-10 max-w-md w-full">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Tax Term of the Day</h1>
          <p className="text-purple-200">Expand your knowledge of Indian taxation</p>
        </header>

        <div className="perspective-1000">
          <motion.div
            className="w-full relative preserve-3d"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front of card */}
            <Card
              className={`p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl w-full ${isFlipped ? "absolute backface-hidden" : "relative"}`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 p-4 rounded-full mb-6">{currentTerm.icon}</div>
                <h2 className="text-2xl font-bold text-purple-800 mb-4">{currentTerm.term}</h2>
                <Button
                  onClick={() => setIsFlipped(true)}
                  className="text-white mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  Flip to know
                </Button>
              </div>
            </Card>

            {/* Back of card */}
            <Card
              className={`p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl w-full absolute top-0 ${isFlipped ? "relative" : "absolute backface-hidden"}`}
              style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 p-4 rounded-full mb-6">{currentTerm.icon}</div>
                <h2 className="text-2xl font-bold text-purple-800 mb-4">{currentTerm.term}</h2>
                <p className="text-gray-700 mb-6">{currentTerm.definition}</p>
                <Button
                  onClick={() => setIsFlipped(false)}
                  variant="outline"
                  className="text-white mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  Flip back
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={getRandomTerm}
            variant="secondary"
            className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
          >
            Show another term
          </Button>
        </div>
      </div>

      <footer className="mt-12 text-center text-purple-200 text-sm">
        <p>Learn more about Indian taxation system every day!</p>
      </footer>
    </div>
  )
}

