import Link from 'next/link'
import React from 'react'

function footer() {
  return (
    <footer className="bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-t border-primary/20">
          <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link href="#" className="text-white/70 text-sm hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="#" className="text-white/70 text-sm hover:text-primary">
                Terms of Service
              </Link>
              <Link href="#" className="text-white/70 text-sm hover:text-primary">
                Contact Us
              </Link>
            </div>
            <p className="text-white/70 text-sm">
              © 2024 HaaS. All rights reserved.
            </p>
          </div>
        </footer>
  )
}

export default footer