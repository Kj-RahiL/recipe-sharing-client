
"use client";

import { Switch } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Switch
      defaultSelected
      size="lg"
      startContent={<MoonIcon />}
      endContent={<SunIcon />}
      isSelected={theme === "light" ? true : false}
      onValueChange={(e) => setTheme(e ? "light" : "dark")}
    />
  );
}
