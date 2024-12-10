"use client";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <motion.div
      className="h-screen w-screen bg-background  backdrop-blur-md fixed top-0 left-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="h-20 w-20 border-t-4 border-accent rounded-full animate-spin"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, ease: "linear", repeat: Infinity }}
      />
    </motion.div>
  );
}
