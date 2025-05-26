import React from 'react';
import { Linkedin, Instagram, PhoneCall, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
export function Footer() {
  return <motion.footer className="w-full py-8 px-6 md:px-10 border-t theme-transition" initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    duration: 0.5,
    delay: 0.8
  }}>
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div className="flex flex-col items-center md:items-start" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.9
        }}>
            <img src="https://i.postimg.cc/N0DBrxpY/logo-1.png" alt="Bignalytics Logo" className="h-12 mb-4" />
            <p className="text-muted-foreground text-center md:text-left">
              Empowering data-driven decisions through expert analytics coaching.
            </p>
          </motion.div>
          
          <motion.div className="flex flex-col items-center md:items-start" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 1.0
        }}>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <PhoneCall className="h-4 w-4 text-bignalytics-blue" />
                <span>+91-9399200960</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-4 w-4 text-bignalytics-blue" />
                <span className="">Contact@bignalytics.in</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <MapPin className="h-8 w-20 text-bignalytics-blue" />
                <span>Pearl Business Park-3, Bhawarkua Main Rd, Above Ramesh Dosa,
Near Vishnupuri I-bus stop, Indore, Madhya Pradesh - 452001</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div className="flex flex-col items-center md:items-start" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 1.1
        }}>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <motion.a href="https://www.linkedin.com/company/bignalytics/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-bignalytics-blue text-white hover:bg-bignalytics-blue/80 transition-all" whileHover={{
              scale: 1.2,
              rotate: 5
            }} whileTap={{
              scale: 0.9
            }} aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </motion.a>
              <motion.a href="https://www.instagram.com/bignalytics/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-bignalytics-blue text-white hover:bg-bignalytics-blue/80 transition-all" whileHover={{
              scale: 1.2,
              rotate: 5
            }} whileTap={{
              scale: 0.9
            }} aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
        
        <motion.div className="mt-8 pt-6 border-t text-center" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.5,
        delay: 1.2
      }}>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Bignalytics. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>;
}