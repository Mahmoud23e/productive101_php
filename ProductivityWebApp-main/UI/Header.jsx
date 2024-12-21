"use client";
import { motion } from "framer-motion";
import { fadeUpAnimationVariant } from "@/app/page";
function Header({ children }) {
  return (
    <motion.h2
      variants={fadeUpAnimationVariant}
      initial="initial"
      whileInView="animate"
      viewport={{ once: false }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="text-center text-[50px] font-[800] mb-10">
      {children}
    </motion.h2>
  );
}

export default Header;
