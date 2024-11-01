"use client";
import { Card } from "@nextui-org/react";
import { BookOpen, Crown, MessageCircle, Search, Users } from "lucide-react";
import Image from "next/image";
import image from "../../../../../public/assets/HowItWorkd.jpg";
import { useTheme } from "next-themes";

const steps = [
  {
    title: "Join the Community",
    description:
      "Sign up to start sharing recipes, following chefs, and interacting with other food lovers.",
    icon: <Users size={28} />,
  },
  {
    title: "Discover Recipes",
    description:
      "Browse a wide range of recipes using our search and filter options to find the perfect match.",
    icon: <Search size={28} />,
  },
  {
    title: "Submit Your Recipes",
    description:
      "Add your favorite dishes with detailed instructions, ingredient lists, and helpful cooking tips.",
    icon: <BookOpen size={28} />,
  },
  {
    title: "Engage with Others",
    description:
      "Comment, rate recipes, and upvote/downvote to help the community find the best dishes.",
    icon: <MessageCircle size={28} />,
  },
  {
    title: "Access Premium Content",
    description:
      "Unlock exclusive recipes and features with a premium membership for advanced cooking.",
    icon: <Crown size={28} />,
  },
];

export default function HowItWorks() {
    const {theme} = useTheme()
  return (
    <section className="py-16 shadow-sm shadow-gray-500 ">
      <div className="text-center mb-12">
        <h2
          className={`font-bold ${
            theme === 'dark' ? "gradient-text" : "text-gray-800"
          } text-4xl`}
        >
          How It Works
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Join us and start your culinary journey in five easy steps.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-1">
        <div className="w-2/5 dark:bg-neutral-900">
          <Image
            src={image}
            alt="How it Works"
            objectFit="cover"
            className="rounded w-full h-full"
          />
        </div>

        <div className="grid gap-6 flex-1 p-6 md:p-12 ">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="p-6 shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-gray-900"
            >
              <div className="flex items-center space-x-4">
                <div className="text-blue-500">{step.icon}</div>
                <h3 className="font-semibold light:text-gray-700 dark:text-gray-200 text-xl">
                  {step.title}
                </h3>
              </div>
              <p className="mt-3 text-gray-600 dark:text-gray-300  text-sm">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
