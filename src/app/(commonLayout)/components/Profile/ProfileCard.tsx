/* ProfileCard.tsx */
"use client"
import { useUser } from "@/context/user.provider";
import { Button, Avatar, Tabs, Tab } from "@nextui-org/react";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

const ProfileCard = () => {
  const {user} = useUser()
  return (
    <div className="p-6 max-w-lg mx-auto">
      {/* Header Section */}
      <div className="flex items-center mb-4">
        <Avatar
          src={user?.image}
          alt="Tony Ellis"
          size="lg"
          className="rounded-full"
        />
        <div className="ml-4">
          <h1 className="text-xl font-bold">{user?.name}</h1>
          <p className="text-gray-500">{user?.email}</p>
          <div className="flex space-x-2 mt-1 text-sm text-gray-500">
            <span>1 Following</span>
            <span>·</span>
            <span>1 Followers</span>
          </div>
        </div>
        <Button autoSave="" color="warning" className="ml-auto">
          Follow
        </Button>
      </div>

      {/* Tabs Section */}
      <Tabs aria-label="Profile Options" className="mb-4">
        <Tab key="activity" title="Activity">
          <p className="font-semibold text-orange-500">Activity Content Here</p>
        </Tab>
        <Tab key="created" title="Created">
          <p className="text-gray-500">Created Content Here</p>
        </Tab>
      </Tabs>
      {/* Activity Post */}
      <div className="p-4 bg-white rounded-lg shadow-md space-y-2">
        {/* Post Header */}
        <div className="flex items-center">
          <Avatar
            src={user?.image}
            alt="Tony Ellis"
            size="sm"
            className="rounded-full"
          />
          <div className="ml-3">
            <p className="font-bold text-sm">{user?.name}</p>
            <p className="text-gray-500 text-xs">10h</p>
          </div>
          <button className="ml-auto">
            <MoreHorizontal className="text-gray-500" />
          </button>
        </div>

        {/* Post Content */}
        <p className="text-sm">
          Great recipe. Easy to make. I used spicy guacamole instead of plain
          avocado and Sriracha.
        </p>

        {/* Image Section */}
        <div className="relative">
          <Image
            src="/recipe-image.jpg"
            alt="Recipe Image"
            width={600}
            height={400}
            className="rounded-lg"
          />
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
            <span>Made it</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
