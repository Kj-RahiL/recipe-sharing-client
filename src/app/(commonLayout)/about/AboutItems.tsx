'use client'

import { useTheme } from "next-themes";
import Image from "next/image";


const AboutItems = () => {

    const { theme } = useTheme();

  return (
    <div className={`py-12 ${theme === 'dark' ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to Chef&apos;s Circle!
        </h1>
        <p className="text-lg">
          We are a passionate community of home cooks, culinary enthusiasts, and food lovers, all united by our love for cooking. At Chef&apos;s Circle, our mission is to create a platform where people can share their best recipes, discover new dishes, and connect with like-minded foodies.
        </p>
      </div>

      {/* Image Section */}
      <div className="mt-8">
        <Image
          src="/assets/recipe.jpg"
          alt="about"
          width={1000}
          height={500}
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-semibold mb-4">
          What We Offer
        </h2>
        <p className="leading-relaxed mb-6">
          Our platform offers a variety of features to help you master your culinary skills, including interactive ingredient checklists, built-in cooking timers, and the ability to follow and engage with other users.
        </p>

        <p className="leading-relaxed mb-6">
          For those seeking even more exclusive content, we offer a premium subscription that unlocks unique recipes and special features.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-semibold mb-4">
          Join Us on This Journey
        </h2>
        <p className="leading-relaxed">
          At Chef&apos;s Circle, we believe that cooking is more than just making food—it’s about sharing experiences, building connections, and celebrating the joy of food. Join us, and let’s cook, share, and grow together!
        </p>
      </div>
    </div>
  </div>
  );
};

export default AboutItems;
