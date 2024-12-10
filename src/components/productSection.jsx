"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Cards } from "./cards";
// import SimpleSlider from "./carousel";

export default function ProductSection() {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div className="md:py-16 py-8 p-2 bg-accent-100">
      <motion.div
        className="w-full flex justify-center items-center text-center"
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="md:text-[2.5rem] text-[1.3rem] font-semibold ">
          Globally-crafted <br />
          <span>mobile accessories you can trust</span>
        </div>
      </motion.div>
      <div>
        <div className="">
          <div className="flex flex-wrap gap-x-8 gap-y-10">
            {/* {products?.map((product) => (
              <Cards
                key={product._id}
                product={product}
                imageUrls={product.imageUrls[0]}
                title={product.title}
                // price={product.priceHistory[0].price}
                // rating={product.rating}
                _id={product._id}
              />
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
