"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { id: "1", title: "Home", url: "/" },
  { id: "2", title: "Products", url: "/products" },
  { id: "3", title: "Cart", url: "/cart" },
  { id: "4", title: "Contact Us", url: "/contact" },
];

export default function Nav() {
  // const [isTop, setIsTop] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsTop(window.scrollY <= 10);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const navVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : index * 0.1,
        duration: 0.4,
        ease: "easeInOut",
      },
    }),
    exit: { opacity: 0, y: 20 },
  };

  const menuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "100vh",
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  return (
    <nav
      id="header"
      className={`bg-accent-50 sticky top-0 left-0 w-full z-40  transition-all duration-300`}
    >
      <div className="flex justify-between items-center p-4">
        {/* Logo */}
        <Link href={"/"}>
          <header>
            <p className="uppercase font-extrabold text-[1.3rem] text-text-400 ">
              NEXUS GEAR
            </p>
          </header>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 items-center text-lg">
          <AnimatePresence>
            {navLinks.map((link, index) => (
              <motion.li
                key={link.id}
                variants={navVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={index}
                className="capitalize text-text-400"
              >
                <Link
                  href={link.url}
                  className="hover:text-accent hover:underline transition-all duration-150 text-lg font-semibold"
                  aria-label={`Go to ${link.title}`}
                >
                  {link.title}
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden focus:outline-none z-50"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-text-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-text-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 w-full bg-accent-50 overflow-hidden z-30"
          >
            <motion.ul
              className="flex flex-col gap-6 p-6 mt-16"
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.id}
                  variants={navVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={index}
                  className="capitalize text-lg font-bold text-text-400"
                >
                  <Link
                    href={link.url}
                    className="hover:underline transition-all duration-150"
                    onClick={() => setIsOpen(false)} // Close menu when clicked
                    aria-label={`Go to ${link.title}`}
                  >
                    {link.title}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
