"use client";

import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import React, { useEffect } from "react";
import { useMotionTemplate, useMotionValue, motion, animate } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";

const COLORS_TOP_DARK = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
const COLORS_TOP_LIGHT = ["#FFD700", "#FF8C00", "#00BFFF", "#FF69B4"];

export const Banner = () => {
  const { theme } = useTheme(); // Hook to get current theme
  const color = useMotionValue(COLORS_TOP_DARK[0]);

  useEffect(() => {
    const colors = theme === "dark" ? COLORS_TOP_DARK : COLORS_TOP_LIGHT;
    animate(color, colors, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [theme]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, ${theme === "dark" ? "#020617" : "#f0f0f0"} 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className={`relative grid min-h-screen place-content-center overflow-hidden ${
        theme === "dark" ? "bg-gray-950 text-gray-200" : "bg-white text-gray-900"
      } px-4 py-24`}
    >
      <div className="relative z-10 flex flex-col items-center">
        {/* Recipe Sharing Community Project Heading */}
        <h1
          className={`max-w-3xl bg-gradient-to-br ${
            theme === "dark" ? "from-white to-gray-400" : "from-gray-900 to-gray-600"
          } bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight`}
        >
          Welcome to Chef&apos;s Circle
        </h1>

        {/* Project Description */}
        <p
          className={`my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed ${
            theme === "dark" ? "text-gray-200" : "text-gray-700"
          }`}
        >
          A community-driven platform for passionate home cooks and professional chefs to share, explore, and master new recipes. Join now and start cooking with Chef;s Circle.
        </p>

        {/* Call to Action Button */}
        <motion.button
          style={{
            border,
            boxShadow,
          }}
          whileHover={{
            scale: 1.015,
          }}
          whileTap={{
            scale: 0.985,
          }}
          className={`group relative flex w-fit items-center gap-1.5 rounded-full ${
            theme === "dark" ? "bg-gray-950/10 text-gray-50" : "bg-gray-100 text-gray-900"
          } px-4 py-2 transition-colors ${
            theme === "dark" ? "hover:bg-gray-950/50" : "hover:bg-gray-200"
          }`}
        >
          Explore Recipes
          <ArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </motion.button>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>
  );
};
