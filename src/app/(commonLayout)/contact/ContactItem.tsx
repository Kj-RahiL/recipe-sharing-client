"use client"; // Update with the correct path for your image
import { HouseIcon, Phone, Mailbox } from "lucide-react"; // Icons from lucide-react
import { useTheme } from "next-themes";

const ContactItems = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`py-20 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="py-10">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text">
          Contact Us
        </h2>
      </div>

      {/* Contact Cards */}
      <div
        className={`${
          theme === "dark" ? "bg-gray-900" : "bg-white"
        } rounded-lg shadow`}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center py-20 mx-10 text-center">
          {/* Card 1: Office Address */}
          <div className="card shadow-md rounded-lg p-8 shadow-blue-800">
            <div className="card-body">
              <div className="flex items-center justify-center h-20 w-full mb-4">
                <HouseIcon size={42} />
              </div>
              <h2 className="text-2xl font-medium">Office Address:</h2>
              <p className="mt-2">38-2 Hilton Street, Chittagong</p>
            </div>
          </div>

          {/* Card 2: Phone */}
          <div className="card shadow-md rounded-lg p-8 shadow-blue-800">
            <div className="card-body">
              <div className="flex items-center justify-center h-20 w-full mb-4">
                <Phone size={42} />
              </div>
              <h2 className="text-2xl font-medium">Phone:</h2>
              <p className="mt-2">(+01) 123 456 7890</p>
            </div>
          </div>

          {/* Card 3: Email */}
          <div className="card shadow-md rounded-lg p-8  shadow-blue-800">
            <div className="card-body">
              <div className="flex items-center justify-center h-20 w-full mb-4">
                <Mailbox size={42} />
              </div>
              <h2 className="text-2xl font-medium">Email:</h2>
              <p className="mt-2">inform@dvents.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <h2 className="text-center text-4xl py-10 font-semibold gradient-text">
        Feel Free to Message Us
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-start container mx-auto mt-10 px-4 lg:px-0">
        {/* Form */}
        <div className="w-full md:w-1/2 mt-5 md:mt-0">
          <form className="space-y-6 w-full">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003039]"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003039]"
            />
            <input
              type="tel"
              placeholder="Phone number"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003039]"
            />
            <textarea
              placeholder="Message"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003039] h-32"
            ></textarea>
            <button
              type="submit"
              className="button-bg text-white py-3 px-6 rounded-md transition duration-300"
            >
              SEND MESSAGE
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4">
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>{" "}
            apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactItems;
