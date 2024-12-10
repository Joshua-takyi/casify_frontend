"use client";
import { motion, AnimatePresence } from "framer-motion";
import Searchbar from "./searchbar";
export default function Hero() {
  const heroAnimate = {
    hidden: {
      x: -50,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        type: "spring",
        stiffness: 100,
        damping: 50,
      },
    },
  };
  return (
    <div className="p-2 bg-[url('../../public/images/hero.jpg')] bg-cover bg-center bg-no-repeat md:h-screen h-fit">
      <div className=" flex  flex-col  h-full gap-5  md:p-4 p-2 md:py-16 py-8">
        <AnimatePresence mode="wait">
          <motion.h1
            className=" text-pretty md:text-center  text-text-50 uppercase md:text-[4.1rem] text-[2.1rem] leading-snug  md:tracking-[2px]"
            initial="hidden"
            animate="visible"
            variants={heroAnimate}
          >
            Protection Meets Performance <br />
            <span className="md:text-[3rem] text-[1.4rem] ">
              Where Style Meets Durability
            </span>
          </motion.h1>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.p
            className="md:text-[1.2rem] text-[1.2rem] text-text-50  md:text-center "
            initial="hidden"
            animate="visible"
            variants={heroAnimate}
          >
            Welcome to NexusGear. We craft exceptional mobile accessories that
            protect and enhance your device
          </motion.p>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.div
            className="flex justify-center items-center"
            initial="hidden"
            animate="visible"
            variants={heroAnimate}
          >
            {/* {/* search bar */}
            <Searchbar onSearchResults={(data) => console.log(data)} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
