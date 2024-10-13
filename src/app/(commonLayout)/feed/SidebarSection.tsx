"use client";

import { useTheme } from "next-themes";

const SidebarSection = () => {
  const { theme } = useTheme(); // Get the current theme

  return (
    <div
      className={`p-6 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white"
      } sticky top-0`}
    >
      <h2 className="font-bold text-lg mb-4">Recommended communities</h2>
      {[
        "Rice Cooker Recipes",
        "Low calorie desserts",
        "Warm My Soul",
        "Thanksgiving Favorites",
        "Oil Free Recipes",
        "Greek & Mediterranean Recipes",
        "Recipes Without Meat",
      ].map((community) => (
        <div key={community} className="flex justify-between items-center mb-4">
          <div>
            <p className="font-semibold">{community}</p>
            <p className="text-gray-500 text-sm">Short description here</p>
          </div>
          <button className="text-blue-500 font-semibold">Join</button>
        </div>
      ))}
    </div>
  );
};

export default SidebarSection;
