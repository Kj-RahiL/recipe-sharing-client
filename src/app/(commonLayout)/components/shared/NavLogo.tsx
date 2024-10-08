"use client"

import Image from "next/image";
import logoLight from "../../../../../public/assets/Chef”s (1).png";
import logoDark from "../../../../../public/assets/Chef”s (2).png";
import { useTheme } from "next-themes";
export const NavLogo = () => {
  const { theme } = useTheme();

  const logoImage = theme === "dark" ? logoDark : logoLight; // Choose image based on the theme

  return (
    <Image
      src={logoImage}
      width={150}
      height={100}
      alt="Chef's Circle Logo"
      className="object-cover rounded-full py-1"
    />
  );
};